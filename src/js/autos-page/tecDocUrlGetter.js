'use strict';
/*
Находим все вины на странице;
Каждый вин отправляем через ajax на страницу лаксимо и получаем необходимые данные (Производителя, модель, год);
Безымянная функция очищает таблицу от старых ссылок (временное решение);
reg - очищает от мусора (слэши, скобки, подчеркивания, палочки и прочее) вовзращает слово без мусора;
carNameCleaner - очищает модель авто от марки, т.е. Audi a6 Avant - a6 Avant (принимает модель, бренд; вовзращает модель; создаёт регулярку из бренда и вырезает бренд) (вызывает вшитым колбеком reg);
arrSlicerHelper - превращает модель в отсортированный массив символов; (принимает модель, бренд; возвращает массив) вызывает вшитым колбеком carNameCleaner;
modelArrSorter - сортирует массив; превращает массив симвоболов модели в ассоциативный массив (массив массивов); используется для более удобного сравнивания вхождений модели Лаксимо в модель Текдока; принимает массив с моделью (обработанный при помощи arrSlicerHelper); возвращает ассоциативный массив;
compareModels - сравнивает вхождение одной модели в другую; принимает (модель, которую ищем), (модель в которой ищем), (бренд); вызывает вшитым колбеком arrSlicer; возвращает true false;
compareModelsHelperToString - принимает строку, превращает в массив удобный для поиска вхождения другой модели; вовзращает массив;
mostRelativeCarDesider - примает массив состоящие из 0 - строка(модель ТекДок) 1 - строка(модель Лаксимо) 2 - ссылка на ТекДок 3 - картинка(не всегда); выбирает строку и подстроку(сортирует по длине); определяет разницу в количестве символов между строкой и подстрокой; берёт массив, в котором разница минимальна и возвразащает его; Далее происходит поиск с применением всех вышеописанных функций;
Ищем по объекту cars, который имеет следующую структуру cars -> brand -> link | models -> links
После создаём ссылки на каталог ТекДок (если нашли модель, то на неё, если только марку, то на неё, а если ничего, то на сам ТекДок);
createAndLocateLink - создает ссылку и размещает её на сайте; использует через замыкание полученую с цикла ссылку; принимает один аргумент (true / false); true - пытается использовать ссылку полученную с замыкания, false - использует стандартную ссылку на ТекДок;

Не работает без объекта cars (объект cars находится в файле cars).
*/
window.tecDocUrlGetter = function(cars, dateSearchOff = false, TO = false) {
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

  let vinsWrapper = document.querySelectorAll('.VIN'),
      vins = [];

  for (let i=0;i<vinsWrapper.length;++i) {
    vins.push(escapeHtml(vinsWrapper[i].textContent.slice(5)));
  }
  

  vins.forEach((el, index) => {
    let brands = document.querySelectorAll('.brand'),
        models = document.querySelectorAll('.model'),
        releaseDates = document.querySelectorAll('.year');

    function carNameCleaner(model, brand) {
      model = reg(model);
      let regModel = brand.toLocaleLowerCase().split('').join(',');
      regModel = new RegExp(`[${regModel}]{${brand.length}}`, 'i');
      model = model.replace(regModel, '').trim();
  
      return model;
    };

    function reg(expression) {
      return expression.replace(/[!@#$%^*()+=.,;:№?{}\[\]`~&<>"'/ _-]/g, '');
    };

    let brand = escapeHtml(brands[index].textContent.slice(7)),
        model = escapeHtml(models[index].textContent.slice(8)),
        releaseDate = escapeHtml(releaseDates[index].textContent.slice(5));

    function createAndLocateLink(status, TO) {
      let linksWrapper = document.querySelectorAll('.garage-auto__item-bottom-part-bot'),
          imgs = document.querySelectorAll('.garage-auto__item-top-part img'),
          newA = document.createElement('a'),
          newATO = document.createElement('a');

      newA.target = newATO.target = '_blank';
      newATO.textContent = 'Каталог ТО';
      newA.textContent = 'Каталог неоригинальных запчастей';

      if (mostRelativeCarDesider(successCars) !== undefined) {
        let n = mostRelativeCarDesider(successCars);

        if (n.length === 5) {
          mainlink = n[2];
          mainImgLink = n[3];
        }

        if (n.length === 4) {
          mainlink = n[2];
        }
      }

      if (status) {
        if (!TO) {
          mainImgLink === '' ?
          imgLink === '' ? 
          imgLink = '/images/design/logoForAdm.png' : undefined : undefined;

          imgs[index].src = mainImgLink === '' ? imgLink : mainImgLink;
        }
        if (mainlink === '') {
          if (link === '') {
            if (TO) {
              newATO.href = '/catalog/to.html';
            } else {
              newA.href = '/car_base.html';
            }
          } else {
            newA.href = newATO.href = link;
          }
        } else {
          newA.href = newATO.href = mainlink;
        }
      } else {
        newATO.href = '/catalog/to.html'; 
        newA.href = '/car_base.html';
      }

      if (TO) {
        linksWrapper[index].children[2].href = newATO.href;
      } else {
        linksWrapper[index].children[1].href = newA.href;
      }

      link = mainlink = imgLink = mainImgLink = '';
      newA = newATO = null;
    };

    function arrSlicer(model, brand) {
    
      function arrSlicerHelper(model, brand) {
        model = carNameCleaner(model, brand);
        return model.toLocaleLowerCase().split('').sort();
      };
    
      model = arrSlicerHelper(model, brand);

      function modelArrSorter(model) {
        let finalArr = [];

        if(model[1] == undefined) {
          finalArr[0] = [];
          finalArr[0].push(model[0]);
          return finalArr;
        }

        model.reduce((previousValue, currentValue, ind) => {
          if (ind === 1) {
            finalArr[0] = [];
            finalArr[0].push(previousValue);
          }
          
          if (previousValue === currentValue) {
            finalArr[finalArr.length - 1].push(currentValue);
          } else {
            finalArr[finalArr.length] = [];
            finalArr[finalArr.length - 1].push(currentValue);
          }
      
          return previousValue = currentValue;
        });

        return finalArr;
      };

      return modelArrSorter(model);
    };

    function mostRelativeCarDesider(carsArr) {
      if(carsArr[1] == undefined || carsArr[0] == undefined) {
        return;
      } 

      let arrIndex = [];
      
      carsArr.forEach(car => {
        let str = car[0].length >= car[1].length ? car[0] : car[1],
            substr = car[0].length <= car[1].length ? car[0] : car[1],
            j = 0;

        substr = car.length === 4 ? carNameCleaner(substr, car[3]) : carNameCleaner(substr, car[4]);
        str = car.length === 4 ? carNameCleaner(str, car[3]) : carNameCleaner(str, car[4]);

        j = str.length - substr.length;
        arrIndex.push(j);
      });

      return carsArr[arrIndex.indexOf(Math.min.apply(null, arrIndex))];
    }
    
    function compareModels(findableModel, placeToSearchModel, brand) {
    
      function compareModelsHelperToString(string) {
        return string.toLocaleLowerCase().split('').sort().join('');
      };

      findableModel = arrSlicer(findableModel, brand);
      placeToSearchModel = compareModelsHelperToString(placeToSearchModel);
      
      return findableModel.every(el => {
        return el.every(elm => {
         let l = placeToSearchModel.length;
          placeToSearchModel = placeToSearchModel.replace(elm, '');
    
          return l > placeToSearchModel.length;
        })
      })
    };

    let link = '',
        mainlink = '',
        imgLink = '',
        mainImgLink = '',
        carsBrand,
        carsModel,
        successCars = [];

    try {
      brand = brand.toLocaleLowerCase().split('').sort().join('').trim();


      for (carsBrand in cars) {
        let indexCarName = carsBrand.toLocaleLowerCase().split('').sort().join('').trim();
        if ((indexCarName.indexOf(brand)) + 1) {
          if (releaseDate !== undefined || dateSearchOff) {
            for (carsModel in cars[carsBrand]) {
              if (
                compareModels(carsModel, model, brand) ||
                compareModels(model, carsModel, brand)
              ) {
                if (
                  cars[carsBrand][carsModel].startYear <= releaseDate &&
                  cars[carsBrand][carsModel].endYear >= releaseDate || dateSearchOff
                ) {
                  mainlink = cars[carsBrand][carsModel].link;
                  successCars[successCars.length] = [];
                  successCars[successCars.length - 1].push(carsModel);
                  successCars[successCars.length - 1].push(model);
                  successCars[successCars.length - 1].push(mainlink);
                  if (!dateSearchOff) {
                    mainImgLink = cars[carsBrand][carsModel].imgLink;
                    successCars[successCars.length - 1].push(mainImgLink);
                  }
                  successCars[successCars.length - 1].push(carsBrand);
                } else {
                  link = cars[carsBrand].link;
                  dateSearchOff === false ? imgLink = cars[carsBrand].imgLink : undefined;
                }
              } else {
                link = cars[carsBrand].link;
                dateSearchOff === false ? imgLink = cars[carsBrand].imgLink : undefined;
              }
            }
          } else {
            link = cars[carsBrand].link;
            dateSearchOff === false ? imgLink = cars[carsBrand].imgLink : undefined;
          }
        }
      }

  
      createAndLocateLink(true, TO);
    } catch(e) {
      createAndLocateLink(false, TO);
      console.log(e.message);
    }
  });
};