import React, { Component } from 'react';
import callAPI from '../services/callAPI';

export default class PlayButton extends Component {
  render() {
    return (
      <button
        type="button"
        onClick={ callAPI }
      >
        Play
      </button>
    );
  }
}
