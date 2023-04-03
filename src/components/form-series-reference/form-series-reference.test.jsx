import React from 'react';
import { shallow } from 'enzyme';
import FormSeriesReference from './form-series-reference.component';

let defaultProps;
let wrapper;

beforeEach(() => {
  defaultProps = {
    initialValues: {}
  };
  wrapper = shallow(<FormSeriesReference {...defaultProps} />);
});

test('should render FormSeriesReference correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
