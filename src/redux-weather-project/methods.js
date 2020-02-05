var fetch = require('node-fetch');

const apiKey = '32d0d9b078b045e3f138c32ceaaecac7';
const CITY = 'Rostov-na-Donu';
const Days = 3;

//результирующая функция вывода погоды на 3 дня 
let get3DaysForecast = async () => {
    let resdataApi = await getDataApi();
    let avgweatherforecast = await getAvgDayForecast(resdataApi);
    return avgweatherforecast;
}
//данные от API в формате json
let getDataApi = async () => {
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
let getAvgDayForecast = async (dataApi) => {

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

        // console.log(arraytemp.get(day).icon);
        arraytemp.get(day).icon.forEach((el) => {
            res[el] = res[el] + 1 || 1;
        });
        for (let key in res) {
            console.log(res[key], key);
        }

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
        //console.log(maxIcon.substring(0,2));
        arraytemp.get(day).icon.length = 0;
        res.length = 0;
        arraytemp.get(day).icon.push(maxIcon);
        console.log(arraytemp.get(day).icon[0]);
        arraytemp.get(day).tempSum = Math.round(arraytemp.get(day).tempSum / arraytemp.get(day).count);
        // console.log(`средняя температура за день ${arraytemp.get(key).tempSum} ${key} ${icon}\n`);
    }

    return arraytemp;
}
// либо export default get3DaysForecast, но при этом import должен быть без фигурных скобок
export default get3DaysForecast;
