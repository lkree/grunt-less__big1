'use strict';

(function() {
  $(document).ready(function(){
    var laximo_wizard = new LaximoWizard();
    laximo_wizard.init();
  });
})();


(function() { //truck-car switcher
  const togglerWrapper = document.querySelector('.car-type-toggler'),
    toggler = document.querySelector('.car-type-toggler__checkbox');
  const h1Switcher = () => {
    const h1 = document.querySelector('h1'),
      h1Text = h1.textContent.split(' ');

    if (h1Text[1] === 'каталоги') {
      h1Text.splice(1,0,'грузовые');
      h1.textContent = h1Text.join(' ');
      return;
    }

    h1Text[1] === 'грузовые' ? h1Text.splice(1,1,'легковые') : h1Text.splice(1,1,'грузовые');
    h1.textContent = h1Text.join(' ');
  }

  (function() { //togglerReconstructor
    toggler.checked = false;
  })();

  h1Switcher();

  const onTogglerChange = (evt) => {
    const content = document.querySelectorAll('.tabn');
    h1Switcher();

    for (const tab of content) {
      tab.classList.toggle('hidden');
    }
  }

  togglerWrapper.addEventListener('change', onTogglerChange);
})();

const carSorter = (carMark) => {
  const carsWrapper = document.querySelector('.td-model'),
    cars = carsWrapper.querySelectorAll('li');
  carMark = carMark.toUpperCase();

  Array.from(cars)
    .map((el) => {
      if (~el.dataset.name.indexOf(carMark)) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
};

(function() { //tec-doc tabs switcher
  const hideAllCars = () => {
    const carsWrapper = document.querySelector('.td-model'),
      cars = carsWrapper.querySelectorAll('li'),
      carTabs = document.querySelectorAll('.car-chooser-list-tecdoc__point');

    Array.from(cars)
      .forEach(el => el.style.display = 'none');

    Array.from(carTabs)
      .forEach(el => el.classList.remove('active'));
  }

  const carController = (clickedElement) => {
    const carShowBtns = document.querySelectorAll('.car-chooser-list-tecdoc__point');

    hideAllCars();

    Array.from(carShowBtns)
      .forEach((el) => {
        if (el.dataset.status === '1') {
          el.dataset.status = 0;
        } else if (el.dataset.status === '0' && el === clickedElement) {
          clickedElement.dataset.status = '1';
          el.classList.toggle('active');
          carSorter(clickedElement.textContent);
        }
      });
  }

  (function() {
    document.addEventListener('click', (evt) => carController(evt.target));
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode !== 27) {
        return;
      }
      hideAllCars();
    });
  })();
})();

(function() { //link creator
  const cars = document.querySelectorAll('.model-link-div');
  const onCarClick = (evt) => {
    location.assign(evt.currentTarget.dataset.href);
  }

  Array.from(cars)
    .forEach((el) => {
      el.addEventListener('click', onCarClick);
    });

  (function() { //VIN-info shower
    const button = document.querySelector('.lx-b-lax-container--tecdoc-lax-page');

    const onButtonClick = (evt) => {
      const wrapper = document.querySelector('.tecdoc-lax-page__where-to-find-VIN-wrapper');

      wrapper.classList.toggle('hidden');
    }

    button.addEventListener('click', onButtonClick);
  })();
})();