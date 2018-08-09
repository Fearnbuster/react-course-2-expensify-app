
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firestore from '../../firebase/firebase';

import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

const clearTestCollection = async (collectionRef) => {
  const collectionData = await collectionRef.get();

  const batch = firestore.batch();
  collectionData.docs.forEach(async (doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};

const setupTestCollection = async (collectionRef) => {
  for (const expense of expenses) {
    const { 
      id, 
      description, 
      note, 
      amount, 
      createdAt } = expense;

    await collectionRef.doc(id).set({ description, note, amount, createdAt });
  }
};

describe('actions/expenses', () => {
  beforeEach(async (done) => {
    const collectionRef = firestore.collection('expenses');

    await clearTestCollection(collectionRef);
    await setupTestCollection(collectionRef);
    
    done();
  });

  it('should setup add expense action object with provided values', () => {

    const action = addExpense(expenses[2]);

    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[2]
    });
  });

  it('should add expense to database and store', async (done) => {
    const store = createMockStore({});
    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 1000
    };

    await store.dispatch(startAddExpense(expenseData));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    const expense = await firestore
      .collection('expenses')
      .doc(actions[0].expense.id)
      .get();

    expect(expense.data()).toEqual(expenseData);

    done();
  });

  it('should add expense with defaults to database and store', async (done) => {
    const store = createMockStore({});
    const expectedData = {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    };

    await store.dispatch(startAddExpense({}));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expectedData
      }
    });

    const expense = await firestore
      .collection('expenses')
      .doc(actions[0].expense.id)
      .get();

    expect(expense.data()).toEqual(expectedData);

    done();
  });

  it('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    
    expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123abc', 
      updates: {
        note: 'New note value'
      }
    });
  });

  it('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '123abc'
    });
  });

  it('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
  });

  it('should fetch the expenses for database', async (done) => {
    const store = createMockStore({});
    await store.dispatch(startSetExpenses());

    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });

    done();
  });
});