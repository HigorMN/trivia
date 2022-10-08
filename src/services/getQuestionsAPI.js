const getQuestionsAPI = async () => {
  const token = localStorage.getItem('token');

  const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await (await fetch(endPoint)).json();
  const { results } = response;
  console.log(results);
};

export default getQuestionsAPI;
