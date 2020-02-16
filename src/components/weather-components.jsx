import React, { useState } from 'react';
import s from './weather-styles.module.css';
import get3DaysForecast from '../redux-weather-project/methods.js';
import { Card, CardDeck } from 'react-bootstrap';

const WeatherComponent = () => {

    const [temp, setTemp] = useState(null);

    // TODO: в отдельный файл 
    const iconDescription=new Map([
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
        const arrayTemp = await get3DaysForecast();
        const mapTemp = Array.from(arrayTemp.values());
        setTemp(mapTemp);
        return temp;

    };

    // TODO: в отдельный файл 
    const getIcon = (code) => {
        let path = "../images/" + code + ".png";
        return path;
    }

    // TODO: naming, отдельный файл 
    const getDaysOfWeek = (length) => {
        let arrayDays = [];

        for (let index = 0; index < length; index++) {
            let dayОfWeek = new Date();
            dayОfWeek.setDate(dayОfWeek.getDate() + index);
            arrayDays.push(dayОfWeek.toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'short' }));

        }
        return arrayDays;
    }

    if (temp === null) {
        getArrayTemp();
    }

    if (temp) {

        const cardElements = (temp.map((el, index) => {
            
            let arrayDays = getDaysOfWeek(temp.length);
            
            // TODO: вынести в отдельную компоненту
               
                
                return (
                    <Card border="primary" key={index}>
                        <Card.Title className={s.CardTitle}>{arrayDays[index]}</Card.Title>
                        <Card.Img variant="top" className={s.Image} src={getIcon(el.icon[0])} />
                        <Card.Body className={s.CardBox}>
                            <Card.Text className={s.CardText}>{el.tempSum}&deg;C</Card.Text>
                            <Card.Subtitle className={s.CardSubtitle} >{iconDescription.get(el.icon[0])}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                )
            // todo end;

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
