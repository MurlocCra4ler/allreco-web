import { getCookie, setCookie } from "./shared/cookies";

const routes: Array<[string, string]> = [
  ['https://allreco.webflow.io/bst', 'https://allreco.webflow.io/en/bst'],
];

setCookie('lang', 'de');
const lang = getCookie('lang');
console.log(lang);

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

  switch (lang) {
    case 'de':
      for (const [urlDE, urlEN] of routes) {
        if (urlDE === url) {
          window.location.replace(urlEN);
        }
      }
      break;
    case 'en':
      for (const [urlDE, urlEN] of routes) {
        if (urlEN === url) {
          window.location.replace(urlDE);
        }
      }
      break;
    case 'default':
      console.error('router.ts: onLangChange: unknown value for lang!');
      break;
  }
}