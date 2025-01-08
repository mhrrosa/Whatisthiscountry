import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, CircularProgress, Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ApiService from '../services/ApiService';
import GameModel from '../models/GameModel';  // Importando a GameModel
import '../assets/styles/quiz.css';

const CountryQuiz = ({ onBack }) => {
  const [gameModel] = useState(new GameModel());
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(localStorage.getItem('bestScore') || 0);

  useEffect(() => {
    const loadRandomCountry = async () => {
      try {
        setLoading(true);
        const countries = await ApiService.fetchAllCountries();
        gameModel.initializeGame(countries);
        setCountry(gameModel.currentCountry);
      } catch (error) {
        setError('Erro ao carregar o país. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadRandomCountry();
  }, [gameModel]);

  const handleCheckAnswer = () => {
    const isCorrect = gameModel.checkAnswer(inputValue);
    if (isCorrect) {
      const newScore = score + 10;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('bestScore', newScore);
      }
      gameModel.setNextCountry();
      setCountry(gameModel.currentCountry);
      setInputValue('');
    } else {
      alert(`Resposta errada! Sua pontuação final é ${score}`);
      resetGame();
    }
  };

  const resetGame = async () => {
    try {
      setLoading(true);
      const countries = await ApiService.fetchAllCountries();
      gameModel.initializeGame(countries);
      setScore(0);
      setCountry(gameModel.currentCountry);
      setInputValue('');
    } catch (error) {
      setError('Erro ao carregar o país. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='quiz-content'>
      <Container>
        <IconButton edge="start" color="inherit" onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          country && (
            <div className='card-content'>
            <div className='card-country'>
              <h2 className='score-personal'>Best Score: {bestScore}</h2>
              <h2 className='score-personal'>Score: {score}</h2>
              <img className='img-country' src={country.flag} alt={`Bandeira de ${country.name}`} /><br />
              <input
                className='game-text-field'
                id='name_country'
                placeholder='Insert country'
                value={inputValue}
                onChange={handleInputChange}
              />
              <br /><br />
              <button onClick={handleCheckAnswer}>Check</button>
            </div>
            </div>
          )
        )}
      </Container>
    </div>
  );
};

export default CountryQuiz;
