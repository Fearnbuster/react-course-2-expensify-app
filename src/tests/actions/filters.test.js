
import moment from 'moment';
import { setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';


describe('actions/filters', () => {
  it('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
  
    expect(action).toEqual({
      type: 'SET_START_DATE',
      date: moment(0)
    });
  });
  
  it('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
  
    expect(action).toEqual({
      type: 'SET_END_DATE',
      date: moment(0)
    });
  });

  it('should generate set text filter action object with provided  values', () => {
    const action = setTextFilter('Bill');

    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: 'Bill'
    });
  });

  it('should generate set text filter action object with default  values', () => {
    const action = setTextFilter();

    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: ''
    });
  });

  it('should generate a sort by amount action object', () => {
    const action = sortByAmount();

    expect(action).toEqual({ 
      type: 'SORT_BY_AMOUNT'
    });
  });

  it('should generate a sort by date action object', () => {
    const action = sortByDate();

    expect(action).toEqual({ 
      type: 'SORT_BY_DATE'
    });
  });
});
