// src/services/ApiService.js

import axios from 'axios';

class ApiService {
  constructor() {
    this.apiBaseURL = 'https://restcountries.com/v3.1';
  }

  // Método para buscar todos os países
  async fetchAllCountries() {
    try {
      const response = await axios.get(`${this.apiBaseURL}/all`);
      // Filtrando apenas as informações necessárias
      return response.data.map(country => ({
        name: country.name.common,
        capital: country.capital ? country.capital[0] : 'N/A',
        region: country.region,
        population: country.population,
        flag: country.flags.png // URL da bandeira do país
      }));
    } catch (error) {
      console.error('Erro ao buscar países:', error);
      throw error;
    }
  }

  // Método para buscar um país específico pelo nome (opcional, se necessário)
  async fetchCountryByName(name) {
    try {
      const response = await axios.get(`${this.apiBaseURL}/name/${name}`);
      return response.data[0]; // Retorna o primeiro resultado
    } catch (error) {
      console.error(`Erro ao buscar país com o nome ${name}:`, error);
      throw error;
    }
  }
}

export default new ApiService();
