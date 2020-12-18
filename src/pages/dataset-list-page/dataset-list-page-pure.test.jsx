import React from 'react';
import { shallow } from 'enzyme';
import { DatasetsListPagePure } from './dataset-list-page-pure';
import catalog from './__fixtures/catalog';

let defaultProps;
let wrapper;

beforeEach(() => {
  const fetchCatalogIfNeeded = jest.fn();
  const fetchDatasetsIfNeeded = jest.fn();
  const requestSearch = jest.fn();
  defaultProps = {
    catalogId: catalog.item.id,
    catalog,
    fetchCatalogIfNeeded,
    fetchDatasetsIfNeeded,
    datasetsActions: { searchDatasetsRequested: requestSearch },
    searchResults: {
      datasets: [],
      catalogs: []
    }
  };
  wrapper = shallow(<DatasetsListPagePure {...defaultProps} />);
});

test('should render DatasetsListPagePure correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
