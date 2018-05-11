import React from "react";
import {shallow} from "enzyme";
import InputTagsFieldArray from "../../../src/components/reg-form-field-input-tags-objects";

let defaultProps, wrapper, onToggleTitle, preventDefault;

beforeEach(() => {
  onToggleTitle = jest.fn();
  preventDefault = jest.fn();
  defaultProps = {
    input: {
      name: "spatial",
    value: []
    },
    meta: {
      active: false,
      asyncValidating: false,
      autofilled: false,
      dirty: false,
      form: "spatial",
      initial: [],
      invalid: false,
      pristine: true,
      submitting: false,
      submitFailed: false,
      touched: false,
      valid: true,
      visited: false
    },
    type: "text",
    label: "Geografisk avgrensning",
    fieldLabel: "uri",
    showLabel: false
  };
  wrapper = shallow(<InputTagsFieldArray {...defaultProps} />);
});

test('should render InputTagsFieldArray correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

