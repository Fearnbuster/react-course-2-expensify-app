
import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

describe('selectors/expensesTotal', () => {
  it('should return 0 if there are no expenses', () => {
    expect(getExpensesTotal([])).toBe(0);
  });

  it('should correctly add up a single expense', () => {
    const sampleData = [expenses[0]];

    expect(getExpensesTotal(sampleData)).toBe(sampleData[0].amount);
  });

  it('should correctly add up multiple expenses', () => {
    expect(getExpensesTotal(expenses)).toBe(114195);
  });
});