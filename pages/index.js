import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
margin-left: auto; 
margin-right: auto;
height: 100vh;
`;

export default function Home() {
  const axios = require("axios").default;
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState([]);

  var options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/find',
    params: {
      q: city,
      cnt: '1',
      mode: 'null',
      lon: '0',
      type: 'like',
      lat: '0',
      units: 'metric'
    },
    headers: {
      'x-rapidapi-key': '1487994fbfmsh75db92088d8f8b6p1cd7c4jsn11137186efd5',
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };

  function getWeather() {
    axios.request(options).then(function (response) {
      setWeather(response?.data.list)
      console.log(weather);
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <>
      <Container>
        <input
          type="text"
          placeholder="Digite a cidade: "
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Buscar</button>
        {weather.map((wt) => (
          <div key={wt.main}>
            <h1>Cidade: {wt.name}</h1>
            <h1>Temperatura atual: {parseInt(wt?.main?.temp)}º</h1>
          </div>
        ))}
      </Container>
    </>
  )

}
