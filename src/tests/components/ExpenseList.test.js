
import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

describe('componenets/ExpenseList', () => {
  it('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render expense list with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);

    expect(wrapper).toMatchSnapshot();
  });
});