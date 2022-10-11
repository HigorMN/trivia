import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Login from '../pages/Login';


describe("<Login />", () => {
    test('renderizar o campo de email', () => {
        renderWithRouterAndRedux(<Login />);
        const inputELement = screen.getByTestId("input-gravatar-email");
        expect(inputELement).toBeInTheDocument();
        expect(inputELement).toHaveAttribute("type", "email");
    });
    test('testar se o email é válido', () => {
        renderWithRouterAndRedux(<Login />);
        const inputELement = screen.getByTestId("input-gravatar-email")
        userEvent.type(inputELement, "test@email.com");
        expect(screen.getByTestId("input-gravatar-email")).toHaveValue("test@email.com")
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });
    test('renderizar o campo de playerName', () => {
        renderWithRouterAndRedux(<Login />);
        const inputELement = screen.getByTestId("input-player-name");
        expect(inputELement).toBeInTheDocument();
        expect(inputELement).toHaveAttribute("type", "text");
    });
    test('testar se o playerName é válido', () => {
        renderWithRouterAndRedux(<Login />);
        const inputELement = screen.getByTestId("input-player-name")
        userEvent.type(inputELement, "playerName");
        expect(screen.getByTestId("input-player-name")).toHaveValue("playerName")
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });
    test('renderizar o botão', () => {
        renderWithRouterAndRedux(<Login />);
        const inputELement = screen.getByTestId("btn-play");
        expect(inputELement).toBeInTheDocument();
        expect(inputELement).toHaveAttribute("type", "submit");
    });

    test('renderizar o botão de configuração', () => {
        renderWithRouterAndRedux(<Login />);
        const inputELement = screen.getByRole('button', {  name: /configuração/i});
        expect(inputELement).toBeInTheDocument();
    });
});