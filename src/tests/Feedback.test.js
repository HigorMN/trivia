import { getByTestId, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { data } from './helpers/mockAPITrivia';

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
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback' )

    const btnRank = screen.getByRole('button', {  name: /ver ranking/i})

    expect(history.location.pathname).toBe('/feedback')
    userEvent.click(btnRank)
    expect(history.location.pathname).toBe('/ranking')
  })

  test('testa se aparece well done ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    });

    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading'),
    )
    
    for(let index = 0; index < 4; index += 1){
      userEvent.click(screen.getByTestId('correct-answer'));
      const btnNext = screen.getByTestId('btn-next');
      userEvent.click(btnNext);
    }

    userEvent.click(screen.getByTestId('correct-answer'));
    const btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext);

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
    expect(screen.getByText(/well done!/i)).toBeInTheDocument()
  })
})