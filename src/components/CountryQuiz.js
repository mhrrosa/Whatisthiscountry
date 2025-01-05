// src/components/CountryQuiz.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, CircularProgress, Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ApiService from '../services/ApiService';

const CountryQuiz = ({ onBack }) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRandomCountry = async () => {
      try {
        setLoading(true);
        const countries = await ApiService.fetchAllCountries();
        const randomIndex = Math.floor(Math.random() * countries.length);
        setCountry(countries[randomIndex]);
      } catch (error) {
        setError('Erro ao carregar o país. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadRandomCountry();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">
            Country Quiz
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          country && (
            <div>
              <Typography variant="h4" gutterBottom>
                Descubra o País
              </Typography>
              <Typography variant="body1">Nome: {country.name}</Typography>
              <Typography variant="body1">Capital: {country.capital}</Typography>
              <Typography variant="body1">Região: {country.region}</Typography>
              <img src={country.flag} alt={`Bandeira de ${country.name}`} width="100" />
            </div>
          )
        )}
      </Container>
    </div>
  );
};

export default CountryQuiz;
