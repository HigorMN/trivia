const getQuestionsAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await (await fetch(endPoint)).json();
    return response.results;
  } catch (error) {
    return ['error', error.message];
  }
};

export default getQuestionsAPI;
