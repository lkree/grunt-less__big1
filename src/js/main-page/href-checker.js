'use strict';

//Объект для хранения чеков соответствия URL
window.hrefChecker = {
  //Проверка на соответствие ссылки заданным параметрам
  laximoBreadcrumbs: function() {
      if (href[3] === 'original-catalog') {
          if (
              href[4].slice(0, 5) === 'isuzu' ||
              href[4].slice(0, 3) === 'kia' ||
              href[4].slice(0, 8) === 'mercedes' ||
              href[4].slice(0, 3) === 'daf' ||
              href[4].slice(0, 3) === 'man' ||
              href[4].slice(0, 5) === 'volvo' ||
              href[4].slice(0, 7) === 'hyundai' ||
              href[4].slice(0, 5) === 'iveco' ||
              href[4].slice(0, 7) === 'renault' ||
              href[4].slice(0, 6) === 'scania' &&
              href[5] === undefined
      ) {
              return true;
          }
      }
      if (
          href[3] === 'original-catalog' && 
          href[4].slice(0,9) === 'car-parts' 
          && href[5] === undefined
      ) {
          return true;
      } else if (
          href[3] === 'original-catalog' && 
          href[4].slice(0, 11) === 'truck-parts' && 
          href[5] === undefined
      ) {
          return true;
      }

      return false;
  },

  laximoScrolling: function() {
      if (
          href[3] === 'original-catalog' && 
          href[4].slice(0,9) === 'car-parts' 
          && href[5] === undefined
      ) {
          return true;
      } else if (
          href[3] === 'original-catalog' && 
          href[4].slice(0, 11) === 'truck-parts' && 
          href[5] === undefined
      ) {
          return true;
      }

      return false;
  },

  mainPage: function() {
      return window.location.href === 'https://big1.ru/';
  },
  laximoMainPage: function() {
      return href[3].slice(0,6) === 'laximo' && href[4] === undefined;
  },
  tecdcocBreadCrumbs: function() {
      if (href[3] === 'car_base' && href[4] !== undefined)
          if (href[4].slice(0,11) === 'truck-parts') {
              return true;
          } else if (href[4].slice(0,9) === 'car-parts') {
              return true;
          }
      return false;
  },
  autoChooser: function() {
      if (href[3] === 'fast-auto-chooser' && href[4] !== undefined) {
          if (href[4].slice(0,5) === 'truck' || href[4].slice(0,3) === 'car') {
              return true;
          }
      }
      return false;
  },
  bigService: function() {
      return href[3].slice(0,15) === 'vin_query_parts';
  },
  tecDocLinksProfileCreator: function() {
      return href[3].slice(0, 5) === 'autos' && href[4] === undefined;
  },
  vinAutoInfoGetter: function() {
    return href[3].slice(0, 9) === 'any_autos';
  },
  laximoCatalogs: function() {
      const getParams = new URL(document.location).searchParams;
      return href[3] === 'laximo' && href[4] !== undefined && href[5] !== undefined && href[6] !== undefined && getParams.get('vin') !== null;
  },
  registrationForm: function() {
      return href[3].slice(0,9) === 'customers' && href[4] === undefined;
  }
};