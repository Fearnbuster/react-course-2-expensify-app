
import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../../components/Header';

describe('componenets/Header', () => {
  it('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should begin logout sequence on logout button click', () => {
    const logoutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={logoutSpy} />);

    wrapper.find('button').simulate('click');

    expect(logoutSpy).toHaveBeenCalled();
  });
});

