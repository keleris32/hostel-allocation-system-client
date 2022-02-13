export const setAccessToken = (token: string) =>
  localStorage.setItem('__tK', token);

export const getAccessToken = () => {
  return localStorage.getItem('__tK');
};

export const removeAccessToken = () => localStorage.removeItem('__tK');
