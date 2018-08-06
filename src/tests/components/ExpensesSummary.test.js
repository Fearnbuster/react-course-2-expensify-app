
import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

describe('components/ExpensesSummary', () => {
  it('should render component correctly with 1 expense', () => {
    const wrapper = shallow(
      <ExpenseSummary 
        expenses={[expenses[0]]}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render component correctly with multiple expenses', () => {
    const wrapper = shallow(
      <ExpenseSummary 
        expenses={expenses}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});