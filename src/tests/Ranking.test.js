import { getByText, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { data } from './helpers/mockAPITrivia';

const gravatar = {
  name: 'Higor',
  email: 'higor.maranhao2000@gmail.com',
}
const player = {
  assertions: 4,
  score: 150,
}

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

  test('testa se o ranking aparece', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    });

    renderWithRouterAndRedux(<App />, {}, '/game');

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

    const verRanking = screen.getByText(/ver ranking/i);
    userEvent.click(verRanking);
  })

  it('Testando a tela ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { gravatar, player }, '/feedback')
    expect(history.location.pathname).toBe('/feedback')

    expect(screen.getByText('4')).toBeInTheDocument();

    const verRanking = screen.getByText(/ver ranking/i);
    expect(verRanking).toBeInTheDocument()
    userEvent.click(verRanking);

    expect(screen.getByText('Higor')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  })
})