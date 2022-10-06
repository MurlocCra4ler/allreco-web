const downloads = document.getElementsByClassName("download-block");

(window as any).$memberstackDom.getCurrentMember().then(({ data: member }: any) => {
    if (!member) {
        for (let i = 0; i < downloads.length; i++) {
            downloads[i].setAttribute('href', "../login");
        }
    }
})

const paragraph = document.getElementById("vorteile");
if (paragraph) {
    const splittedText = paragraph.innerText.split(/\r?\n/).filter(x => x !== "");
    let innerHTML = "<ul>";

    for (let i = 0; i < splittedText.length; i++) {
        innerHTML += "<li>" + splittedText[i] + "</li>";
    }

    innerHTML += "</ul>";
    paragraph.innerHTML = innerHTML;
}

const tabsContainer = document.getElementsByClassName("tabs-container")[0];
const tabsContainerHeight = tabsContainer.getBoundingClientRect().height
const contentHeight = document.getElementsByClassName("selection-content")[0].getBoundingClientRect().height;
const headers = document.getElementsByClassName("tab-header");
const contents = document.getElementsByClassName("tab-content-container");

document.addEventListener("scroll", PositionHeaderContainer, { passive: true });

function PositionHeaderContainer() {
    let offset = 0;
    (tabsContainer as HTMLElement).style.top = "0px";
    let top = tabsContainer.getBoundingClientRect().top;


    while (top < 0 && offset - top + tabsContainerHeight < contentHeight) {
        offset -= top;
        (tabsContainer as HTMLElement).style.top = offset + "px";
        top = tabsContainer.getBoundingClientRect().top;
    }

    if (top < 0) {
        (tabsContainer as HTMLElement).style.top = contentHeight - tabsContainerHeight + "px";
    }

    for (let i = 0; i < contents.length; i++) {
        const pTop = contents[i].getBoundingClientRect().top;
        const pBot = contents[i].getBoundingClientRect().bottom;

        headers[i].setAttribute("content-on-display", "false");

        if (pTop - 48 <= 0 && pBot - 48 > 0) {
            headers[i].setAttribute("content-on-display", "true");
        }
    }
}
