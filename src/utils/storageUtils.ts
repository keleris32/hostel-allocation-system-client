export const setStudent = (data: string) => localStorage.setItem('__sT', data);

export const getStudent = () => {
  return localStorage.getItem('__sT');
};

export const removeStudent = () => localStorage.removeItem('__sT');
