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
        let path = "../images/" + code + ".png";
        return path;
    }
    const getDayOfWeek = (length) => {
        let arrayDays = [];

        for (let index = 0; index< length; index++) {
            let dayОfWeek = new Date();
            dayОfWeek.setDate(dayОfWeek.getDate() + index); 
            console.log(dayОfWeek);
            arrayDays.push(dayОfWeek.toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'short'}));

        }
        return arrayDays;
    }

    if (temp === null) {
        getArrayTemp();
    }

    if (temp) {
        const cardElements = (temp.map((el, index) => {
            let arrayDays = getDayOfWeek(temp.length);
            console.log(arrayDays);
            return (
                <Card className="border-primary Card" key={index}>
                    <Card.Title className={s.CardTitle}>{arrayDays[index]}</Card.Title>
                    <Card.Img variant="top" className={s.Image} src={getIcon(el.icon[0])} />
                    <Card.Body className={s.CardBox}>
                        <Card.Text className={s.CardText}>{el.tempSum}&deg;C</Card.Text>
                        <Card.Subtitle className={s.CardSubtitle}>{"Пасмурно"} </Card.Subtitle>
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
