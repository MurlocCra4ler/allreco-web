import Cookies from "cookies-ts"
 
const routes: Array<[string, string]> = [
  ['https://allreco.webflow.io/bst', 'https://allreco.webflow.io/en/bst'],
];
const cookies = new Cookies()
const lang = cookies.get('lang');

if (lang) {
  onLangchange(lang);
}

document.addEventListener('langchange', () => {
  const lang = cookies.get('lang');

  if (lang) {
    onLangchange(lang);
  }
});

function onLangchange(lang: string): void {
  const url = window.location.href;

  switch (lang) {
    case 'de':
      for (const [urlDE, urlEN] of routes) {
        if (urlEN === url) {
          window.location.replace(urlDE);
        }
      }
      break;
    case 'en':
      for (const [urlDE, urlEN] of routes) {
        if (urlDE === url) {
          window.location.replace(urlEN);
        }
      }
      break;
    case 'default':
      console.error('router.ts: onLangChange: unknown value for lang!');
      break;
  }
}