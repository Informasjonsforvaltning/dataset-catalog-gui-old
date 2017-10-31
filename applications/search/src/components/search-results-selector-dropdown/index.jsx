import * as React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import localization from '../localization';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'sort.relevance'
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const key = e.key;
    this.props.setItems([key]);
    const text = this.props.translate(e.label || e.title || e.key);
    this.setState({
      selectedValue: e.label || e.title || e.key
    });
  }

  getSelectedValue() {
    const { selectedItems = [] } = this.props;
    if (selectedItems.length === 0) return null;
    return selectedItems[0];
  }

  render() {
    const { items, showCount, translate, countFormatter } = this.props; // eslint-disable-line react/prop-types

    return (
      <DropdownButton
        id="search-result-dropdown-1"
        bsStyle="default"
        className="btn btn-default dropdown-toggle fdk-button fdk-button-default"
        title={`${this.props.translate('sort.by')} ${this.props.translate(this.state.selectedValue)}`}
        onSelect={this.onChange}
      >
        {map(items, (item, idx) => {
          const { key, label, title, doc_count } = item;
          let text = `${translate('sort.by')} ${translate(label || title || key)}`;
          if (showCount && doc_count !== undefined) text += ` (${countFormatter(doc_count)})`; // eslint-disable-line camelcase
          return (
            <MenuItem key={idx} eventKey={item}>{text}</MenuItem>
          );
        })}
      </DropdownButton>

    );
  }
}

Select.defaultProps = {
  selectedItems: null
};

Select.propTypes = {
  selectedItems: PropTypes.array
};
