// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CountryQuiz from './components/CountryQuiz';
import Menu from './components/Menu';
import MyScore from './components/MyScore';
import GlobalRank from './components/GlobalRank';
import './assets/styles/app.css';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [language, setLanguage] = useState('pt-BR'); // Estado para a seleção de idioma

  const handleStart = () => {
    setShowQuiz(true);
  };

  const handleBack = () => {
    setShowQuiz(false);
  };

  const handleAbout = () => {
    alert('This is a quiz game about countries. Test your knowledge!');
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value); // Atualiza o idioma selecionado
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/myscore">My Score</Link>
          <Link to="/globalrank">Global Rank</Link>
          
          {/* Seletor de idioma */}
          <FormControl sx={{ minWidth: 120 }} variant="outlined" style={{ marginLeft: 'auto', marginRight: '10px' }}>
            <InputLabel id="language-select-label" style={{ color: 'white' }}>Language</InputLabel>
            <Select
              labelId="language-select-label"
              value={language}
              onChange={handleLanguageChange}
              label="Language"
              style={{
                borderColor: 'white', 
                color: 'white',
                width: '150px',
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#4A2A0A', // Cor do fundo do menu
                    color: 'white', // Cor do texto no menu
                  },
                },
              }}
            >
              <MenuItem value="pt-BR" style={{ color: 'white' }}>Português (PT-BR)</MenuItem>
              <MenuItem value="en" style={{ color: 'white' }}>English (EN)</MenuItem>
            </Select>
          </FormControl>
          
        </header>
        <body>
          <h1 className="App-title">Jogo de Países</h1>
          <div className="App-content">
            <Switch>
              <Route path="/" exact>
                {showQuiz ? (
                  <CountryQuiz onBack={handleBack} />
                ) : (
                  <Menu onStart={handleStart} onAbout={handleAbout} />
                )}
              </Route>
              <Route path="/myscore" component={MyScore} />
              <Route path="/globalrank" component={GlobalRank} />
            </Switch>
          </div>
        </body>
      </div>
    </Router>
  );
}

export default App;
