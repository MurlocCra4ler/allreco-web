import { animateElement, Animation, AnimationName, AnimationDuration } from "./shared/animate";

//delete all empty <p>s
const ps = document.getElementsByTagName("p");
Array.from(ps).forEach(p => {
    if (p.innerText.replace(/[^\w\s]/gi, '') !== "") {
        return;
    }

    if (p.parentNode) {
        p.parentNode.removeChild(p);
    }
});

const dropdownBTNs = document.getElementsByClassName("dropdown-btn");
const dropdownContents = document.getElementsByClassName("vendor-list-container");

Array.from(dropdownBTNs).forEach(dropdownBTN => {
    dropdownBTN.addEventListener("click", event => onClick(event));
});

Array.from(dropdownContents).forEach(dropdownContent => {
    dropdownContent.addEventListener("focusout", event => onFocusout(event));
});

function onClick(event: Event) {
    if (!event.target) {
        console.error('onClick: event target is missing');
        return;
    }

    const parent = (event.target as HTMLElement).parentElement;
    if (parent?.getAttribute("disabled") === "true") {
        return;
    }

    const vendorListContainer = parent?.getElementsByClassName("vendor-list-container")[0];
    if (!vendorListContainer) {
        return;
    }

    vendorListContainer.classList.add("visible");
    (vendorListContainer as HTMLElement).focus();
}

function onFocusout(event: Event) {
    const target = event.target;
    if (!target) {
        console.error('onFocusout: event target is missing');
        return;
    }

    const parent = (target as HTMLElement).parentElement;
    if (!parent) {
        console.error('onFocusout: parent is missing');
        return;
    }

    parent.getElementsByClassName("vendor-list-container")[0].classList.remove("visible");
}

function setEntries(dropdown: HTMLElement, newEntries: string[]) {
    const dropdownContent = dropdown.getElementsByClassName("vendor-list-container")[0];
    let entries = dropdownContent.getElementsByClassName("vendor-list-item");

    while (entries.length < newEntries.length) {
        const dup = entries[0].cloneNode(false);
        dropdownContent.appendChild(dup);
        entries = dropdownContent.getElementsByClassName("vendor-list-item");
    }

    while (entries.length > newEntries.length) {
        entries[0].remove();
        entries = dropdownContent.getElementsByClassName("vendor-list-item");
    }

    for (let i = 0; i < entries.length; i++) {
        const element = entries[i] as HTMLElement;

        element.innerText = newEntries[i];
        if ((element as any).listener) {
            entries[i].removeEventListener("click", (element as any).listener);
        }
        (element as any).listener = (event: Event) => onSelect(event, newEntries[i]);
        entries[i].addEventListener("click", (element as any).listener);
    }
}

function setValue(dropdown: HTMLElement, value: string) {
    dropdown.setAttribute("value", value);
    (dropdown.getElementsByClassName("btn-text")[0] as HTMLElement).innerText = value;
    dropdown.getElementsByClassName("vendor-list-container")[0].classList.remove("visible");
}

function setDisabled(dropdown: HTMLElement, value: boolean) {
    const btn = dropdown.getElementsByClassName("dropdown-btn")[0];

    if (value) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled");
    }

    dropdown.setAttribute("disabled", String(value));
}

function onSelect(event: Event, value: string) {
    const target = event.target;
    if (!target) {
        console.error('onSelect: target is missing');
        return;
    }

    const parent = (target as HTMLElement).parentNode?.parentNode;
    if (!parent) {
        console.error('onSelect: parent is missing');
        return;
    }

    setValue((parent as HTMLElement), value);
    (parent as any).onchange();
}

const vendors: { market: string, country: string, region: string }[] = [];
const markets: string[] = [];
let countries: string[] = [];
let regions: string[] = [];

let vendorContainers = document.getElementsByClassName('vendor-content-container') as HTMLCollectionOf<HTMLElement>;
Array.from(vendorContainers).forEach(vendorContainer => {
    const market = vendorContainer.getElementsByClassName("content-field-market")[0] as HTMLElement;
    const country = vendorContainer.getElementsByClassName("content-field-country")[0] as HTMLElement;
    const region = vendorContainer.getElementsByClassName("content-field-region")[0] as HTMLElement;

    if (region.innerText !== "") {
        (vendorContainer.getElementsByClassName("region-header")[0] as HTMLElement).innerText = region.innerText;
        vendorContainer.classList.add("mix");
        vendorContainer.classList.add(market.innerText);
        vendorContainer.classList.add(country.innerText);
        vendorContainer.classList.add(region.innerText);
    }

    vendors.push({
        market: market.innerText,
        country: country.innerText,
        region: region.innerText
    });

    market.style.display = 'none';
    country.style.display = 'none';
    region.style.display = 'none';
});

for (const vendor of vendors) {
    if (!countries.includes(vendor.country)) {
        countries.push(vendor.country);
    }
}

const vendorContents = document.getElementsByClassName('vendor-content');
Array.from((vendorContents as HTMLCollectionOf<HTMLElement>)).forEach(vendorContent => {
    if (vendorContent.innerText === "") {
        if (!vendorContent.parentElement) {
            console.error('anonymous: vendorContent parent is missing');
            return;
        }

        vendorContent.parentElement.style.display = 'none';
    }
});

let vendorCategoryContainers = document.getElementsByClassName('vendor-category-container');
vendorCategoryContainers[0].classList.add("mix")
const vendorCategoryContainersParent = vendorCategoryContainers[0].parentElement;

while (vendorCategoryContainers.length < countries.length) {
    if (!vendorCategoryContainersParent) {
        console.error('distributor-search: vendorCategoryContainers parent is missing');
        break;
    }

    vendorCategoryContainersParent.appendChild(vendorCategoryContainers[0].cloneNode(true));
    vendorCategoryContainers = document.getElementsByClassName('vendor-category-container');
}

for (let i = 0; i < countries.length; i++) {
    (vendorCategoryContainers[i].getElementsByClassName('category-name-container')[0] as any).innerText = countries[i];
}

const tempContainer = document.getElementById('temp');
if (!tempContainer) {
    throw new Error('distributor-search: vendorCategoryContainers parent is missing');
}

vendorContainers = tempContainer.getElementsByClassName('vendor-content-container') as HTMLCollectionOf<HTMLElement>;
let lastSize = vendorContainers.length;
while (vendorContainers.length > 0) {
    const element = vendorContainers[0].parentElement?.removeChild(vendorContainers[0]);
    if (!element) {
        throw new Error('distributor-search: vendorContainer parent is missing');
    }

    const market = (element.getElementsByClassName("content-field-market")[0] as HTMLElement)
        .innerText.replace(/ /g, '').replace(/&/g, '-');
    const country = (element.getElementsByClassName("content-field-country")[0] as HTMLElement)
        .innerText.replace(/ /g, '').replace(/&/g, '-');
    const region = (element.getElementsByClassName("content-field-region")[0] as HTMLElement)
        .innerText.replace(/ /g, '').replace(/&/g, '-');
    
    for (let i = 0; i < vendorCategoryContainers.length; i++) {
        const header = (vendorCategoryContainers[i].getElementsByClassName("category-name-container")[0] as HTMLElement)
            .innerText.replace(/ /g, '').replace(/&/g, '-');
        
        if (country.toUpperCase() === header.toUpperCase()) {
            vendorCategoryContainers[i].append(element);
            if (market !== "") {
                vendorCategoryContainers[i].classList.add(market);
            }
            if (country !== "") {
                vendorCategoryContainers[i].classList.add(country);
            }
            if (region !== "") {
                vendorCategoryContainers[i].classList.add(region);
            }
            break;
        }
    }
    vendorContainers = tempContainer.getElementsByClassName('vendor-content-container') as HTMLCollectionOf<HTMLElement>;
    if (lastSize == vendorContainers.length) {
        throw new Error('distributor-search: failed to remove vendor from tempory container');
    }
    lastSize = vendorContainers.length;
}

const marketSelect = document.getElementById('marketSelect');
const countrySelect = document.getElementById('countrySelect');
const regionSelect = document.getElementById('regionSelect');

if (!marketSelect || !countrySelect || !regionSelect) {
    throw new Error('distributor-search: failed to find selection inputs');
}

const marketSelectDefault = document.getElementById('marketSelectDefault')?.innerText;
const countrySelectDefault = document.getElementById('countrySelectDefault')?.innerText;
const regionSelectDefault = document.getElementById('regionSelectDefault')?.innerText;

if (!marketSelectDefault || !countrySelectDefault || !regionSelectDefault) {
    throw new Error('distributor-search: failed to find default values');
}

setDisabled(marketSelect, false);
setDisabled(countrySelect, true);
setDisabled(regionSelect, true);

for (const vendor of vendors) {
    if (!markets.includes(vendor.market)) {
        markets.push(vendor.market);
    }
}

setEntries(marketSelect, markets);
marketSelect.onchange = function () {
    const market = marketSelect.getAttribute("value");
    countries = [];

    for (const vendor of vendors) {
        if (vendor.market == market && !countries.includes(vendor.country)) {
            countries.push(vendor.country);
        }
    }

    setEntries(countrySelect, countries);
    setValue(countrySelect, countrySelectDefault);
    setValue(regionSelect, regionSelectDefault);
    setDisabled(countrySelect, false);
    setDisabled(regionSelect, true);

    Array.from($('.vendor-category-container')).forEach(element => {
        element.classList.remove('toggled');
    });
    const collection = $('.vendor-content-container, .vendor-category-container.' + market);
    mixer.filter(collection);
}

countrySelect.onchange = function () {
    const country = countrySelect.getAttribute("value");
    if (!country) {
        console.error('countrySelect.onchange: countrySelect has no value');
        return;
    }

    regions = [];

    for (const vendor of vendors) {
        if (vendor.country == country && !regions.includes(vendor.region)) {
            regions.push(vendor.region);
        }
    }

    if (regions.length == 1 && regions[0] === "") {
        setValue(regionSelect, regionSelectDefault);
        setDisabled(regionSelect, true);
    } else {
        setEntries(regionSelect, regions);
        setValue(regionSelect, regionSelectDefault);
        setDisabled(regionSelect, false);
    }

    Array.from($('.vendor-category-container')).forEach(element => {
        element.classList.remove('toggled');
    });
    const search = country.replace(/ /g, '').replace(/&/g, '-');
    const collection = $('.vendor-content-container, .vendor-category-container.' + search);
    mixer.filter(collection);
    Array.from($('.vendor-category-container.' + search)).forEach(element => {
        element.classList.add('toggled');
    });
}

regionSelect.onchange = function () {
    const region = regionSelect.getAttribute("value");

    Array.from($('.vendor-category-container')).forEach(element => {
        element.classList.remove('toggled');
    });
    const collection = $('.vendor-content-container.' + region
        + ', .vendor-category-container.' + region);
    Array.from($('.vendor-category-container.' + region)).forEach(element => {
        element.classList.add('toggled');
    });
    mixer.filter(collection);
}

const container = document.getElementById('vendor-list');
if (!container) {
    throw new Error('distributor-search: vendor list not found');
}

declare function mixitup(container: HTMLElement, object: any): any;
const mixer = mixitup(container, {
    animation: {
        duration: 350
    }
});


function onToggle(event: Event) {
    if (!event.target) {
        console.error('onToggle: event target is missing');
        return;
    }

    const element = event.target as any;
    element.activeAnimations = element.activeAnimations == null ? 0 : element.activeAnimations;

    if (element.activeAnimations != 0) {
        console.log('onToggle: has still running animations');
        return;
    }

    const contentContainers = (event.target as HTMLElement).parentElement?.getElementsByClassName('vendor-content-container');
    if (!contentContainers) {
        console.error('onToggle: content containers not found');
        return;
    }

    const minus = ((event.target as HTMLElement).getElementsByClassName('minus')[0] as HTMLElement);

    if (!element.toggled) {
        element.toggled = true;
        element.parentElement.classList.add("toggled");
        element.activeAnimations += 1;

        animateElement(minus, new Animation(AnimationName.CustomPlusToMinus, undefined, undefined, AnimationDuration.Faster, () => {
            element.activeAnimations -= 1;
            minus.style.display = 'none';
        }));

        Array.from(contentContainers).forEach(contentContainer => {
            element.activeAnimations += 1;

            animateElement(contentContainer, new Animation(AnimationName.FadeIn, undefined, undefined, undefined, () => {
                element.activeAnimations -= 1;
            }));
        });

    } else {
        element.activeAnimations += 1;
        minus.style.display = 'block';

        animateElement(minus, new Animation(AnimationName.CustomMinusToPlus, undefined, undefined, AnimationDuration.Faster, () => {
            element.activeAnimations -= 1;

            if (element.activeAnimations == 0) {
                element.toggled = false;
                element.parentElement.classList.remove("toggled");
            }
        }));

        Array.from(contentContainers).forEach(contentContainer => {
            element.activeAnimations += 1;

            animateElement(contentContainer, new Animation(AnimationName.FadeOut, undefined, undefined, AnimationDuration.Faster, () => {
                element.activeAnimations -= 1;

                if (element.activeAnimations == 0) {
                    element.toggled = false;
                    element.parentElement.classList.remove("toggled");
                }
            }));
        });
    }   
}

const vendorCategories = document.getElementsByClassName('vendor-category');
Array.from(vendorCategories).forEach(vendorCategory => {
    vendorCategory.addEventListener("click", onToggle);
});