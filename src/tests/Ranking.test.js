import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('testando a tela de ranking', () => {
  test('testando se ao clicar em jogar novamente volta para home', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/ranking');
    })

    const btnPlayAgain = screen.getByText(/jogar novamente/i);
    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);

    expect(history.location.pathname).toBe('/')
  })

  test('testa se o ranking aparece', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/feedback');
    })

    
    const btnPlayAgain = screen.getByText(/ver ranking/i);
    
    userEvent.click(btnPlayAgain);

    const playerName = screen.getByTestId('player-name-0');
    const playerscore = screen.getByTestId('player-name-0');

    expect(playerName).toBeInTheDocument();
    expect(playerscore).toBeInTheDocument();

  })
})