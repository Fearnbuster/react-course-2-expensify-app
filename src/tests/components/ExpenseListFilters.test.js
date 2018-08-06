
import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { DateRangePicker } from 'react-dates';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import { isMoment } from '../../../../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;


describe('components/ExpenseListFilters', () => {
  beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
      <ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    );
  });

  it('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
      filters: altFilters
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle text change', () => {
    const value = 'test';

    wrapper.find('input').simulate('change', {
      target: {
        value
      }
    });

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
  });

  it('should sort by amount', () => {
    const value = 'amount';

    wrapper.find('select').simulate('change', {
      target: { 
        value: value 
      }
    });

    expect(sortByAmount).toHaveBeenCalled();
  });

  it('should sort by date', () => {
    const value = 'date';

    wrapper.setProps({
      filters: altFilters
    });

    wrapper.find('select').simulate('change', { 
      target: { 
        value 
      }
    });

    expect(sortByDate).toHaveBeenCalled();
  });

  it('should handle date changes', () => {
    const startDate = moment(0).subtract(1, 'day');
    const endDate = moment(0).add(1, 'day');

    wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate});

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
  });

  it('should handle date focus changes', () => {
    const calenderFocus = 'endDate';

    wrapper.find(DateRangePicker).prop('onFocusChange')( calenderFocus);

    expect(wrapper.state('calenderFocused')).toBe(calenderFocus);
  });
});