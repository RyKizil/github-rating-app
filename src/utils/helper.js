export const roundAfterThousand = (value) => {
  const multiplier = Math.pow(10, 1);
  if (value >= 1000) {
    let number = value / 1000;
    return Math.round(number * multiplier) / multiplier + "k";
  }
  return value;
};

export const getDateFormat = (value) => {
  return value.substring(0, value.indexOf("T"));
};
