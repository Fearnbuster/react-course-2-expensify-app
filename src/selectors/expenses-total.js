
export default (expenses) => {
  if (typeof expenses !== 'object') {
    return 0;
  }

  return expenses.reduce((sum, currentValue) => {
    return sum + currentValue.amount;
  }, 0);
};