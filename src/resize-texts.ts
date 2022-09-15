import { delay, Observable } from "rxjs";
import { getOnclick$, getOnresize$ } from "./shared/window-events";

const downloadTexts = document.getElementsByClassName("resize-text");
const origTexts: Array<string> = [];

for (let i = 0; i < downloadTexts.length; i++) {
  origTexts.push((downloadTexts[i] as any).innerText);
}

const onclick$: Observable<Event> = getOnclick$();
const onresize$: Observable<Event> = getOnresize$();

onclick$.pipe(delay(50)).subscribe(() => {
  checkForOverflows();
});

onresize$.subscribe(() => {
  checkForOverflows();
})

function checkForOverflows(): void {
  for (let i = 0; i < downloadTexts.length; i++) {
    (downloadTexts[i] as any).innerText = origTexts[i];

    const parent = downloadTexts[i].parentElement;

    if (parent && isOverflown(parent)) {
      resizeText(i);
    }
  }
}

function isOverflown(el: Element): boolean {
  return el.scrollWidth > el.clientWidth;
}

function resizeText(index: number): void {
  const text = origTexts[index];
  const element = downloadTexts[index];
  const parent = element.parentElement;

  let chunk = Math.floor(text.length / 2);
  while (parent && isOverflown(parent)) {
    if (chunk < 3) break;

    (element as any).innerText = text.slice(0, chunk) + '...' + text.slice(-chunk);
    chunk -= 1;
  }
}