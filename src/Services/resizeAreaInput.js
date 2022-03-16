const resizeAreaInput = (target) => {
  const numberOfLineBreaks = (target.value.match(/\n/g) || []).length;

  target.rows = numberOfLineBreaks + 4;
};

export default resizeAreaInput;
