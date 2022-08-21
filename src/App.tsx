import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTheme } from '@emotion/react';
import { Arcanoid } from './games/arcanoid/Arcanoid';

function App() {
  const theme = useTheme()
  console.log(theme)
  return (
    <div className="App">
      <Arcanoid/>
    </div>
  );
}

export default App;
