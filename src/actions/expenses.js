
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

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return firestore.collection('expenses')
      .doc(id)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });  
  };
};

export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id }) => {
  return (dispatch) => {
    firestore.collection('expenses')
      .doc(id)
      .delete()
      .then(() => {
        return dispatch(removeExpense({ id }));
      });
  };
};

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return firestore.collection('expenses')
    .get()
    .then((expensesRef) => {
      const expensesData = [];

      expensesRef.docs.forEach((doc) => {
        expensesData.push({
          id: doc.id,
          ...doc.data()
        });
      });

      dispatch(setExpenses(expensesData));
    });
  }
};

