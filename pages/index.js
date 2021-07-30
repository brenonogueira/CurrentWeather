import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
 display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
align-content: center; 
margin-left: auto; 
margin-right: auto;
height: 100vh;
/* background-color: red; */
`;

const Content = styled.div`
/* display: flex; */
width: 400px;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
align-content: center;
background-color: #f3f3f3f3;
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
        <Content>
          <h2 style={{marginBottom: '10px'}}>BUSCATEMP!</h2>
          <input
            type="text"
            placeholder="Digite a cidade: "
            onChange={e => setCity(e.target.value)}
          /><br/>
          <button onClick={getWeather}>Buscar</button><hr />
          {weather.map((wt) => (
            <div key={wt.main} style={{width: '500px', marginTop: '20px', marginBottom: '10px', textAlign: 'center', borderRadius: '10px', background: '#f5f5'}}>
              <h1>{wt.name}</h1>
              <h2>Temperatura atual: <span style={{fontSize: '30px', color: 'blue'}}>{parseInt(wt?.main?.temp)}ºC</span> </h2>
              <h4>{parseInt(wt.main.temp) <= 15 ? 'Beacap está com frio!! ☁' : '"Sensação de agradável à quente" 🌥' }</h4>
            </div>
          ))}
        </Content>
      </Container>
    </>
  )

}
