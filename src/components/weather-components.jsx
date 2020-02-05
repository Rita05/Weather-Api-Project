import React, { useState } from 'react';
import s from './weather-styles.module.css';
import get3DaysForecast from '../redux-weather-project/methods.js';
import { Card, CardDeck } from 'react-bootstrap';

const WeatherComponent = () => {
    const [temp, setTemp] = useState(null); 

    const getArrayTemp = async () => {
        const arrayTemp = await get3DaysForecast();
        const mapTemp = Array.from(arrayTemp.values());
        setTemp(mapTemp);
        console.log(JSON.stringify(temp));
        return temp;

    };

    const getIcon = (code) => {
    }

    const getDayOfWeek = (index) => {
        let dayОfWeek = new Date();
        dayОfWeek.setDate(dayofweek.getDate() + index).toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'short' });
        return dayОfWeek;
    }

    if (temp === null) {
        getArrayTemp();
    }

    if (temp) {
        const cardElements = (temp.map((el, index) => {
            return (
                <Card className={s.Card} key={index}>
                    <Card.Img variant="top" src="#" />
                    <Card.Body className={s.CardBox}>
                        <Card.Title>{el.icon[0]}</Card.Title>
                        <Card.Text>{el.tempSum}&deg;C</Card.Text>
                    </Card.Body>
                </Card>
            )

        }))

        return (
            <div>
                <CardDeck className={s.CardContainer}>
                    {cardElements}
                </CardDeck>
            </div>
        )

    } else {
        return (<div>Loading...</div>)
    }


}

export default WeatherComponent;
//TODO:почитать про Mount и бесконечный цикл
//TODO:посмотреть путь в иконкам, скачать в папку images,а затем в виде массива вывести внутрь card, день недели и месяц


