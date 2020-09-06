import React from 'react';
import './App.css';
import Flashcards from './components/Flashcards'

function App() {
  return (
    <div className="App">
      <Flashcards rootUrl={"http://localhost:3001"}/>
    </div>
  );
}

export default App;
