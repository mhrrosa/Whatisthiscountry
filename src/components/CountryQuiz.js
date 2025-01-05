// src/components/CountryQuiz.js

import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

const CountryQuiz = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para carregar países e selecionar um aleatório
    const loadRandomCountry = async () => {
      try {
        setLoading(true);
        const countries = await ApiService.fetchAllCountries();
        const randomIndex = Math.floor(Math.random() * countries.length);
        setCountry(countries[randomIndex]);
      } catch (error) {
        setError('Erro ao carregar o país. Tente novamente mais tarde. ', error);
      } finally {
        setLoading(false);
      }
    };

    loadRandomCountry();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {country ? (
        <div>
          <h2>Descubra o País</h2>
          <p>Nome: {country.name}</p>
          <p>Capital: {country.capital}</p>
          <p>Região: {country.region}</p>
          <img src={country.flag} alt={`Bandeira de ${country.name}`} width="100" />
        </div>
      ) : (
        <p>Nenhum país disponível.</p>
      )}
    </div>
  );
};

export default CountryQuiz;
