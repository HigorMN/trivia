import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('Testando a tela de FeedBack', () => {
  test('Se ao clicar no botão Play Again volta para o inicio', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    act(() => {
      history.push('/feedback')
    })

    const btnAgain = screen.getByRole('button', { name: /jogar novamente/i})

    expect(history.location.pathname).toBe('/feedback')
    userEvent.click(btnAgain)
    expect(history.location.pathname).toBe('/')
  })

  test('Se ao clicar no botão Ranking vai para o ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    act(() => {
      history.push('/feedback')
    })

    const btnRank = screen.getByRole('button', {  name: /ver ranking/i})

    expect(history.location.pathname).toBe('/feedback')
    userEvent.click(btnRank)
    expect(history.location.pathname).toBe('/ranking')
  })
})