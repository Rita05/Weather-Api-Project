import React, { useState } from 'react';
import s from './weather-styles.module.css';
import { CardDeck } from 'react-bootstrap';
import WeatherMethods from '../redux-weather-project/methods.js';
import WeatherCard from './weather-card.jsx';

const WeatherComponent = () => {

    const [temp, setTemp] = useState(null);


    const iconDescription = new Map([
        ['01', 'ясно'],
        ['02', 'малооблачно'],
        ['03', 'рассеянные облака'],
        ['04', 'облачно'],
        ['09', 'ливень'],
        ['10', 'дождь'],
        ['11', 'гроза'],
        ['13', 'снег'],
        ['50', 'туман']

    ]);


    const getArrayTemp = async () => {
        const arrayTemp = await WeatherMethods.get3DaysForecast();
        const mapTemp = Array.from(arrayTemp.values());
        setTemp(mapTemp);
        return temp;

    };

    if (temp === null) {
        getArrayTemp();
    }
    if (temp) {

        const cardElements = temp.map((el, index) => {

            let arrayDays = WeatherMethods.getDaysOfWeek(temp.length);

            return (

                <WeatherCard key={index} cardTitle={arrayDays[index]} cardImage={WeatherMethods.getIcon(el.icon[0])}
                 cardText={el.tempSum} cardSubtitle={iconDescription.get(el.icon[0])} />


            )

        });

        return (
            <div>
                <CardDeck className={s.CardContainer}>
                    {cardElements}
                </CardDeck>
            </div>
        )

    } else {
        return (<div>Loading...</div>);
    }

    

}

export default WeatherComponent;