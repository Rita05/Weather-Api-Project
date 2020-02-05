import React from 'react';
import { Container } from 'react-bootstrap'
import './App.css';
import WeatherComponent from './components/weather-components.jsx';

const App=() =>{
  return (
    <Container>

      <h3 className="text-center"> Прогноз погоды в Ростове-на-Дону на 3 дня</h3>

      <WeatherComponent/>

    </Container>

  );
}
export default App;