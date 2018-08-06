
import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

const expense = expenses[0];
const params = { id: expense.id };

describe('components/EditExpensePage', () => {
  it('should render EditExpensePage correctly', () => {
    const wrapper = shallow(<EditExpensePage 
      expense={expense} 
      match={{ params }} 
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle edit expense', () => {
    const editExpenseSpy = jest.fn();
    const historySpy = { push: jest.fn() };
    const wrapper = shallow(<EditExpensePage 
      expense={expense} 
      match={{ params }} 
      editExpense={editExpenseSpy}
      history={historySpy} 
    />);

    wrapper.find('ExpenseForm').prop('onSubmit')(expense);

    expect(editExpenseSpy).toHaveBeenLastCalledWith(expense.id, expense);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
  });

  it('should handle remove expense', () => {
    const removeExpenseSpy = jest.fn();
    const historySpy = { push: jest.fn() };
    const wrapper = shallow(<EditExpensePage 
      expense={expense} 
      match={{ params }} 
      removeExpense={removeExpenseSpy}
      history={historySpy} 
    />);

    wrapper.find('button').prop('onClick')();

    expect(removeExpenseSpy).toHaveBeenLastCalledWith({
      id: expense.id
    });
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
  });
});