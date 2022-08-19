const isElementIn = (element: object, array: object[]) => {
  return array.find((item) => JSON.stringify(item) === JSON.stringify(element));
};

export default isElementIn;
