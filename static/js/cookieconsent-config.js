import '/js/cookieconsent.umd.js';

/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 *
 * Journeys (Signal, the studio's own first-party analytics, loaded by
 * partials/signal.html just before this module) are opt-in: the `journeys`
 * category starts off, and only the visitor's own accept turns it on. That
 * is when Signal.consent(true) is called; a reject, or withdrawing it later,
 * calls Signal.consent(false), which erases the visitor. Depth (how far a
 * page is read) needs no answer: it keeps no cookie and no id. A Global
 * Privacy Control signal is a no inside Signal, whatever is accepted here.
 *
 * This site has no privacy page of its own: the links go to the studio's.
 */

// Tell Signal what this visitor answered for journeys. Nothing is sent until
// a consent is on record (validConsent), so a first visit is never a yes, and
// a visitor who answered before the journeys category existed stays a no.
function syncJourneys() {
    var signal = window.Signal;
    if (!signal || typeof signal.consent !== 'function') return;
    if (!CookieConsent.validConsent()) return;
    var yes = CookieConsent.acceptedCategory('journeys');
    var kept = signal.consented();
    if (yes && kept !== 'yes') {
        signal.consent(true);
    } else if (!yes && kept !== 'no') {
        signal.consent(false);
    }
}

CookieConsent.run({

    page_scripts: true,

    categories: {
        analytics: {
            enabled: true,
        },
        journeys: {
            enabled: false,
            readOnly: false
        }
    },

    onConsent: syncJourneys,
    onChange: syncJourneys,

    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'We Value Your Privacy',
                    description: 'To provide you with the best experience on our website, we use cookies to measure our performance and improve our content. By clicking "Accept All", you agree to the storing of cookies on your device. Accepting also lets this browser be remembered across our own sites and games, so we can see how people find their way between them; that stays off unless you accept it. You can customize your cookie preferences by selecting "Manage Settings". For more information, please visit our <a href="https://outrightmental.com/privacy/">Privacy Policy</a>.',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences'
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    sections: [
                        {
                            title: 'No Personally Identifiable Information',
                            description: 'We use cookies only to measure our performance and improve our content in order to provide you with the best experience on our website'
                        },
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Journeys Between Our Sites',
                            description: 'Off unless you turn it on. If you do, this browser keeps a random identifier in its own storage (not a cookie), and our own first-party measurement records the pages you view here, the links you follow between our sites and games (docs.xjmusic.com, xjmusic.com, outrightmental.com and the sites of our games), and an email address you give us in one of our forms, so we can see how people find our work. The identifier and any address are hashed; nothing is sold or used for advertising, and it is kept up to 760 days from your last visit. Turning it off erases it. <a href="https://outrightmental.com/privacy/">Details</a>.',
                            linkedCategory: 'journeys'
                        },
                        {
                            title: 'More information',
                            description: 'For more information, please visit our <a href="https://outrightmental.com/privacy/">Privacy Policy</a>. For any queries in relation to my policy on cookies and your choices, please <a href="https://xjmusic.com/contact-us/">contact us</a>'
                        }
                    ]
                }
            }
        }
    }
});