const inputs = document.getElementsByClassName('timeline-input') as HTMLCollectionOf<HTMLElement>;
const paras = document.getElementsByClassName('description-container') as HTMLCollectionOf<HTMLElement>;

paras[0].classList.add('active');
Array.from(paras).forEach(param => {
    param.classList.add('animate__animated', 'animate__fadeIn');

})

Array.from(inputs).forEach(input => {
    input.addEventListener('click', (event) => {
        Array.from(inputs).filter(x => x != input).forEach((filteredInput) => {
            filteredInput.classList.remove('active');
        });

        input.classList.add('active');
        const dataset = (input.children[0] as HTMLElement).dataset['year'];

        Array.from(paras).filter(x => x.dataset['year'] != dataset).forEach(inactiveParam => {
            inactiveParam.classList.remove('active');
        });

        Array.from(paras).filter(x => x.dataset['year'] === dataset).forEach(acitveParam => {
            acitveParam.classList.add('active');
        });
    })
});