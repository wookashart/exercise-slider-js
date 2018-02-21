class Slider {
  constructor(container, options) {
    const defaultOptions = {
      arrows: true,
      arrowSelector: 'button',
      arrowPrevClass: 'arrow-prev',
      arrowNextClass: 'arrow-next',
      arrowPrevText: 'Previous',
      arrowNextText: 'Next',
      dots: true,
      slideSpeed: 2000,
      infinite: true,
    }
    this.finalOptions = Object.assign(defaultOptions, options);
    this.wrapper = document.createElement('div');

    this.checkTypeOfSelector(container);
    this.buildSlider();
    this.buildArrows();
    this.arrowsHandler();
    this.buildDots();
    this.dotsHandler();
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
      this.child = [...cont.children];
      this.sliderWidth = cont.offsetWidth;
      this.slideCount = this.child.length;

      cont.parentNode.insertBefore(this.wrapper, cont).classList.add('slider-wrapper');
      this.wrapper.appendChild(cont);

      this.wrapper.style.width = `${this.sliderWidth}px`;
      cont.style.width = `${this.sliderWidth * this.slideCount}px`;

      for (let i = 0; i < this.child.length; i++) {
        this.child[i].classList.add('slide');
      };
      cont.style.transition = `${this.finalOptions.slideSpeed}ms transform ease`;
    })
  };

  buildArrows() {
    if (this.finalOptions.arrows) {
      const arrows = document.createElement('div');
      this.arrowLeft = document.createElement(this.finalOptions.arrowSelector);
      this.arrowRight = document.createElement(this.finalOptions.arrowSelector);
            
      arrows.classList.add('arrows');
      arrows.appendChild(this.arrowLeft).classList.add(this.finalOptions.arrowPrevClass);
      arrows.appendChild(this.arrowRight).classList.add(this.finalOptions.arrowNextClass);

      this.arrowLeft.innerText = this.finalOptions.arrowPrevText;
      this.arrowRight.innerText = this.finalOptions.arrowNextText;

      this.wrapper.appendChild(arrows);
    }
  };

  arrowsHandler() {
    if(this.finalOptions.arrows) {
      this.base = 0;
      this.child[0].classList.add('active');
      this.lastSlideIndex = this.slideCount - 1;

      this.typeContainer.map((cont) => {
        this.arrowLeft.addEventListener('click', (e) => {
          this.lastSlideIndex = this.lastSlideIndex === -1 ? this.lastSlideIndex + this.slideCount : this.lastSlideIndex;

          if (this.base >= 0) {
            if(this.finalOptions.infinite) {
              this.slideIndex = -this.base / this.sliderWidth;
              this.lastSlide = this.child[this.lastSlideIndex];
  
              cont.insertBefore(this.child[this.lastSlideIndex], this.child[this.base]);
              this.lastSlideIndex --;
              this.base = this.lastSlideIndex + 1;
  
              for(let i = 0; i < this.child.length; i++) {
                this.child[i].classList.remove('active');
                this.child[this.base].classList.add('active');
              }

              // cont.style.transform = `translateX(${this.base + this.sliderWidth}px)`;
              console.log(this.base);

            } else {
              e.preventDefault();  
            }
          } else {
            this.base = this.base + this.sliderWidth;
          }

          cont.style.transform = `translateX(${this.base}px)`;
          this.slideIndex = -this.base / this.sliderWidth;

          for(let i = 0; i < this.child.length; i++) {
            this.child[i].classList.remove('active');
            this.child[this.slideIndex].classList.add('active');
          }
        });

        this.arrowRight.addEventListener('click', (e) => {
          if (this.base <= - (this.sliderWidth * (this.slideCount - 1))) {
            if(this.finalOptions.infinite) {
              this.slideIndex = -this.base / this.sliderWidth;
              console.log(this.slideIndex);
  
            } else {
              e.preventDefault();
            }
          } else {
            this.base = this.base - this.sliderWidth;
          }

          cont.style.transform = `translateX(${this.base}px)`;
          this.slideIndex = -this.base / this.sliderWidth;

          for(let i = 0; i < this.child.length; i++) {
            this.child[i].classList.remove('active');
            this.child[this.slideIndex].classList.add('active');
          }
        });
      });
    }
  };

  buildDots() {
    if (this.finalOptions.dots) {
      this.dotsContainer = document.createElement('ul');
      
      this.dotsContainer.classList.add('dots');
      this.wrapper.appendChild(this.dotsContainer);

      for (let i = 0; i < this.slideCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        this.dotsContainer.appendChild(dot);
      }
    }
  };

  dotsHandler() {
    if(this.finalOptions.dots) {
      const dotBtn = [...document.getElementsByClassName('dot')];
      const firstDot = dotBtn[0];
      
      firstDot.classList.add('active');

      const setActiveDot = () => {
        for (let i = 0; i < dotBtn.length; i++) {
          dotBtn[i].classList.remove('active');
          dotBtn[this.slideIndex].classList.add('active');
        }
      }

      if(this.finalOptions.arrows) {
        this.arrowLeft.addEventListener('click', setActiveDot);
        this.arrowRight.addEventListener('click', setActiveDot);
      }

      dotBtn.map((dot, index) => {
        dot.addEventListener('click', () => {
          for (let i = 0; i < dotBtn.length; i++) {
            dotBtn[i].classList.remove('active');
          }
          dot.classList.add('active');

          this.typeContainer.map((cont) => {
            cont.style.transform = `translateX(${-index * this.sliderWidth}px)`;
            for(let i = 0; i < this.child.length; i++) {
              this.child[i].classList.remove('active');
              this.child[index].classList.add('active');
            }
            this.base = -index * this.sliderWidth;
          })
        })
      })
    }
  };
}

const imageSlider = new Slider('.slider-container',
  {
    arrows: true,
    dots: false,
    slideSpeed: 1000,
    infinite: true,
    arrowSelector: 'span',
    arrowPrevText: 'Prev',
  }
);
