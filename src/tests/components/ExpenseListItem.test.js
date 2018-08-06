
import React from 'react';
import { shallow } from 'enzyme';

import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

describe('componenets/ExpenseListItem', () => {
  it('should render ExpenseListItem with provided values', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]} />)

    expect(wrapper).toMatchSnapshot();
  });
});