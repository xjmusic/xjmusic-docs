/*!
 * Signal for web pages: the studio's own sites, one script, no dependencies.
 *
 *   <script defer src="/signal.js"
 *           data-key="outrightmental-com.0123456789abcdef01234567"
 *           data-studio="outrightmental.com nickcharneykaye.com umlaut-hero.com"
 *           data-privacy="/privacy/"></script>
 *
 * Two things, and they are kept apart:
 *
 *   Depth, for everyone, and not this script's job where it can help it. The
 *   backbone is the page's own ladder of 1×1 images (sdk/web/ladder.mjs), which
 *   the server counts with no script at all. On a page that has a ladder
 *   (`[data-signal-depth]`), this script sends no depth. On a page without
 *   one, it sends the same GETs itself (GET /v1/d): which bands of 200 px from
 *   the top were reached, the page's path, and nothing else. `data-depth="off"`
 *   turns that off; `data-depth="consented"` holds it until a yes.
 *
 *   Journeys, only after a yes. A random visitor id is kept in this site's own
 *   storage, and each page view is sent with it (POST /v1/j). A link to
 *   another studio site carries the id in its fragment (`#sx=`), which no
 *   server sees, so the next site can say "this is the same person" once its
 *   own visitor says yes too. An address the person types into a studio form
 *   can be passed to `Signal.identify(email)`, which joins them across every
 *   site and game they have said yes on. Saying no after a yes erases them
 *   (POST /v1/j/forget).
 *
 * A Global Privacy Control signal is a no, and no banner is shown for it.
 *
 * The page's own consent form can drive this instead of the banner
 * (`data-banner="off"`): call `Signal.consent(true | false)`.
 */
(function (root, factory) {
  'use strict';
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else if (root && root.document) {
    root.Signal = api.start(root, root.document.currentScript);
  }
}(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var BAND_PX = 200;
  var MAX_BAND = 47;
  var PAUSE_MS = 700;
  var HANDOFF_MS = 15 * 60 * 1000;
  var CONSENT_KEY = 'signal.consent';
  var VISITOR_KEY = 'signal.v';

  function read(storage, key) {
    try { return storage ? storage.getItem(key) : null; } catch (e) { return null; }
  }
  function write(storage, key, value) {
    try {
      if (!storage) return;
      if (value === null) storage.removeItem(key);
      else storage.setItem(key, value);
    } catch (e) { /* no storage: the page still works, and forgets */ }
  }

  function randomId(win) {
    var bytes = new Uint8Array(16);
    win.crypto.getRandomValues(bytes);
    var out = '';
    for (var i = 0; i < bytes.length; i += 1) out += (bytes[i] < 16 ? '0' : '') + bytes[i].toString(16);
    return out;
  }

  /** A path as Signal keeps it: lower-case, no query, no index.html, no trailing slash. */
  function pathOf(pathname) {
    var text = String(pathname || '/').toLowerCase().replace(/\/{2,}/g, '/').replace(/\/index\.html?$/, '/');
    if (text.length > 1) text = text.replace(/\/$/, '');
    return text.slice(0, 100);
  }

  function hostOf(href, win) {
    try { return new win.URL(href, win.location.href).hostname.replace(/^www\./, ''); } catch (e) { return null; }
  }

  /** `#sx=<stream>.<visitor>.<time in base 36>`, as the site before this one wrote it. */
  function readHandoff(hash, now) {
    var match = /(?:^#|&)sx=([a-z0-9-]{3,32})\.([0-9a-f]{32})\.([0-9a-z]{1,10})/.exec(String(hash || ''));
    if (!match) return null;
    var at = parseInt(match[3], 36);
    if (!(Math.abs(now - at) <= HANDOFF_MS)) return null;
    return { s: match[1], v: match[2], at: at };
  }

  function start(win, script) {
    var doc = win.document;
    var data = (script && script.dataset) || {};
    var key = data.key || '';
    var ingest = String(data.ingest || 'https://in.signal.outright.io').replace(/\/+$/, '');
    var streamId = key.slice(0, key.lastIndexOf('.'));
    var studio = String(data.studio || '').split(/[\s,]+/).filter(Boolean).map(function (host) { return host.replace(/^www\./, '').toLowerCase(); });
    var depthMode = data.depth || 'always';
    var nav = win.navigator || {};
    var store = (function () { try { return win.localStorage; } catch (e) { return null; } }());
    var gpc = nav.globalPrivacyControl === true;
    var path = pathOf(data.node || win.location.pathname);
    var handoff = readHandoff(win.location.hash, Date.now());

    // The fragment is for this page's script only: take it off before anything can copy the address.
    if (handoff && win.history && win.history.replaceState) {
      var clean = String(win.location.hash).replace(/(^#|&)sx=[^&]*/, '$1').replace(/^#&?$/, '');
      try { win.history.replaceState(win.history.state, '', win.location.pathname + win.location.search + clean); } catch (e) { /* the address keeps it */ }
    }

    function consentState() {
      if (gpc) return 'no';
      var kept = read(store, CONSENT_KEY);
      return kept === 'yes' || kept === 'no' ? kept : null;
    }

    function url(route, query) {
      var parts = ['k=' + encodeURIComponent(key)];
      for (var name in query) if (Object.prototype.hasOwnProperty.call(query, name)) parts.push(name + '=' + encodeURIComponent(query[name]));
      return ingest + route + '?' + parts.join('&');
    }

    function get(target) {
      try {
        if (typeof win.fetch === 'function') {
          win.fetch(target, { mode: 'no-cors', credentials: 'omit', cache: 'no-store', keepalive: true, referrerPolicy: 'no-referrer' }).catch(function () {});
          return;
        }
      } catch (e) { /* the image below */ }
      var image = new win.Image();
      image.referrerPolicy = 'no-referrer';
      image.src = target;
    }

    function post(route, body) {
      var target = url(route, {});
      var text = JSON.stringify(body);
      try {
        if (nav.sendBeacon && nav.sendBeacon(target, new win.Blob([text], { type: 'text/plain' }))) return;
      } catch (e) { /* fetch below */ }
      try {
        win.fetch(target, { method: 'POST', mode: 'no-cors', credentials: 'omit', keepalive: true, body: text, headers: { 'content-type': 'text/plain' } }).catch(function () {});
      } catch (e) { /* nothing more to try */ }
    }

    // ── Depth ──

    var sent = -1;
    var reachedEnd = false;
    var timer = null;

    // The page's own ladder of pixels counts depth with no script: this one stays out of it.
    var ladder = !!(doc.querySelector && doc.querySelector('[data-signal-depth]'));

    function depthAllowed() {
      if (!key || ladder || depthMode === 'off') return false;
      if (depthMode === 'consented') return consentState() === 'yes';
      return true;
    }

    /** The deepest band in sight: band k is the line k × 200 px from the top of the page, as a ladder's pixel k is. */
    function bandNow() {
      var bottom = (win.scrollY || win.pageYOffset || 0) + (win.innerHeight || 0);
      return Math.max(0, Math.min(MAX_BAND, Math.floor((bottom - 1) / BAND_PX)));
    }

    function atEnd() {
      var bottom = (win.scrollY || win.pageYOffset || 0) + (win.innerHeight || 0);
      var height = Math.max(doc.documentElement ? doc.documentElement.scrollHeight : 0, doc.body ? doc.body.scrollHeight : 0);
      return height > 0 && bottom >= height - 4;
    }

    function flushDepth() {
      timer = null;
      if (!depthAllowed()) return;
      // The first request is the view (band 0) and every band already in sight.
      var band = bandNow();
      var query = { p: path };
      if (band > sent) { query.b = (sent + 1) + '-' + band; sent = band; }
      if (!reachedEnd && sent >= 0 && atEnd()) { query.e = '1'; reachedEnd = true; }
      if (query.b || query.e) get(url('/v1/d', query));
    }

    function onScroll() {
      if (timer !== null) win.clearTimeout(timer);
      timer = win.setTimeout(flushDepth, PAUSE_MS);
    }

    // ── Journeys ──

    function visitor(make) {
      var id = read(store, VISITOR_KEY);
      if (!/^[0-9a-f]{32}$/.test(String(id)) && make) {
        id = randomId(win);
        write(store, VISITOR_KEY, id);
      }
      return /^[0-9a-f]{32}$/.test(String(id)) ? id : null;
    }

    function journey(touches, extra) {
      if (!key || consentState() !== 'yes') return false;
      var body = { v: visitor(true), t: touches };
      for (var name in extra) if (Object.prototype.hasOwnProperty.call(extra, name)) body[name] = extra[name];
      if (handoff) { body.x = handoff; handoff = null; }
      post('/v1/j', body);
      return true;
    }

    function decorate(event) {
      if (consentState() !== 'yes') return;
      var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
      if (!link) return;
      var host = hostOf(link.href, win);
      var here = String(win.location.hostname).replace(/^www\./, '');
      if (!host || host === here || studio.indexOf(host) < 0) return;
      journey([{ n: path, k: 'out', to: host }], {});
      if (link.hash) return;
      link.href = link.href + '#sx=' + streamId + '.' + visitor(true) + '.' + Date.now().toString(36);
    }

    // ── The banner ──

    var banner = null;

    function closeBanner() {
      if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
      banner = null;
    }

    function showBanner() {
      if (banner || !doc.body) return;
      banner = doc.createElement('div');
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-label', 'Privacy');
      var s = banner.style;
      s.position = 'fixed'; s.left = '16px'; s.right = '16px'; s.bottom = '16px'; s.zIndex = '2147483000';
      s.maxWidth = '560px'; s.margin = '0 auto'; s.padding = '16px'; s.borderRadius = '10px';
      s.background = '#111'; s.color = '#eee'; s.font = '14px/1.45 system-ui, sans-serif'; s.boxShadow = '0 6px 24px rgba(0,0,0,.35)';
      var text = doc.createElement('p');
      text.style.margin = '0 0 12px';
      text.textContent = 'We count how far our pages are read without knowing who you are. May we also remember this browser, so we can see how people find their way between our sites and games? You can change your mind at any time.';
      banner.appendChild(text);
      var row = doc.createElement('div');
      row.style.display = 'flex'; row.style.gap = '8px'; row.style.flexWrap = 'wrap'; row.style.alignItems = 'center';
      function button(label, yes) {
        var b = doc.createElement('button');
        b.type = 'button';
        b.textContent = label;
        b.style.font = 'inherit'; b.style.padding = '6px 14px'; b.style.borderRadius = '6px'; b.style.cursor = 'pointer';
        b.style.border = '1px solid #eee'; b.style.background = yes ? '#eee' : 'transparent'; b.style.color = yes ? '#111' : '#eee';
        b.addEventListener('click', function () { api.consent(yes); });
        return b;
      }
      row.appendChild(button('Yes, remember me', true));
      row.appendChild(button('No thanks', false));
      if (data.privacy) {
        var more = doc.createElement('a');
        more.href = data.privacy;
        more.textContent = 'Privacy';
        more.style.color = '#eee'; more.style.marginLeft = 'auto';
        row.appendChild(more);
      }
      banner.appendChild(row);
      doc.body.appendChild(banner);
    }

    // ── What the page can call ──

    var api = {
      /** Yes or no, from the banner or the page's own form. A no after a yes erases this visitor. */
      consent: function (yes) {
        var before = consentState();
        if (yes && !gpc) {
          write(store, CONSENT_KEY, 'yes');
          closeBanner();
          if (before !== 'yes') {
            journey([{ n: path, k: 'view' }], {});
            if (sent < 0) flushDepth();
          }
        } else {
          write(store, CONSENT_KEY, 'no');
          closeBanner();
          var id = visitor(false);
          if (id && key) post('/v1/j/forget', { v: id });
          write(store, VISITOR_KEY, null);
        }
      },
      /** What was answered: 'yes', 'no', or null when nothing was. */
      consented: function () { return consentState(); },
      /** An address the person just gave this site: the same person, everywhere they said yes. */
      identify: function (email) {
        if (typeof email !== 'string' || email.indexOf('@') < 1) return false;
        return journey([], { e: email.trim() });
      },
      /** A moment worth counting on this page, such as `newsletter` or `/download`. */
      track: function (node, kind) {
        return journey([{ n: String(node), k: kind === 'start' || kind === 'end' ? kind : 'view' }], {});
      },
      /** Show the banner again, from a "Privacy choices" link. */
      choices: function () { showBanner(); },
    };

    function begin() {
      flushDepth();
      win.addEventListener('scroll', onScroll, { passive: true });
      win.addEventListener('pagehide', function () { if (timer !== null) { win.clearTimeout(timer); flushDepth(); } });
      doc.addEventListener('click', decorate, true);
      var state = consentState();
      if (state === 'yes') journey([{ n: path, k: 'view' }], {});
      else if (state === null && data.banner !== 'off') showBanner();
    }

    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', begin);
    else begin();
    return api;
  }

  return { start: start, pathOf: pathOf, readHandoff: readHandoff, BAND_PX: BAND_PX };
}));
