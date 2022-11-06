import { getCookie } from "./shared/cookies";

const routes: Array<[string, string]> = [
    ['https://www.allreco.de/', 'https://www.allreco.de/en/home'],
    ['https://www.allreco.de/anwendungen/ubersicht', 'https://www.allreco.de/en/application-areas/overview'],
    ['https://www.allreco.de/anwendungen/altholz', 'https://www.allreco.de/en/application-areas/waste-wood'],
    ['https://www.allreco.de/anwendungen/bioabfall', 'https://www.allreco.de/en/application-areas/biowaste'],
    ['https://www.allreco.de/anwendungen/grungut', 'https://www.allreco.de/en/application-areas/green-waste'],
    ['https://www.allreco.de/anwendungen/kompostsiebuberlauf', 'https://www.allreco.de/en/application-areas/compost-screen-oversize'],
    ['https://www.allreco.de/anwendungen/biogut', 'https://www.allreco.de/en/application-areas/biodegradable-waste'],
    ['https://www.allreco.de/anwendungen/restmull', 'https://www.allreco.de/en/application-areas/residual-waste'],
    ['https://www.allreco.de/anwendungen/gewerbeabfall', 'https://www.allreco.de/en/application-areas/industrial-waste'],
    ['https://www.allreco.de/anwendungen/ersatzbrennstoffe', 'https://www.allreco.de/en/application-areas/refuse-derived-fuel'],
    ['https://www.allreco.de/anwendungen/baumischabfall', 'https://www.allreco.de/en/application-areas/mixed-construction-waste'],
    ['https://www.allreco.de/anwendungen/deponieruckbau', 'https://www.allreco.de/en/landfill-mining'],
    ['https://www.allreco.de/handlerdownloads', 'https://www.allreco.de/en/handlerdownloads'],
    ['https://www.allreco.de/produktgruppenubersicht', 'https://www.allreco.de/en/produktgruppenubersicht'],
    ['https://www.allreco.de/das-ist-allreco', 'https://www.allreco.de/en/this-is-allreco'],
    ['https://www.allreco.de/after-sales', 'https://www.allreco.de/en/after-sales'],
    ['https://www.allreco.de/news', 'https://www.allreco.de/en/news'],
    ['https://www.allreco.de/kontakt', 'https://www.allreco.de/en/contact'],
    ['https://www.allreco.de/bst', 'https://www.allreco.de/en/bst'],
    ['https://www.allreco.de/impressum', 'https://www.allreco.de/en/imprint']
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