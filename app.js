class Slider {
  constructor(container, userOptions) {
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
      autoplay: true,
      autoplaySpeed: 2000,
      autoplayRight: true,
    }
    this.container = document.querySelector(container);
    this.finalOptions = Object.assign(defaultOptions, userOptions);
    this.wrapper = document.createElement('div');
    this.slides = [...this.container.children];
    this.sliderWidth = this.container.offsetWidth;
    this.slideCount = this.slides.length;
    this.currentIndex = 0;
    this.sliderWidth = this.container.parentElement.offsetWidth;
    
    this.buildSlider();
    this.setSliderWidth();
    this.buildArrows();
    this.arrowsHandler();
    this.buildDots();
    this.dotsHandler();
    this.autoplay();
    
    window.addEventListener('resize', () => this.setSliderWidth());
  }
  
  buildSlider() {
    this.container.parentNode.insertBefore(this.wrapper, this.container).classList.add('slider-wrapper');
    this.wrapper.appendChild(this.container);
    this.slides[0].classList.add('active');

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.add('slide');
      this.slides[i].classList.add(`slide_${i + 1}`);
    };

    this.container.style.transition = `${this.finalOptions.slideSpeed}ms transform ease`;

    if (this.finalOptions.infinite) {
      const first = this.slides[0].cloneNode(true);
      const last = this.slides[this.slides.length - 1].cloneNode(true);

      this.container.insertBefore(first, null);
      this.container.insertBefore(last, this.slides[0]);
      this.slides = [...this.container.children];
      this.slideCount = this.slides.length;
      this.currentIndex = 1;
      this.container.style.width = `${this.sliderWidth * this.slideCount}px`;
      this.container.style.transform = `translateX(${-(this.currentIndex * this.sliderWidth)}px)`;
    }
  };

  setSliderWidth() {
    this.sliderWidth = this.wrapper.parentElement.offsetWidth;

    this.wrapper.style.width = `${this.sliderWidth}px`;
    this.container.style.width = `${this.sliderWidth * this.slideCount}px`;

    if (this.finalOptions.infinite) {
      this.container.style.transition = '';
      this.container.style.width = `${this.sliderWidth * this.slideCount}px`;
      this.container.style.transform = `translateX(${-(this.currentIndex * this.sliderWidth)}px)`;

      setTimeout(() => {
        this.container.style.transition = `${this.finalOptions.slideSpeed}ms transform ease`;
      }, 100)
    }
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
    this.rightClickArrow = () => {
      if (this.currentIndex < this.slideCount - 1 && !this.transition) {
        this.currentIndex += 1;
        this.container.style.transform = `translateX(${-(this.currentIndex * this.sliderWidth)}px)`;
        this.slides.map(element => element.classList.remove('active'));
        this.slides[this.currentIndex].classList.add('active');
        this.transition = true;
        
        setTimeout(() => {
          if (this.finalOptions.infinite) {
            if (this.currentIndex === this.slides.length - 1) {
              this.currentIndex = 1;
              this.container.style.transition = '';
              this.container.style.transform = `translateX(${-(this.currentIndex * this.sliderWidth)}px)`
              setTimeout(() => {
                this.container.style.transition = `${this.finalOptions.slideSpeed}ms transform ease`;
                this.transition = false;
              }, 100);
            } else {
              this.transition = false;
            }
          } else {
            this.transition = false;
          }
        }, this.finalOptions.slideSpeed);
      }
    }

    this.leftClickArrow = () => {
      if (this.currentIndex > 0 && !this.transition) {
        this.currentIndex--;
        this.container.style.transform = `translateX(${-(this.currentIndex * this.sliderWidth)}px)`;
        this.slides.map(element => element.classList.remove('active'));
        this.slides[this.currentIndex].classList.add('active');
        this.transition = true;
        
        setTimeout(() => {
          if (this.finalOptions.infinite) {
            if (this.currentIndex === 0) {
              this.currentIndex = this.slides.length - 2;
              this.container.style.transition = '';
              this.container.style.transform = `translateX(${-(this.currentIndex * this.sliderWidth)}px)`
              setTimeout(() => {
                this.container.style.transition = `${this.finalOptions.slideSpeed}ms transform ease`;
                this.transition = false;
              }, 100);
            } else {
              this.transition = false;
            }
          } else {
            this.transition = false;
          }
        }, this.finalOptions.slideSpeed);
      }
    }

    if (this.finalOptions.arrows) {
      this.arrowRight.addEventListener('click', () => this.rightClickArrow());
      this.arrowLeft.addEventListener('click', () => this.leftClickArrow());
    }
  };

  buildDots() {
    if (this.finalOptions.dots) {
      this.dotsAmount = this.finalOptions.infinite ? this.slideCount - 2 : this.slideCount;
      this.dotsContainer = document.createElement('ul');
      
      this.dotsContainer.classList.add('dots');
      this.wrapper.appendChild(this.dotsContainer);

      for (let i = 0; i < this.dotsAmount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        this.dotsContainer.appendChild(dot);
      }
    }
  };

  dotsHandler() {
    if (this.finalOptions.dots) {
      const dotBtn = [...this.wrapper.getElementsByClassName('dot')];

      dotBtn[0].classList.add('active');

      this.setActiveDot = () => {
        dotBtn.map(element => element.classList.remove('active'));

        if (this.finalOptions.infinite) {
          if (this.currentIndex === 0) {
            dotBtn[dotBtn.length - 1].classList.add('active');
          } else if (this.currentIndex === this.slides.length - 1) {
            dotBtn[0].classList.add('active');
          } else {
            dotBtn[this.currentIndex - 1].classList.add('active');
          }
        } else {
          dotBtn[this.currentIndex].classList.add('active');
        }
      }

      if (this.finalOptions.arrows) {
        this.arrowLeft.addEventListener('click', this.setActiveDot);
        this.arrowRight.addEventListener('click', this.setActiveDot);
      }

      dotBtn.map((dot, index) => {
        dot.addEventListener('click', () => {
          dotBtn.map(element => element.classList.remove('active'));
          dot.classList.add('active');
          this.slides.map(element => element.classList.remove('active'));
          this.slides[index + 1].classList.add('active');

          if (this.finalOptions.infinite) {
            this.currentIndex = index + 1;
          } else {
            this.currentIndex = index;
          }
          this.container.style.transform = `translateX(${-(this.currentIndex * this.sliderWidth)}px)`
        })
      })
    }
  };

  autoplay() {
    if (this.finalOptions.autoplay) {
      this.finalOptions.autoplayRight ?
        setInterval(() => {
          this.rightClickArrow();
          this.setActiveDot();
        }, this.finalOptions.autoplaySpeed)
      :
        setInterval(() =>{
          this.leftClickArrow();
          this.setActiveDot();
        }, this.finalOptions.autoplaySpeed);
    }
  };
}

const firstSlider = new Slider('.slider-container',
  {
    arrows: true,
    dots: true,
    slideSpeed: 1000,
    infinite: true,
    arrowSelector: 'span',
    arrowPrevText: 'Prev',
    autoplay: false,
  }
);

const secondSlider = new Slider('#slider',
  {
    arrows: true,
    dots: false,
    slideSpeed: 500,
    infinite: false,
    arrowPrevText: '<',
    arrowNextText: '>',
    autoplay: false,
  }
);

const thirdSlider = new Slider('.autoplay-slider',
  {
    arrows: false,
    dots: true,
    slideSpeed: 1500,
    infinite: true,
    autoplay: true,
    autoplayRight: true,
    autoplaySpeed: 1500,
  }
);
