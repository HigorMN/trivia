import React, { Component } from 'react';
import logoTrivia from '../images/logoTrivia.png';

export default class Loading extends Component {
  render() {
    return (
      <main className="center vh">
        <img className="logoload" data-testid="loading" src={ logoTrivia } alt="" />
        <div className="loader" />
      </main>
    );
  }
}
