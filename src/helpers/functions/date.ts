const localDate = (seconds: number): string => {
  const data = new Date(seconds * 1000);
  return data.toLocaleDateString("de-DE");
};

export default localDate;
