import React, { Component } from 'react';
import starIco from '../images/starIco.png';

export default class StarImage extends Component {
  render() {
    return (
      <img src={ starIco } alt="Estrela de Pontuação" className="star-img" />
    );
  }
}
