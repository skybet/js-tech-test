const formatStartTime = dateString => {
  const date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "long"
  })} ${date.getHours()}:${date.getMinutes()}`;
};

export default formatStartTime;
