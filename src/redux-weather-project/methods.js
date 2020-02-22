var fetch = require('node-fetch');

const apiKey = '32d0d9b078b045e3f138c32ceaaecac7';
const CITY = 'Rostov-na-Donu';
const Days = 3;

class WeatherMethods {

    //результирующая функция вывода погоды на 3 дня 
    async get3DaysForecast () {
        let resdataApi = await new WeatherMethods().getDataApi();
        let avgweatherforecast = await new WeatherMethods().getAvgDayForecast(resdataApi);
        return avgweatherforecast;
    }
    //данные от API в формате json
    async getDataApi () {
        try {
            let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${CITY},ru&appid=${apiKey}`)
            let result = await response.json()
            return result
        }
        catch (exception) {
            Error(`Error in response from Api , ${exception.message}`)
        }
    };
    // средняя температура за текущий день
    async getAvgDayForecast (dataApi){

        let arraytemp = new Map();

        for (let i = 0; i < Days; i++) {

            let date = new Date(); //текущий день месяца текущей даты
            date.setDate(date.getDate() + i); // получим день от даты
            arraytemp.set(date.getDate(), { tempSum: 0, count: 0, icon: [] });
        }
        let i = 0;

        while (i <= Days) {

            for (let day of dataApi.list) {
                let datelist = new Date(day.dt_txt).getDate() // дата для текущей строки

                if (arraytemp.has(datelist)) {
                    arraytemp.get(datelist).tempSum += (day.main.temp - 273.15);
                    ++arraytemp.get(datelist).count;
                    arraytemp.get(datelist).icon.push(day.weather[0].icon.substring(0, 2));

                }
                ++i
            }

        }
        for (let day of arraytemp.keys()) {

            let res = {};
            let maxCount = -1;
            let maxIcon = '0';

            arraytemp.get(day).icon.forEach((el) => {
                res[el] = res[el] + 1 || 1;
            });

            for (let key in res) {
                if (res[key] >= maxCount) {
                    if (Number.parseInt(key, 10) > Number.parseInt(maxIcon, 10)) {
                        maxCount = res[key];
                        maxIcon = key;
                    } else {
                        maxCount = res[key];
                        maxIcon = key;
                    }

                }

            }
            arraytemp.get(day).icon.length = 0;
            res.length = 0;
            arraytemp.get(day).icon.push(maxIcon);
            arraytemp.get(day).tempSum = Math.round(arraytemp.get(day).tempSum / arraytemp.get(day).count);
        }

        return arraytemp;
    }

    getIcon = (code) => {
        let path = "../images/" + code + ".png";
        return path;
    }

    getDaysOfWeek = (length) => {
        let arrayDays = [];

        for (let index = 0; index < length; index++) {
            let dayОfWeek = new Date();
            dayОfWeek.setDate(dayОfWeek.getDate() + index);
            arrayDays.push(dayОfWeek.toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'short' }));

        }
        return arrayDays;
    }

}


export default new WeatherMethods();