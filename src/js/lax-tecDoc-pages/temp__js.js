'use strict';
// // (function() { //mini-slider
//
// const sliderController = {
//   getLastStatus: function() {
//     const currentResolution = window.innerWidth;
//
//     switch(true) {
//       case (currentResolution >= 1000):
//         return -50;
//         break;
//       case (currentResolution >= 800):
//         return -60;
//         break;
//       case (currentResolution >= 600):
//         return - 70;
//         break;
//       case (currentResolution >= 450):
//         return -80;
//         break;
//       default:
//         return -90;
//         break;
//     }
//   },
//   btnsController: function(currentStatus, prevBtn, nextBtn, maxStatus, minStatus = 0) {
//     switch(currentStatus) {
//       case minStatus:
//         prevBtn.addClass('b-yel-cat__slider-btn--deactive');
//         prevBtn.attr('disabled', '');
//         break;
//       case minStatus-10:
//         prevBtn.removeClass('b-yel-cat__slider-btn--deactive');
//         prevBtn.removeAttr('disabled');
//         break;
//       case maxStatus+10:
//         nextBtn.removeClass('b-yel-cat__slider-btn--deactive');
//         nextBtn.removeAttr('disabled');
//         break;
//       case maxStatus:
//         nextBtn.addClass('b-yel-cat__slider-btn--deactive');
//         nextBtn.attr('disabled', '');
//         break;
//       default:
//         break;
//     }
//   },
//   sliderMover: function(status, slider) {
//     slider.css('transform', `translateX(${status}%)`);
//   },
//   statusChanger: function(status, operation = 'prev') {
//     return operation === 'next' ? status -= 10 : status += 10;
//   }
// };
//
// (function() {
//   const nextBtn = $('.b-yel-cat__slider-btn--next'),
//     prevBtn = $('.b-yel-cat__slider-btn--prev'),
//     maxStatus = sliderController.getLastStatus(),
//     minStatus = 0,
//     slider = $('.b-yel-cat-list');
//
//   let currentStatus = 0;
//   sliderController.btnsController(currentStatus, prevBtn, nextBtn, maxStatus, minStatus);
//
//   nextBtn.on('click', (evt) => {
//     currentStatus = sliderController.statusChanger(currentStatus, 'next');
//     sliderController.sliderMover(currentStatus, slider);
//     sliderController.btnsController(currentStatus, prevBtn, nextBtn, maxStatus, minStatus);
//   });
//   prevBtn.on('click', (evt) => {
//     currentStatus = sliderController.statusChanger(currentStatus, 'prev');
//     sliderController.sliderMover(currentStatus, slider);
//     sliderController.btnsController(currentStatus, prevBtn, nextBtn, maxStatus, minStatus);
//   });
// })();

/*
 // 'use strict';
 // (function() { //mini-slider
 const sliderController = {

 }
 const getLastStatus = () => {
 const currentResolution = window.innerWidth;

 switch(true) {
 case (currentResolution >= 1000):
 return -50;
 break;
 case (currentResolution >= 800):
 return -60;
 break;
 case (currentResolution >= 600):
 return - 70;
 break;
 case (currentResolution >= 450):
 return -80;
 break;
 default:
 return -90;
 break;
 }
 }

 const nextBtn = $('.b-yel-cat__slider-btn--next'),
 prevBtn = $('.b-yel-cat__slider-btn--prev'),
 maxSliderStatus = getLastStatus(),
 slider = $('.b-yel-cat-list');
 let sliderStatus = 0;

 const sliderBtnsController = (sliderStatus, prevBtn, nextBtn) => {
 switch(sliderStatus) {
 case 0:
 prevBtn.addClass('b-yel-cat__slider-btn--deactive');
 prevBtn.attr('disabled', '');
 break;
 case -10:
 prevBtn.removeClass('b-yel-cat__slider-btn--deactive');
 prevBtn.removeAttr('disabled');
 break;
 case maxSliderStatus+10:
 nextBtn.removeClass('b-yel-cat__slider-btn--deactive');
 nextBtn.removeAttr('disabled');
 break;
 case maxSliderStatus:
 nextBtn.addClass('b-yel-cat__slider-btn--deactive');
 nextBtn.attr('disabled', '');
 break;
 default:
 break;
 }
 }

 sliderBtnsController(sliderStatus, prevBtn, nextBtn);

 const sliderMover = (status, slider, operation = 'prev') => {
 operation === 'next' ? status -= 10 : status += 10;

 slider.css('transform', `translateX(${status}%)`);
 return status;
 }

 nextBtn.on('click', (evt) => {
 sliderStatus = sliderMover(sliderStatus, slider, 'next');
 sliderBtnsController(sliderStatus, prevBtn, nextBtn);
 });
 prevBtn.on('click', (evt) => {
 sliderStatus = sliderMover(sliderStatus, slider, 'prev');
 sliderBtnsController(sliderStatus, prevBtn, nextBtn);
 })
 */


/**
 * controls a slider with translateX, has variate work with resolutions
 * breakpoints at 1000+ / 800+ / 600+ / 450+ / > 450
 * works with jquery (3.4.1 current)
 * @constructor {HTML element} prevBtn, {HTML element} nextBtn, {HTML element} slider, {integer} minStatus
 */
class sliderController {
  constructor(prevBtn, nextBtn, slider, minStatus) {
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.slider = slider;
    this.maxStatus = this.getMaxStatus();
    this.minStatus = minStatus;
    this.currentStatus = this.minStatus;
  }
  init() {
    this.btnsController();
  }
  setMaxStatus() {
    return this.maxStatus = this.getMaxStatus();
  }
  getMaxStatus() {
    const currentResolution = window.innerWidth;

    switch(true) {
      case (currentResolution > 1000):
        return -50;
      case (currentResolution > 800):
        return -60;
      case (currentResolution > 600):
        return -70;
      case (currentResolution > 450):
        return -80;
      default:
        return -90;
    }
  }
  btnSwitcher(button, operationType) {
    if (operationType === 'on') {
      button.removeClass('b-yel-cat__slider-btn--deactive');
      button.removeAttr('disabled');
      return;
    }

    button.addClass('b-yel-cat__slider-btn--deactive');
    button.attr('disabled', '');
  }
  btnsController() {
    this.btnSwitcher(this.prevBtn, 'on');
    this.btnSwitcher(this.nextBtn, 'on');

    switch(this.currentStatus) {
      case this.minStatus:
        this.btnSwitcher(this.prevBtn, 'off');
        break;
      case this.maxStatus:
        this.btnSwitcher(this.nextBtn, 'off');
        break;
      default:
        break;
    }
  }
  sliderMove() {
    this.slider.css('transform', `translateX(${this.currentStatus}%)`);
  }
  statusChange(operation = 'prev') {
    return operation === 'next' ? this.currentStatus -= 10 : this.currentStatus += 10;
  }
};

(function() {
  let truckSlider;

  $('.b-yel-cat__slider-btn--next').on('click', (evt) => {
    truckSlider.statusChange('next');
    truckSlider.sliderMove();
    truckSlider.btnsController();
  });
  $('.b-yel-cat__slider-btn--prev').on('click', (evt) => {
    truckSlider.statusChange('prev');
    truckSlider.sliderMove();
    truckSlider.btnsController();
  });
  $(window).on('resize', (evt) => {
    truckSlider.setMaxStatus();
  });
  $(document).on('DOMContentLoaded', (evt) => {
    truckSlider = new sliderController($('.b-yel-cat__slider-btn--prev'), $('.b-yel-cat__slider-btn--next'), $('.b-yel-cat-list'), 0);
    truckSlider.init();
  });
})();






