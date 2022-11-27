import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/trivia/" component={ Login } />
      <Route exact path="/trivia/game" component={ Game } />
      <Route exact path="/trivia/config" component={ Config } />
      <Route exact path="/trivia/feedback" component={ Feedback } />
      <Route exact path="/trivia/ranking" component={ Ranking } />
    </Switch>
  );
}
