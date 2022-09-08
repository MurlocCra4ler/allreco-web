import Cookies, { CookiesOption } from "cookies-ts"

const menu = document.getElementById('menu');
const dropdown = document.getElementById('dropdown');
const overlay = document.getElementById('blocking-overlay');
let toggled = false;

if (menu && dropdown && overlay) {
  menu.addEventListener('click', function () {
    if (toggled) {
      menu.classList.remove('toggled');
      dropdown.classList.remove('toggled');
      overlay.classList.remove('toggled');
    } else {
      menu.classList.add('toggled');
      dropdown.classList.add('toggled');
      overlay.classList.add('toggled');
    }

    toggled = !toggled;
  });

  document.addEventListener('scroll', function () {
    if (toggled) {
      menu.classList.remove('toggled');
      dropdown.classList.remove('toggled');
      overlay.classList.remove('toggled');
      toggled = false;
    }
  });
}

const login = document.getElementById('login');
const logout = document.getElementById('logout');

declare let MemberStack: any;

if (login && logout) {
  MemberStack.onReady.then(function (member: any) {
    if (member.loggedIn) {
      login.style.display = 'none';
      logout.style.display = 'flex';
    } else {
      login.style.display = 'flex';
      logout.style.display = 'none';
    }
  });
}

let langMenuVisible = false;
const globe = document.getElementById('globe');

if (globe) {
  globe.addEventListener('click', function () {
    if (langMenuVisible) {
      globe.classList.remove('selected');
      langMenuVisible = false;
    } else {
      globe.classList.add('selected');
      langMenuVisible = true;
    }
  });
}

const cookies = new Cookies()

document.getElementById('lang-de')?.addEventListener('click', function () {
  cookies.set('lang', 'de');
  const event = new Event('langchange');
  document.dispatchEvent(event);
});

document.getElementById('lang-en')?.addEventListener('click', function () {
  cookies.set('lang', 'en');
  const event = new Event('langchange');
  document.dispatchEvent(event);
});
