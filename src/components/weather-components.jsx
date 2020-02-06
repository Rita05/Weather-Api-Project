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
        
        for (let index = 0; index < length; index++) {
            let dayОfWeek = new Date();
            dayОfWeek.setDate(dayОfWeek.getDate() + index);
            let ms=dayОfWeek * 1000; 
            let resdate=new Date(ms).toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'short' });
            console.log(resdate);
            arrayDays.push(resdate);

        }
        return arrayDays;
    }

    if (temp === null) {
        getArrayTemp();
    }

    if (temp) {
        const cardElements = (temp.map((el, index) => {
            let arrayDays = getDayOfWeek(temp.length);
            return (
                <Card className={s.Card} key={index}>
                    <Card.Title className="text-center text-green">{arrayDays[index]}</Card.Title>
                    <Card.Img variant="top" className={s.Image} src={getIcon(el.icon[0])} />
                    <Card.Body className={s.CardBox}>
                        <Card.Text className="text-center">{el.tempSum}&deg;C</Card.Text>
                        <Card.Subtitle className="text-center">{"Пасмурно"} </Card.Subtitle>
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
