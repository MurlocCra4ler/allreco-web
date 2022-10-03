import { Callbacks } from "jquery";
import { Observable } from "rxjs";
import { animateElement, Animation, AnimationName } from "./shared/animate";
import { removeCookie, setCookie, Options } from "./shared/cookies";
import { getOnscroll$ } from "./shared/window-events";

const menu = document.getElementById('menu');
const dropdown = document.getElementById('dropdown');
const overlay = document.getElementById('blocking-overlay');
let toggled = false;

if (menu && dropdown && overlay) {
  menu.addEventListener('click', function () {
    if (toggled) {
      menu.classList.remove('toggled');
      overlay.classList.remove('toggled');
      animateElement(dropdown, new Animation(AnimationName.SlideOutRight,undefined, undefined,undefined,()=>{
        dropdown.classList.remove('toggled');
      }));
      animateElement(overlay, new Animation(AnimationName.FadeOut,undefined, undefined,undefined,()=>{
        overlay.classList.remove('toggled');
      }));
    } else {
      menu.classList.add('toggled');
      dropdown.classList.add('toggled');
      overlay.classList.add('toggled');
      animateElement(dropdown, new Animation(AnimationName.SlideInRight));
      animateElement(overlay, new Animation(AnimationName.FadeIn));
    }

    toggled = !toggled;
  });

  overlay.addEventListener('click', function() {
    if (toggled) {
      menu.classList.remove('toggled');
      dropdown.classList.remove('toggled');
      overlay.classList.remove('toggled');
      toggled = false;
    }
  })

  const onscroll$: Observable<Event> = getOnscroll$();
  onscroll$.subscribe(() => {
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

const options: Options = { 
  path: '/',
  expires: new Date().getTime()+1000*60*60*24*365,
};

document.getElementById('lang-de')?.addEventListener('click', function () {
  removeCookie('lang');
  setCookie('lang', 'de', options);
  const event = new Event('langchange');
  document.dispatchEvent(event);
});

document.getElementById('lang-en')?.addEventListener('click', function () {
  removeCookie('lang');
  setCookie('lang', 'en', options);
  const event = new Event('langchange');
  document.dispatchEvent(event);
});

