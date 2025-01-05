// Classe respónsavel pela modelo

class GameModel {
    constructor() {
      this.countries = []; // Lista de países carregados da API
      this.currentCountry = null; // País atual para o jogador adivinhar
      this.score = 0; // Pontuação do jogador
      this.maxRounds = 10; // Número máximo de rodadas
      this.currentRound = 0; // Rodada atual
    }
  
    // Método para inicializar o jogo com dados dos países
    initializeGame(countries) {
      this.countries = countries;
      this.score = 0;
      this.currentRound = 0;
      this.shuffleCountries();
      this.setNextCountry();
    }
  
    // Método para embaralhar a lista de países
    shuffleCountries() {
      for (let i = this.countries.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.countries[i], this.countries[j]] = [this.countries[j], this.countries[i]];
      }
    }
  
    // Método para definir o próximo país
    setNextCountry() {
      if (this.currentRound < this.maxRounds && this.countries.length > 0) {
        this.currentCountry = this.countries.shift();
        this.currentRound++;
      } else {
        this.currentCountry = null;
      }
    }
  
    // Método para verificar a resposta do jogador
    checkAnswer(answer) {
      if (!this.currentCountry) return false;
  
      const isCorrect = this.currentCountry.name.toLowerCase() === answer.toLowerCase();
      if (isCorrect) {
        this.score++;
      }
      return isCorrect;
    }
  
    // Método para obter a pontuação atual
    getScore() {
      return this.score;
    }
  }
  
  export default GameModel;
  