const isElementIn = (element: object , array: object[]) => {
  return array.some((item) => {
    return JSON.stringify(item) === JSON.stringify(element);
  });
};

export default isElementIn;
