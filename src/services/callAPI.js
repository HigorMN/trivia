const endPoint = 'https://opentdb.com/api_token.php?command=request';

const callAPI = async () => {
  const response = await (await fetch(endPoint)).json();
  const { token } = response;

  localStorage.setItem('token', token);
};

export default callAPI;
