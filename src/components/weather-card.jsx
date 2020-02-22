import React from 'react';
import s from './weather-styles.module.css';
import { Card } from 'react-bootstrap';


const WeatherCard = (props) => {

    return (
        <Card border="primary" >
            <Card.Title className={s.CardTitle}>{props.cardTitle}</Card.Title>
            <Card.Img variant="top" className={s.Image} src={props.cardImage} />
            <Card.Body className={s.CardBox}>
                <Card.Text className={s.CardText}>{props.cardText}&deg;C</Card.Text>
                <Card.Subtitle className={s.CardSubtitle}>{props.cardSubtitle}</Card.Subtitle>
            </Card.Body>
        </Card>
    )

}

export default WeatherCard;
