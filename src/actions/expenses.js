
import firestore from '../firebase/firebase';

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    return firestore.collection('expenses')
      .add(expense)
      .then((newExpense) => {
        dispatch(addExpense({
          id: newExpense.id,
          ...expense
        }));
      });
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

