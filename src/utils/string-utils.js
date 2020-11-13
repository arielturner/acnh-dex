function capitalizeString(str) {
  return str.toLowerCase().replace(/^\w|\s\w/g, (letter) => letter.toUpperCase());
}

export default capitalizeString;
