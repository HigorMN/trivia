import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

afterEach(() => jest.clearAllMocks());

describe("<Login />", () => {
    test('Testando se ao digitar email e nome e clicar em jogar é redirecionado ao jogo', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const inputEmail = screen.getByTestId("input-gravatar-email");
        expect(inputEmail).toBeInTheDocument();

        userEvent.type(inputEmail, "test@email.com");
        const btnJogar = screen.getByRole('button', {  name: /jogar/i});
        expect(btnJogar).toBeInTheDocument();
        expect(btnJogar.disabled).toBe(true);
        
        const inputName = screen.getByTestId("input-player-name");
        userEvent.type(inputName, "playerName");
        expect(inputName).toBeInTheDocument();
        expect(btnJogar.disabled).toBe(false);
        
        userEvent.click(btnJogar);

        const playrName = await screen.findByText(/playername/i);
        expect(playrName).toBeInTheDocument();
        expect(history.location.pathname).toBe('/game');
    });

    test('renderizar o botão de configuração', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const inputELement = screen.getByRole('button', { name: /configuração/i});
        expect(inputELement).toBeInTheDocument();

        userEvent.click(inputELement);
        expect(history.location.pathname).toBe('/config')
    });
});