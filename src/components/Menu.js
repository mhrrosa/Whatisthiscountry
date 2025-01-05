// src/components/Menu.js
import React from 'react';
import '../assets/styles/menu.css'

function Menu({ onStart, onAbout }) {
  return (
    <div className="Menu">
      <h1>Bem-vindo ao Jogo de Países</h1>
      <button onClick={onStart}>Start</button>
      <button onClick={onAbout}>About</button>
    </div>
  );
}

export default Menu;
