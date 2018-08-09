
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';

import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

describe('components/AddExpensePage', () => {
  beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
  });

  it('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
  });
});