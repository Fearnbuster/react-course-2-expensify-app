
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';


describe('components/ExpenseForm', () => {
  it('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render ExpenseForm with provided values', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render error for invalid form data', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(0).simulate('change', {
      target: { value }
    });
    
    expect(wrapper.state('description')).toBe(value);
  });

  it('should set note on text area change', () => {
    const value = 'New note';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('textarea').at(0).simulate('change', {
      target: { value }
    });
    
    expect(wrapper.state('note')).toBe(value);
  });

  it('should set amount if input is valid', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(1).simulate('change', {
      target: { value }
    });
    
    expect(wrapper.state('amount')).toBe(value);
  });

  it('should NOT set amount if input is invalid', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(1).simulate('change', {
      target: { value }
    });
    
    expect(wrapper.state('amount')).not.toBe(value);
  });

  it('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const expense = expenses[0];
    const wrapper = shallow(<ExpenseForm expense={expense} onSubmit={onSubmitSpy}/>);

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
      description: expense.description,
      amount: expense.amount,
      note: expense.note,
      createdAt: expense.createdAt
    });
  });

  it('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find(SingleDatePicker).prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now);
  });

  it('should set calender focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });

    expect(wrapper.state('calenderFocused')).toBe(focused);
  });
});