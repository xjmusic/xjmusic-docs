import '/js/cookieconsent.umd.js';

/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
CookieConsent.run({

    page_scripts: true,

    categories: {
        analytics: {
            enabled: true,
        }
    },

    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'We Value Your Privacy',
                    description: 'To provide you with the best experience on our website, we use cookies to measure our performance and improve our content. By clicking "Accept All", you agree to the storing of cookies on your device. You can customize your cookie preferences by selecting "Manage Settings". For more information, please visit our <a href="/privacy"/>Privacy Policy</a>.',
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
                            title: 'More information',
                            description: 'For more information, please visit our <a href="/privacy"/>Privacy Policy</a>. For any queries in relation to my policy on cookies and your choices, please <a href="/contact-us">contact us</a>'
                        }
                    ]
                }
            }
        }
    }
});