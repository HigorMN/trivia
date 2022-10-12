export const createLocal = () => {
  if (JSON.parse(localStorage.getItem('playrs')) === null) {
    localStorage.setItem('playrs', JSON.stringify([]));
  }
};

export const saveLocal = (objeto) => {
  const getPlayrs = JSON.parse(localStorage.getItem('playrs'));
  localStorage.setItem('playrs', JSON.stringify([...getPlayrs, objeto]));
};

export const getPlayrsLocal = () => JSON.parse(localStorage.getItem('playrs'));
