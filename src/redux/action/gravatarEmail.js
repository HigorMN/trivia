const gravatarEmail = (email, name) => ({
  type: 'GRAVATAR_EMAIL',
  email,
  name,
});

export default gravatarEmail;
