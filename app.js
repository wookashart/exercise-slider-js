//     if (options.dots) {
//       const dots = document.createElement('div');
      
//       dots.classList.add('dots');
//       wrapper.appendChild(dots);

//       for (let i = 0; i < slideCount; i++) {
//         const dot = document.createElement('span');
//         dot.classList.add('dot');
//         dots.appendChild(dot);
//       }

//       const dotBtn = [...document.getElementsByClassName('dot')];
//       const firstDot = dotBtn[0];

//       const removeClass = () => {
//         const x = [...dots.children];

//         x.map((d) => {
//           d.classList.remove('active');
//         })
//       }

//       firstDot.classList.add('active');

//       dotBtn.map((dot, i) => {
//         dot.addEventListener('click', () => {
//           removeClass();
//           base = (- sliderWidth * i);
//           cont.style.transform = `translateX(${base}px)`;
//           dot.classList.add('active');
//         })
//       })

//       if (options.arrows) {
//         const la = document.getElementsByClassName('arrow-left');
//         const ra = document.getElementsByClassName('arrow-right');
//         let dotIndex = 0;

//         la[0].addEventListener('click', (e) => {
//           if (dotIndex <= 0)           {
//             e.preventDefault();
//           } else {
//             removeClass();
//             dotIndex --;
//             dotBtn[dotIndex].classList.add('active');
//           }
//         });

//         ra[0].addEventListener('click', (e) => {
//           if (dotIndex >= slideCount)           {
//             e.preventDefault();
//           } else {
//             removeClass();
//             dotIndex ++;
//             dotBtn[dotIndex].classList.add('active');
//           }
//         });
//       }
//     }
//   });
// }

class Slider {
  constructor(container, options) {
    const defaultOptions = {
      arrows: true,
      dots: true,
      slideSpeed: 2000,
      infinite: true,
    }
    let typeContainer;
    const finalOptions = Object.assign(defaultOptions, options);

    this.checkTypeOfSelector(container);
    this.buildSlider();
    this.buildArrows(finalOptions);
  }

  checkTypeOfSelector(container) {
    if (container.charAt(0) === '.') {
      let string = container.split('');

      delete string[0];
      string = string.join('');
      this.typeContainer = [...document.getElementsByClassName(string)];
    } else if (container.charAt(0) === '#') {
      let string = container.split('');

      delete string[0];
      string = string.join('');
      this.typeContainer = document.getElementById(string);
    } else {
      this.typeContainer = [...document.getElementsByTagName(container)];
    }
  };

  buildSlider() {
    this.typeContainer.map((cont) => {
      const wrapper = document.createElement('div');
      const child = [...cont.children];
      const slideCount = child.length;
      const sliderWidth = cont.offsetWidth;

      cont.parentNode.insertBefore(wrapper, cont).classList.add('slider-wrapper');
      wrapper.appendChild(cont);

      wrapper.style.width = `${sliderWidth}px`;
      cont.style.width = `${sliderWidth * slideCount}px`;

      for (let i = 0; i < child.length; i++) {
        child[i].classList.add('slide');
      };

      // cont.style.transition = `${options.slideSpeed}ms transform ease`;
    })
  };

  buildArrows(finalOptions) {
    if (finalOptions.arrows) {
      const sliderWrapper = document.getElementsByClassName('slider-wrapper');
      const arrows = document.createElement('div');
      const arrowLeft = document.createElement('button');
      const arrowRight = document.createElement('button');
      // let base = 0;
            
      arrows.classList.add('arrows');
      arrows.appendChild(arrowLeft).classList.add('arrow-left');
      arrows.appendChild(arrowRight).classList.add('arrow-right');

      sliderWrapper[0].appendChild(arrows);

      // console.log(sliderWrapper);

      // arrowLeft.addEventListener('click', (e) => {
      //   if (base >= 0) {
      //     e.preventDefault();
      //   } else {
      //     base = base + sliderWidth;
      //   }
      //   cont.style.transform = `translateX(${base}px)`;
      // });

      // arrowRight.addEventListener('click', (e) => {
      //   if (base <= - (sliderWidth * (slideCount - 1))) {
      //     e.preventDefault();
      //   } else {
      //     base = base - sliderWidth;
      //   }
      //   cont.style.transform = `translateX(${base}px)`;
      // })
    }
  };
}

const imageSlider = new Slider('.slider-container',
  {
    arrows: true,
    dots: true,
    slideSpeed: 2500,
    infinite: false,
  })