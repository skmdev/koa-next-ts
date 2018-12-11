/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';

import Clock from '.';
import { formatTime } from '../../../common/utils';

describe('Clock', () => {
  describe('render()', () => {
    it('renders the checkbox with correct label', () => {
      const timeValue = Date.now();
      const wrapper = shallow(<Clock lastUpdate={timeValue} light />);
      expect(wrapper.text()).toBe(formatTime(new Date(timeValue)));
    });
  });
});
