'use strict';
/*
autoModelsGetter - собирает все названия машин со страницы; удаляет пробелы в названиях; вовзращает массив названий.
getCookie - проверяет существование cookie; принимает имя cookie;
cookieChecker - запускает getCookie, проверяет существование, имена всех куки, которые не нашла, записывает в массив и вовзращает его;
cookieCreater - создает куки; принимает имя и ссылку; вовзращает true, если всё по плану;
cookieController - сопостовляет куки и машины на странице, если хотя бы одной куки не хватает, запускает по всем машинам поиск, затем полученные данные записывает в куки, после из куки подгружает на страницу;
*/
if (hrefChecker.tecDocLinksProfileCreator()) {
  (function() {
    // function autoModelsGetter(names = false, TO = false, carImages = false) {
    //   let allNames = document.querySelectorAll('.garage-auto__item-bottom-part-top section'),
    //       allLinks = document.querySelectorAll('.TecDocLink'),
    //       allTOLinks = document.querySelectorAll('.TOLink'),
    //       allImgLinks = document.querySelectorAll('.garage-auto__item-top-part img'),
    //       autoNames = [],
    //       singleAutoName = '';
    //   for(let i=0;i<allNames.length;++i) {
    //     if (carImages) {
    //       autoNames.push(allImgLinks[i].src);
    //     }
    //      else if (names) {
    //       singleAutoName = allNames[i].textContent.replace(/\s+/g, '');
    //       autoNames.push(singleAutoName);
    //     } else {
    //       try {
    //         if (TO) {
    //           autoNames.push(allTOLinks[i].href);
    //         } else {
    //           autoNames.push(allLinks[i].href);
    //         }
    //       } catch (e) {

    //       }
    //     }
    //   }

    //   return autoNames;
    // }

    // function getCookie(name) {
    //   let matches = document.cookie.match(new RegExp(
    //     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    //   ));
    //   return matches ? decodeURIComponent(matches[1]) : undefined;
    // }

    // function cookieChecker() {
    //   let autoNames = autoModelsGetter(true),
    //       missedAutos = [];

    //   autoNames.forEach(el => {
    //     if (!(getCookie(el))) {
    //       missedAutos.push(el);
    //     }
    //   });

    //   return missedAutos;
    // }

    // function cookieCreater(carNames, carLinks, carTOLinks, carImages = false) {
    //   try {
    //     let date = new Date(1900000000000);
    //     carNames.forEach((el, index) => {
    //       document.cookie = `${el}=${carLinks[index]}${carTOLinks[index]}${carImages[index]};secure;expires=${date}`;
    //     });
    //     return true;
    //   } catch(e) {
    //     return false;
    //   }
    // }

    // (function() { //cookieController
      // let missedAutos = cookieChecker(),
      //     allAutoNames = autoModelsGetter(true);
      // if (missedAutos[0] !== undefined) {
        tecDocUrlGetter(window.cars);
        tecDocUrlGetter(window.carsTO, true, true);

        // let allAutoLinks = autoModelsGetter(false),
        //     allAutoTOLinks = autoModelsGetter(false, true),
        //     carImages = autoModelsGetter(false, false, true);
        // cookieCreater(allAutoNames, allAutoLinks, allAutoTOLinks, carImages);
      // }
        
        // allAutoNames.forEach((el, index) => {
        //   let newA = document.querySelectorAll('.TecDocLink'),
        //       newATO = document.querySelectorAll('.TOLink'),
        //       imgLinks = document.querySelectorAll('.garage-auto__item-top-part img');
        //   newA[index].target = newATO[index].target = '_blank';
        //   newA[index].href = `https://${getCookie(el).split('https://')[1]}`;
        //   newATO[index].href = `https://${getCookie(el).split('https://')[2]}`;
        //   imgLinks[index].src = `https://${getCookie(el).split('https://')[3]}`;
        // })
    // })();
    function hrefTitleSetter() {
      let settingsUrl = document.querySelectorAll('.garage-auto__item-repair'),
          removeUrl = document.querySelectorAll('.garage-auto__item-delete');

      for (let i=0;i<settingsUrl.length;++i) {
        settingsUrl[i].title = 'Изменить данные о своём автомобиле';
        removeUrl[i].title = 'Убить нещадно!';
      }

    };
    document.addEventListener('DOMContentLoaded', hrefTitleSetter);
  })();
}