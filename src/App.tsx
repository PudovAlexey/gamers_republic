import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTheme } from '@emotion/react';
import { ArcanoidControl } from './games/arcanoid/ArcanoidControl';

function App() {
  const theme = useTheme()
  console.log(theme)
  return (
    <div className="App">
      <ArcanoidControl/>
    </div>
  );
}

export default App;
