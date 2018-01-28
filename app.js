const slider = (conteinerClass, options) => {
    const container = [...document.getElementsByClassName(conteinerClass)];
    
    container.map((cont) => {
        const wrapper = document.createElement('div');
        const child = [...cont.children];
        const slideCount = child.length;
        const sliderWidth = cont.offsetWidth;

        cont.parentNode.insertBefore(wrapper, cont).classList.add('slider');
        wrapper.appendChild(cont);

        wrapper.style.width = `${sliderWidth}px`;
        cont.style.width = `${sliderWidth * slideCount}px`;

        for (let i = 0; i < child.length; i++) {
            child[i].classList.add('slide');
        };

        cont.style.transition = `${options.slideSpeed}ms transform ease`;

        if (options.arrows) {
            const arrows = document.createElement('div');
            const arrowLeft = document.createElement('button');
            const arrowRight = document.createElement('button');
            let base = 0;
            
            arrows.classList.add('arrows');
            arrows.appendChild(arrowLeft).classList.add('arrow-left');
            arrows.appendChild(arrowRight).classList.add('arrow-right');

            wrapper.appendChild(arrows);

            arrowLeft.addEventListener('click', () => {
                base = base - sliderWidth;
                cont.style.transform = `translateX(${base}px)`;
            });

            arrowRight.addEventListener('click', () => {
                base = base + sliderWidth;
                cont.style.transform = `translateX(${base}px)`;
            })
        }
    });
}

slider('slider-container',
    {
        arrows: true,
        dots: true,
        slideSpeed: 2000
    });
