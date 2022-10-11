import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const minAnswer = 3;

class Feedback extends Component {
  render() {
    const { answerCorrect } = this.props;
    return (
      <>
        <Header />
        <div>
          <p data-testid="feedback-text">
            {answerCorrect < minAnswer ? 'Could be better...' : 'Well Done!' }
          </p>
        </div>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  answerCorrect: state.answer.answerCorrect,
});

Feedback.propTypes = {
  answerCorrect: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
