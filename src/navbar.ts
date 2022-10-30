import { Observable } from "rxjs";
import { animateElement, Animation, AnimationName } from "./shared/animate";
import { removeCookie, setCookie, Options } from "./shared/cookies";
import { getOnscroll$, getOnresize$ } from "./shared/window-events";
import { enableBodyScroll, disableBodyScroll } from "./shared/window-functions";

const menu = document.getElementById('menu');
const dropdown = document.getElementById('dropdown');
const overlay = document.getElementById('blocking-overlay');
let toggled = false;
let inOverlayAnimation = false;
let inDropdownAnimation = false;

const onresize$: Observable<Event> = getOnresize$();
onresize$.subscribe(() => {
  if (toggled && window.innerHeight < 687) {
    disableBodyScroll();
    return;
  }

  enableBodyScroll();
});

if (menu && overlay) {
  menu.addEventListener('click', function () {
    toggleSidebar();
  });

  overlay.addEventListener('click', function() {
    if (toggled) {
      toggleSidebar();
    }
  })

  const onscroll$: Observable<Event> = getOnscroll$();
  onscroll$.subscribe(() => {
    if (toggled) {
      toggleSidebar();
    }
  });
}

function toggleSidebar(): void {
  if (!menu || !dropdown || !overlay) {
    return;
  }

  if (inOverlayAnimation || inDropdownAnimation) {
    return;
  }

  inOverlayAnimation = true;
  inDropdownAnimation = true;

  if (toggled) {
    menu.classList.remove('toggled');

    animateElement(dropdown, new Animation(AnimationName.SlideOutRight, undefined, undefined, undefined, () => {
      dropdown.classList.remove('toggled');
      inDropdownAnimation = false;
    }));

    animateElement(overlay, new Animation(AnimationName.FadeOut, undefined, undefined, undefined, () => {
      overlay.classList.remove('toggled');
      inOverlayAnimation = false;
    }));

    enableBodyScroll();
  } else {
    menu.classList.add('toggled');
    dropdown.classList.add('toggled');
    overlay.classList.add('toggled');

    animateElement(dropdown, new Animation(AnimationName.SlideInRight, undefined, undefined, undefined, () => {
      inDropdownAnimation = false;
    }));

    animateElement(overlay, new Animation(AnimationName.FadeIn, undefined, undefined, undefined, () => {
      inOverlayAnimation = false;
    }));

    if (window.innerHeight < 687) {
      disableBodyScroll();
    }
  }
  toggled = !toggled;
}

const login = document.getElementById('login');
const logout = document.getElementById('logout');

if (login && logout) {
  const memberstack = (window as any).$memberstackDom;
  memberstack.getCurrentMember().then(({ data: member }: any) => {
    if (member) {
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
