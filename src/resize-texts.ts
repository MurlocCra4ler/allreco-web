import { delay, Observable } from "rxjs";
import { getOnclick$, getOnresize$ } from "./shared/window-events";

const downloadTexts = document.getElementsByClassName("resize-text");

Array.from(downloadTexts).forEach(downloadText => {
    const element = (downloadText as any);
    element.origText = element.innerText;
});

const onclick$: Observable<Event> = getOnclick$();
const onresize$: Observable<Event> = getOnresize$();

onclick$.pipe(delay(50)).subscribe(() => {
    checkForOverflows();
});

onresize$.subscribe(() => {
    checkForOverflows();
})

function checkForOverflows(): void {
    Array.from(downloadTexts).forEach(downloadText => {
        const parent = downloadText.parentElement;
        if (parent && isOverflown(parent)) {
            resizeText(downloadText)
        }
    });
}

function isOverflown(el: Element): boolean {
    return el.scrollWidth > el.clientWidth;
}

function resizeText(el: Element): void {
    const text = (el as any).origText;
    const parent = el.parentElement;

    let chunk = Math.floor(text.length / 2);
    while (parent && isOverflown(parent)) {
        if (chunk < 3) break;

        (el as any).innerText = text.slice(0, chunk) + '...' + text.slice(-chunk);
        chunk -= 1;
    }
}