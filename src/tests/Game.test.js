import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { data, dataInvalid } from './helpers/mockAPITrivia';

afterEach(() => jest.clearAllMocks());
describe('Testando a tela do Jogo', () => {
  

  test('testa quando o token é invalido volta ao inicio', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataInvalid),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/game')
    })

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading'),
    )

    expect(history.location.pathname).toBe('/')
  })

  jest.setTimeout(45000);
 test('Testando a aplicação do Trivia', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/game')
    })

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading'),
    )
    
    const incorrectAnswer = screen.getAllByTestId(/wrong-answer/i);
    await screen.findByTestId("btn-next", {}, {timeout: 35000});

    
    for(let index = 0; index < 4; index += 1){
      userEvent.click(screen.getByTestId('correct-answer'));
      expect(screen.getByTestId('correct-answer')).toBeDisabled();
      const btnNext = screen.getByTestId('btn-next');
      userEvent.click(btnNext);
      userEvent.click(incorrectAnswer[0])
    }

    userEvent.click(screen.getByTestId('correct-answer'));
    const btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext);

    expect(history.location.pathname).toBe('/feedback');
 })
});