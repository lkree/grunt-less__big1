'use strict';

class DevCompany {
  
  constructor(firstLink, secondLink, args, method = 'GET', json = undefined, headers = undefined) {
    this.firstLink = firstLink;
    this.secondLink = secondLink;
    this.args = args;
    this.method = method;
    this.json = json;
    this.headers = headers;
  }

  inner(usersCity) {
    this.usersCity = usersCity;

    this.getRemoteData(this.firstLink);
  }

  errorsResponseHandler(response) {
    try {
      response = JSON.parse(response);
      return response;
    } catch(e) {
      let args = this.args.slice();
      args[1] = this.usersCity;
      args[2] = 'Нет соединения с сервером'

      this.renderTD(...args);
      return false;
    }
  }

  getRemoteData(link, args = undefined, method = 'GET', json = undefined, headers = undefined) { //getDeliveryDate
    try {
      let onLoadend = (evt) => {
        window.document.body.style.cursor = 'default';

        if (!this.errorsResponseHandler(xhr.responseText)) {
          return;
        }

        let response = this.errorsResponseHandler(xhr.responseText),
            confirmBtn = document.querySelector('.searchCityBtn');
        
        if (args === undefined) {
          this.additionalLinkGetter(response, this.usersCity);
          return;
        }
        
        args = this.finalResponseGenerator(response, args);
        
        this.renderTD(...args);
        this.usersCity = '';
        confirmBtn.removeAttribute('disabled');
      }

      let onLoadStart = (evt) => {
        window.document.body.style.cursor = 'wait';

        let confirmBtn = document.querySelector('.searchCityBtn');

        confirmBtn.setAttribute('disabled', '');
      }

      

      let xhr = new XMLHttpRequest;
      xhr.addEventListener('loadstart', onLoadStart)
      xhr.addEventListener('loadend', onLoadend);
      xhr.open(method, link, true);

      if (headers !== undefined) {
        xhr.setRequestHeader(headers[0], headers[1]);
      }

      if (json !== undefined) {
        xhr.send(json);
      } else {
        xhr.send();
      }
    } catch(e) {
    console.log(e.message);
    }
  }

  renderTD(type, city, deliveryTerms, daysToSend, timeToReserve, notes) {
    let tr = document.createElement('tr'),
        tbody = document.querySelector('.deliveryTable tbody');

    for (let i=0;i<3;++i) {
      if (i === 1) {
        continue;
      }

      let td = document.createElement('td');
      td.textContent = arguments[i];
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  searchCityInJSON(data, usersCity) {
    return data;
  }

  additionalLinkGetter(data, usersCity) {
    let args = this.args.slice(),
        link,
        cityArr = [],
        json;

    json = this.json;

    cityArr = this.searchCityInJSON(data, usersCity);
    cityArr = this.mostRelativeCityDesider(cityArr);

    if (cityArr === undefined) {
      args[1] = usersCity;
      this.getRemoteData(this.secondLink, args, this.method, this.json, this.headers);
      return;
    }
    
    link = this.secondLink.replace('????', cityArr[2]);
    args[1] = cityArr[0];

    if (json !== undefined) {
      json = json.replace('????', cityArr[2]);
    }
    
    this.getRemoteData(link, args, this.method, json, this.headers);
  }

  finalResponseGenerator(response, args) {
    try {
      args[2] = `от ${response.periods_days} дней(дня)`;
      return this.argsController(args);
    } catch(e) {
      return this.argsController(args);
    }
  }

  russianLetterReplacer(word) {
    return word.replace('ё', 'е');
  }

  argsController(args) {
    if (!args[1] || args[1] == 'undefined') {
      args[1] = 'Город не найден';
    }
    if (!args[2] || args[2] == 'undefined' || args[2] == 'от undefined дней(дня)' || args[2] == 'undefined - undefined' || args[2] == 'от undefined дней' || args[2] == 'от undefined до undefined дней') {
      args[2] = 'Невозможно сосчитать сроки';
    }
    return args;
  }

  mostRelativeCityDesider(cityArr) {
    if (cityArr[0] == undefined) { //непонятно зачем был ситиАрр[1] (cityArr[1] == undefined || cityArr[0] == undefined)
      return cityArr[0];
    } 

    let arrIndex = [];
    
    cityArr.forEach(el => {
      let str = el[0].length >= el[1].length ? el[0] : el[1],
          substr = el[0].length <= el[1].length ? el[0] : el[1],
          j = 0;

      j = str.length - substr.length;
      arrIndex.push(j);
    });

    return cityArr[arrIndex.indexOf(Math.min.apply(null, arrIndex))];
  }
};

window.pek = new DevCompany('https://cors-anywhere.herokuapp.com/http://www.pecom.ru/ru/calc/towns.php', `https://cors-anywhere.herokuapp.com/https://calc.pecom.ru/bitrix/components/pecom/calc/ajax.php?places[0][]=1&places[0][]=1&places[0][]=1&places[0][]=1&places[0][]=1&places[0][]=1&places[0][]=1&take[town]=-483&deliver[town]=????`, ['ПЭК', , , 'Пн, Вт, Ср, Чт, Пт', 'До 10:00 дня отправки', 'Отправка товаров на доставку ежедневно, кроме субботы и воскресенья, в 12:00']);

pek.searchCityInJSON = function(data, usersCity) {
  let cityArr = [];

  usersCity = usersCity.toLowerCase();
  usersCity = this.russianLetterReplacer(usersCity);

  for (let city in data) {
    for (let subcity in data[city]) {
      let searchCity = data[city][subcity].toLowerCase();
      searchCity = this.russianLetterReplacer(searchCity);
      if (~searchCity.indexOf(usersCity)) {
        cityArr.push([data[city][subcity], usersCity, subcity]);
      }
    }
  }

  return cityArr;
}
pek.finalResponseGenerator = function(response, args) {
  try {
    args[2] = response.periods_days == 1 ? `от ${response.periods_days} дня` : `от ${response.periods_days} дней`
    return this.argsController(args);
  } catch(e) {
    return this.argsController(args);
  }
}

window.kit = new DevCompany('https://capi.gtdel.com/1.0/tdd/city/get-list?token=Xcks5XZW4esL9us7s0fkIKNIF_tDQfQE', 'https://cors-anywhere.herokuapp.com/https://capi.gtdel.com/1.0/order/calculate?token=Xcks5XZW4esL9us7s0fkIKNIF_tDQfQE', ['КИТ', , , 'Пн, Вт, Ср, Чт, Пт', 'До 22:00 дня, предыдущего отправке', 'Отправка товаров на доставку каждую среду в 08:00'], 'POST', '{"city_pickup_code":"760000100000","city_delivery_code":"????","declared_price":"1","places":[{"count_place":"1","height":"1","width":"1","length":"1","weight":"1"}]}', ['content-type', 'application/json']);

kit.searchCityInJSON = function(data, usersCity) {
  let cityArr = [];

  usersCity = usersCity.toLowerCase();
  usersCity = this.russianLetterReplacer(usersCity);

  data.forEach((el) => {
    let searchCity = el.name.toLowerCase();
    searchCity = this.russianLetterReplacer(searchCity);

    if (~searchCity.indexOf(usersCity)) {
      cityArr.push([searchCity, usersCity, el.code]);
    }
  })

  return cityArr;
}
kit.finalResponseGenerator = function(response, args) {
  try {
    args[2] = response[0].standart.time == 1 ? `от ${response[0].standart.time} дня` : `от ${response[0].standart.time} дней`;
    return this.argsController(args);
  } catch(e) {
    return this.argsController(args);
  }
}

window.dellin = new DevCompany('/scripts/delivery/dellinCities.json', 'https://cors-anywhere.herokuapp.com/https://api.dellin.ru/v1/public/calculator.json', ['Деловые линии', , , 'Пн, Вт, Ср, Чт, Пт', 'До 10:00 дня отправки', 'Отправка товаров на доставку ежедневно, кроме субботы и воскресенья, в 12:00'], 'POST', '{"appkey":"0FB5AE86-A71B-401D-A8CA-A922396510FB","derivalPoint":"7600000100000000000000000","arrivalPoint":"????","sizedVolume":1,"sizedWeight":1}', ['content-type', 'application/json']);

dellin.searchCityInJSON = function(data, usersCity) {
  let cityArr = [];

  usersCity = usersCity.toLowerCase();
  usersCity = this.russianLetterReplacer(usersCity);

  data.forEach((el) => {
    let searchCity = el.name.toLowerCase();
    searchCity = this.russianLetterReplacer(searchCity);
    
    if (~searchCity.indexOf(usersCity)) {
      cityArr.push([el.name, usersCity, el.codeKLADR]);
    }
  })

  return cityArr;
}
dellin.finalResponseGenerator = function(response, args) {
  try {
    args[2] = `${response.time.nominative}`;
    return this.argsController(args);
  } catch(e) {
    return this.argsController(args);
  }
}

window.cdek = new DevCompany('https://integration.cdek.ru/pvzlist/v1/json', 'https://cors-anywhere.herokuapp.com/https://api.cdek.ru/calculator/calculate_price_by_json.php', ['СДЭК', , , 'Пн, Вт, Ср, Чт, Пт', 'До 18:00 дня отправки', 'Отправка товаров на доставку ежедневно, кроме субботы и воскресенья, в 12:00'], 'POST', '{"version":"1.0","senderCityId":"146","receiverCityId":"????","tariffId":"11","goods":[{"weight":"10","length":"10","width":"10","height":"10","volume":"10"}]}', ['content-type', 'application/json']);

cdek.searchCityInJSON = function(data, usersCity) {
  let cityArr = [];

  data = data['pvz'];
  usersCity = usersCity.toLowerCase();
  usersCity = this.russianLetterReplacer(usersCity);

  data.forEach((el) => {
    let destinationCity = el.city.toLowerCase();
    destinationCity = this.russianLetterReplacer(destinationCity);

    if (~destinationCity.indexOf(usersCity)) {
      cityArr.push([el.city, usersCity, el.cityCode]);
    }
  })

  return cityArr;
}
cdek.finalResponseGenerator = function(response, args) {
  try {
    args[2] = `от ${response.result.deliveryPeriodMin} до ${response.result.deliveryPeriodMax} дней`;
    return this.argsController(args);
  } catch (e) {
    return this.argsController(args);
  }
}

window.zhelDor = new DevCompany('https://api.jde.ru/vD/geo/search?mode=2', 'https://api.jde.ru/vD/calculator/price?from=1125899906842664&to=????&weight=1&width=1&volume=1&type=1&user=2252177785513264&token=59240836222196913', ['Желдор экспедиция', , , 'Пн, Вт, Ср, Чт, Пт', 'До 10:00 дня отправки', 'Отправка товаров на доставку ежедневно, кроме субботы и воскресенья, в 12:00'])

zhelDor.searchCityInJSON = function(data, usersCity) {
  let cityArr = [];

  usersCity = usersCity.toLowerCase();
  usersCity = this.russianLetterReplacer(usersCity);

  for (let city of data) {
    let destinationCity = city.title.toLowerCase();
    destinationCity = this.russianLetterReplacer(destinationCity);

    if (~destinationCity.indexOf(usersCity)) {
      cityArr.push([city.city, usersCity, city.code]);
    }
  }

  return cityArr;
}
zhelDor.finalResponseGenerator = function(response, args) {
  try {
    args[2] = `от ${response.mindays} до ${response.maxdays} дней`;
    return this.argsController(args);
  } catch(e) {
    return this.argsController(args);
  }
}


    // if (data instanceof Array) {
    //   data.forEach((el) => {
    //     let searchCity = el.name.toLowerCase();
    //     if (~searchCity.indexOf(usersCity)) {
    //       cityArr.push([searchCity, usersCity, el.code]);
    //     }
    //   })
    // } else {
    //   for (city in data) {
    //     for (subcity in data[city]) {
    //       let searchCity = data[city][subcity].toLowerCase();
    //       if (~searchCity.indexOf(usersCity)) {
    //         cityArr.push([data[city][subcity], usersCity, subcity]);
    //       }
    //     }
    //   }
    // }