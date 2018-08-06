
import React from 'react';
import { shallow } from 'enzyme';

import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

describe('components/ExpenseDashboardPage', () => {
  it('should render ExpenseDashboardPage correctly', () => {
    const wrapper = shallow(<ExpenseDashboardPage />);

    expect(wrapper).toMatchSnapshot();
  });
});