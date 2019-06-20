'use strict';
/*
Собираем все инпуты, инпут с 

*/

if (hrefChecker.vinAutoInfoGetter()) {
  try {
    (function() {
      function escapeHtml(text) {
        let map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        };
      
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
      }

      let inputWithBrand = document.querySelector('#any_auto_make_name'),
          inputWithModel = document.querySelector('#any_auto_model'),
          inputWithReleaseDate = document.querySelector('#any_auto_year'),
          inputWithEngine = document.querySelector('#any_auto_engine'),
          inputWithVIN = document.querySelector('#any_auto_code'),
          inputWithBody = document.querySelector('#any_auto_body'),
          a = [
            inputWithBrand,
            inputWithModel,
            inputWithReleaseDate,
            inputWithEngine,
            inputWithBody,
            inputWithVIN
          ];

      inputWithVIN.maxLength = 17;
      inputWithVIN.pattern = '[A-Za-z0-9]{17}';
      inputWithVIN.setAttribute('oninvalid', "setCustomValidity('Пожалуйста, введите 17 символов (латинские буквы + цифры)')");
      inputWithVIN.setAttribute('oninput', "setCustomValidity('')");

      inputWithModel.disabled =
      inputWithBrand.disabled = 
      inputWithReleaseDate.disabled = 
      inputWithEngine.disabled =
      inputWithBody.disabled = true;


      let newCheckButton = document.createElement('button'),
          newResetButton = document.createElement('button'),
          classes = ['btn-reg', 'any-autos-btn'];


      newCheckButton.classList.add(...classes);
      newResetButton.classList.add(...classes);
      newCheckButton.textContent = 'Искать!';
      newResetButton.textContent = 'Сброс';
      newCheckButton.id = 'checkButton';
      newResetButton.id = 'resetButton';
      document.querySelector('tbody .reg-col').insertBefore(document.createElement('td'),  document.querySelector('tbody .reg-col').children[1]);
      document.querySelector('tbody .reg-col').insertBefore(document.createElement('td'),  document.querySelector('tbody .reg-col').children[1]);
      document.querySelector('tbody .reg-col').children[1].appendChild(newCheckButton);
      document.querySelector('tbody .reg-col').children[2].appendChild(newResetButton);


      let checkButton = document.querySelector('#checkButton'),
          resetButton = document.querySelector('#resetButton');

      function onClickCheckButton(evt) {

        if (!inputWithVIN.checkValidity()) {
          return;
        }

          evt.preventDefault();

          function cursorChanger(evt) {
            document.body.style.cursor == 'wait' ?
            document.body.style.cursor = 'default' :
            document.body.style.cursor == 'wait';
          }
          function parseData(evt) {
            if (inputWithVIN.value === '') {
              inputWithVIN.placeholder = 'Введите VIN';
              return;
            }
            let parsedHtml = laximoRequest.responseText,
            htmlWrapper = document.createElement('div');

            htmlWrapper.innerHTML = parsedHtml;

            let allTrs = htmlWrapper.querySelectorAll('tr');

            for (let i=0;i<allTrs.length;++i) {
              switch (allTrs[i].children[0].textContent) {
                case 'Производитель:':
                  var brand = allTrs[i].children[1].textContent;
                  break;
                case 'Модель:':
                  var model = allTrs[i].children[1].textContent;
                  break;
                case 'Выпущено':
                  var releaseDate = allTrs[i].children[1].textContent;
                  break;
                case 'Двигатель':
                  var engine = allTrs[i].children[1].textContent;
                  break;
                case 'engine_info':
                  var engineInfo = allTrs[i].children[1].textContent;
                  break;
                case 'Дата выпуска':
                  if (releaseDate === undefined) {
                    var releaseDate = allTrs[i].children[1].textContent.slice(-4);
                  }
                  break;
                default:
                  break;
              }
            }

            inputWithBrand.value = brand;
            inputWithModel.value = model;
            inputWithReleaseDate.value = releaseDate;
            inputWithEngine.value = engine;
            inputWithBody.value = engineInfo;

            
            if (
              inputWithBrand.value === 'undefined' &&
              inputWithModel.value === 'undefined' &&
              inputWithReleaseDate.value === 'undefined' &&
              inputWithEngine.value === 'undefined' &&
              inputWithBody.value === 'undefined'
            ) {
              inputWithVIN.value = `Приносим свои извинения, ${vinCode} не найден`
            }

            if (inputWithBrand.value === 'undefined') {
              inputWithBrand.disabled = false;
              inputWithBrand.value = 'марка не найдена :('
            } else {
              inputWithBrand.disabled = true;
            }
            if (inputWithModel.value === 'undefined') {
              inputWithModel.disabled = false;
              inputWithModel.value = 'модель не найдена :('
            } else {
              inputWithModel.disabled = true;
            }
            if (inputWithReleaseDate.value === 'undefined') {
              inputWithReleaseDate.disabled = false;
              inputWithReleaseDate.value = 'год не определён :('
            } else {
              inputWithReleaseDate.disabled = true;
            }
            if (inputWithEngine.value === 'undefined') {
              inputWithEngine.disabled = false;
              inputWithEngine.value = 'двигатель не найден :('
            } else {
              inputWithEngine.disabled = true;
            }
            if (inputWithBody.value === 'undefined') {
              inputWithBody.disabled = false;
              inputWithBody.value = 'информация о двигателе не найдена :('
            } else {
              inputWithBody.disabled = true;
            }
          }

          let vinCode = inputWithVIN.value,
          laximoRequest = new XMLHttpRequest();

          laximoRequest.addEventListener('loadstart', cursorChanger);
          laximoRequest.addEventListener('loadend', cursorChanger);
          laximoRequest.addEventListener('loadend', parseData);

          vinCode = vinCode.slice(0,17);
          vinCode = escapeHtml(vinCode);

          laximoRequest.open('GET', `https://big1.ru/laximo/vehicle_by_vin_frame?vin=${vinCode}`, true);
          laximoRequest.send();
        }

      checkButton.addEventListener('click', onClickCheckButton);



      let confirmButton = document.querySelector('table .reg-col').children[3].children[0];


      function deleteDisabled(evt) {
        for (let input of a) {
          input.disabled = false;
          input.value = escapeHtml(input.value);

          if (
            input.value === 'марка не найдена :(' ||
            input.value === 'модель не найдена :(' ||
            input.value === 'год не определён :(' ||
            input.value === 'двигатель не найден :(' ||
            input.value === 'информация о двигателе не найдена :('
          ) {
            input.value = '';
          }
        }
      }
      confirmButton.addEventListener('click', deleteDisabled);

      function resetInputs(evt) {
        evt.preventDefault();

        for(input of a) {
          input.disabled = false;
        }
      };

      resetButton.addEventListener('click', resetInputs);


    })();
  } catch(e) {
    console.log(e.message)
  }
}