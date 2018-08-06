
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

describe('reducers/expenses', () => {
  it('should setup default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
  });

  it('should remove expense by id', () => {
    const action = {
      type: 'REMOVE_EXPENSE',
      id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([ expenses[0], expenses[2] ]);
  });

  it('should NOT remove expense if id is not found', () => {
    const action = {
      type: 'REMOVE_EXPENSE',
      id: -1
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
  });

  it('should add an expense', () => {
    const newExpense = {
      id: '4',
      description: 'Test expense',
      note: '',
      amount: 500,
      createdAt: 0
    }

    const action = {
      type: 'ADD_EXPENSE',
      expense: newExpense
    };
    
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, newExpense]);
  });

  it('should edit an expense', () => {
    const expenseToEdit = expenses[0];

    expenseToEdit.description = 'Change Test'
    expenseToEdit.note = 'This expense should be changed'

    const action = {
      type: 'EDIT_EXPENSE',
      updates: expenseToEdit
    };
    
    const state = expensesReducer(expenses, action);

    expect(state[0]).toEqual(expenseToEdit);
  });

  it('should NOT edit an expense if id is not found', () => {
    const expenseToEdit = expenses[1];

    expenseToEdit.id = -1;
    expenseToEdit.description = 'Change Test'
    expenseToEdit.note = 'This expense should NOT be changed'

    const action = {
      type: 'EDIT_EXPENSE',
      updates: expenseToEdit
    };
    
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
  });
});

