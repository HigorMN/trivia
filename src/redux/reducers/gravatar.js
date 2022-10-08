const INITIAL_STATE = {
  email: '',
  name: '',
};

const gravatar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GRAVATAR_EMAIL':
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
};

export default gravatar;
