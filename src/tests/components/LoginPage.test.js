
import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from '../../components/LoginPage';

describe('components/LoginPage', () => {
  it('should render LoginPage correctly', () => {
    const wrapper = shallow(<LoginPage startLogin={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should begin login sequence on login button click', () => {
    const loginSpy = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={loginSpy} />);

    wrapper.find('button').simulate('click');

    expect(loginSpy).toHaveBeenCalled();
  });
});