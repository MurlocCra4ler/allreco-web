import { Observable, Subject } from 'rxjs';

let onclick$: Observable<Event> | undefined = (window as any).onclick$;
let onload$: Observable<Event> | undefined = (window as any).onload$;
let onresize$: Observable<Event> | undefined = (window as any).onresize$;

function init() {
  const onclick$$: Subject<Event> = new Subject();
  const onload$$: Subject<Event> = new Subject();
  const onresize$$: Subject<Event> = new Subject();

  onclick$ = onclick$$.asObservable();
  onload$ = onload$$.asObservable();
  onresize$ = onresize$$.asObservable();
  
  (window as any).onclick$ = onclick$;
  (window as any).onload$ = onload$;
  (window as any).onresize$ = onresize$;

  window.addEventListener('click', (ev: Event) => {
    onclick$$.next(ev);
  });
  
  window.addEventListener('load', (ev: Event) => {
    onload$$.next(ev);
  });
  
  window.addEventListener('resize', (ev: Event) => {
    onresize$$.next(ev);
  });
}


export function getOnclick$(): Observable<Event> {
  if (!onclick$) {
    init();
  }

  return (window as any).onclick$;
}

export function getOnload$(): Observable<Event> {
  if (!onload$) {
    init();
  }

  return (window as any).onload$;
}

export function getOnresize$(): Observable<Event> {
  if (!onresize$) {
    init();
  }

  return (window as any).onresize$;
}