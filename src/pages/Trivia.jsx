import React, { Component } from 'react';
import Header from '../components/Header';
import getQuestionsAPI from '../services/getQuestionsAPI';

export default class Trivia extends Component {
  componentDidMount() {
    getQuestionsAPI();
  }

  render() {
    return (
      <Header />
    );
  }
}
