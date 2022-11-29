import { getCookie } from "./shared/cookies";

const routes: Array<[string, string]> = [
    ['https://www.allreco.de/', 'https://www.allreco.de/en/home'],
    ['https://www.allreco.de/anwendungen/ubersicht', 'https://www.allreco.de/en/application-areas/overview'],
    ['https://www.allreco.de/anwendungen/altholz', 'https://www.allreco.de/en/application-areas/waste-wood'],
    ['https://www.allreco.de/anwendungen/bioabfall', 'https://www.allreco.de/en/application-areas/biowaste'],
    ['https://www.allreco.de/anwendungen/grungut', 'https://www.allreco.de/en/application-areas/green-waste'],
    ['https://www.allreco.de/anwendungen/kompostsiebuberlauf', 'https://www.allreco.de/en/application-areas/compost-screen-oversize'],
    ['https://www.allreco.de/anwendungen/biogut', 'https://www.allreco.de/en/application-areas/source-separated-organics'],
    ['https://www.allreco.de/anwendungen/restmull', 'https://www.allreco.de/en/application-areas/residual-waste'],
    ['https://www.allreco.de/anwendungen/gewerbeabfall', 'https://www.allreco.de/en/application-areas/industrial-waste'],
    ['https://www.allreco.de/anwendungen/ersatzbrennstoffe', 'https://www.allreco.de/en/application-areas/refuse-derived-fuel'],
    ['https://www.allreco.de/anwendungen/baumischabfall', 'https://www.allreco.de/en/application-areas/mixed-construction-waste'],
    ['https://www.allreco.de/anwendungen/deponieruckbau', 'https://www.allreco.de/en/application-areas/landfill-mining'],
    ['https://www.allreco.de/downloads', 'https://www.allreco.de/en/downloads'],
    ['https://www.allreco.de/produktgruppen', 'https://www.allreco.de/en/product-groups'],
    ['https://www.allreco.de/das-ist-allreco', 'https://www.allreco.de/en/this-is-allreco'],
    ['https://www.allreco.de/after-sales', 'https://www.allreco.de/en/after-sales'],
    ['https://www.allreco.de/news', 'https://www.allreco.de/en/news'],
    ['https://www.allreco.de/termine', 'https://www.allreco.de/en/events'],
    ['https://www.allreco.de/kontakt', 'https://www.allreco.de/en/contact'],
    ['https://www.allreco.de/bst', 'https://www.allreco.de/en/bst'],
    ['https://www.allreco.de/verfahrenstechnische-beratung', 'https://www.allreco.de/en/procedural-consulting'],
    ['https://www.allreco.de/vertriebspartnersuche', 'https://www.allreco.de/en/distributor-search'],
    ['https://www.allreco.de/impressum', 'https://www.allreco.de/en/imprint'],
    ['https://www.allreco.de/login', 'https://www.allreco.de/en/login'],
    ['https://www.allreco.de/signup', 'https://www.allreco.de/en/signup'],
    ['https://www.allreco.de/passwort-reset', 'https://www.allreco.de/en/password-reset'],
    ['https://www.allreco.de/passwort-reset-2', 'https://www.allreco.de/en/password-reset-2'],
    ['https://www.allreco.de/passwort-reset-3', 'https://www.allreco.de/en/password-reset-3'],
    ['https://www.allreco.de/haendler-passwort-reset', 'https://www.allreco.de/en/vendor-password-reset']
];

const lang = getCookie('lang');

if (lang) {
    onLangchange(lang);
}

document.addEventListener('langchange', () => {
    const lang = getCookie('lang');

    if (lang) {
        onLangchange(lang);
    }
});

function onLangchange(lang: string): void {
    const url = window.location.href;
    const newUrl = getRoute(lang, url);

    if (newUrl !== "") {
        window.location.replace(newUrl);
    }
}

function getRoute(lang: string, url: string): string {
    let element;

    switch (lang) {
        case 'de':
            //special case for products
            if (url.includes("products/")) {
                return url.replace("products/", "produkte/");
            }

            //special case for product-groups
            if (url.includes("en/product-groups/")) {
                return url.replace("en/product-groups/", "produktgruppen/");
            }

            //special case for news
            element = document.getElementById('route-de');
            if (element) {
                return (element as any).href;
            }

            //default case
            for (const [urlDE, urlEN] of routes) {
                if (url === urlEN) {
                    return urlDE;
                }
            }
            break;
        case 'en':
            //special case for products
            if (url.includes("produkte/")) {
                return url.replace("produkte/", "products/");
            }

            //special case for product-groups
            if (url.includes("produktgruppen/")) {
                return url.replace("produktgruppen/", "en/product-groups/");
            }

            //special case for news
            element = document.getElementById('route-en');
            if (element) {
                return (element as any).href;
            }

            //default case
            for (const [urlDE, urlEN] of routes) {
                if (url === urlDE) {
                    return urlEN;
                }
            }
            break;
        case 'default':
            console.error('router.ts: onLangChange: unknown value for lang');
            return "";
    }

    console.error('router.ts: new Url not found');
    return "";
}