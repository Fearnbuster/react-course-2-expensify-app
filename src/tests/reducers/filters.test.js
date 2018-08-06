
import moment from 'moment';

import filtersReducer from '../../reducers/filters';

describe('reducers/filters', () => {
  it('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      text: '',
      sortBy: 'date',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    });
  });

  it('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

    expect(state.sortBy).toBe('amount');
  });

  it('should set sortBy to date', () => {
    const currentState = {
      text: '',
      startDate: undefined,
      endDate: undefined,
      sortBy: 'amount'
    };

    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);

    expect(state.sortBy).toBe('date');
  });

  it('should set text filter', () => {
    const action = {
      type: 'SET_TEXT_FILTER',
      text: 'Test'
    };

    const state = filtersReducer(undefined, action);

    expect(state.text).toBe('Test');
  });

  it('should set start date', () => {
    const testDate = moment(0).add(1, 'day');

    const action = {
      type: 'SET_START_DATE',
      date: testDate
    };

    const state = filtersReducer(undefined, action);

    expect(state.startDate).toBe(testDate);
  });

  it('should set end date', () => {
    const testDate = moment(0).add(1, 'day');

    const action = {
      type: 'SET_END_DATE',
      date: testDate
    };

    const state = filtersReducer(undefined, action);

    expect(state.endDate).toBe(testDate);
  });
});