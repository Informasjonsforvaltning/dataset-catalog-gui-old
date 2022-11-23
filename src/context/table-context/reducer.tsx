import React from 'react';
import { produce } from 'immer';

import { Dataset } from '../../utils/types';
import { ACTION, ACTION_TYPE } from '../actions';
import { Props as ColumnProps } from '../../components/table/table-row/row-cell';
import { Props as RowProps } from '../../components/table/table-row';
import { Props as HeaderColumnProps } from '../../components/table/table-header';
import getDate from '../../utils/helpers/date-and-time-formatter';
import getTag from '../../utils/helpers/tag-finder';
import { useDatasetsContext } from '../datasets-context';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/icon';
import Button from '../../components/inputs/button';

type SORT_ORDER = 'default' | 'ascending' | 'descending';

type STATE = {
  datasets: Dataset[];
  datasetsView: Dataset[];
  headerColumns: HeaderColumnProps;
  rows: RowProps<ColumnProps>[];
  searchTerm: string;
  filter: { lastModifiedBy: string; status: string };
  sort: { sortBy: string; sortOrder: SORT_ORDER };
};

const reducer = produce((state: STATE, action: ACTION) => {
  switch (action.type) {
    case ACTION_TYPE.GET_DATASETS:
      state.datasets = getDatasets();
      return state;
    case ACTION_TYPE.ADD_HEADER_COLUMNS:
      state.headerColumns = getHeaderColumns(state.sort.sortBy);
      return state;
    case ACTION_TYPE.ADD_ROWS:
      state.rows = getRows(state.datasets);
      return state;
    case ACTION_TYPE.FILTER_DATASETS:
      state.datasetsView = getFilteredDatasets(state.datasets, state.filter);
      return state;
    case ACTION_TYPE.FILTER_DATASETS:
      state.datasetsView = getFilteredDatasets(state.datasets, state.filter);
      return state;
    default:
      return state;
  }
});

const colWidths = {
  col_1: '70%',
  col_2: '16%',
  col_3: '14%',
};

const handleRowClick = (id: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  navigate(`${location.pathname}/${id}`);
};

const getCorrectIcon = (sortBy: string) => {
  switch (sortBy) {
    case 'ascending':
      return <Icon name='listAscendingStroke' />;
    case 'descending':
      return <Icon name='listDescendingStroke' />;
    default:
      return <Icon name='listUnsortedStroke' />;
  }
};

const getHeaderColumns = (sortBy: string) => ({
  cols: [
    {
      sortButton: <Button name='Title' type='transparent' iconPos='right' endIcon={getCorrectIcon(sortBy)} />,
      width: colWidths.col_1,
    },
    {
      sortButton: <Button name='Sist endret' type='transparent' iconPos='right' endIcon={getCorrectIcon(sortBy)} />,
      width: colWidths.col_2,
    },
    {
      sortButton: <Button name='Status' type='transparent' iconPos='right' endIcon={getCorrectIcon(sortBy)} />,
      width: colWidths.col_3,
    },
  ],
});

const getRows = (datasets: Dataset[]) =>
  datasets.map(dataset => ({
    row: [
      { text: dataset.title?.nb, width: colWidths.col_1 },
      { text: getDate(dataset._lastModified), width: colWidths.col_2 },
      { tag: getTag(dataset.registrationStatus), width: colWidths.col_3 },
    ],
    onRowClick: () => handleRowClick(dataset.id),
  }));

const getDatasets = () => {
  const { datasets } = useDatasetsContext();
  return datasets;
};

const getFilteredDatasets = ({ datasets, filter }: STATE) =>
  datasets.filter(dataset => dataset.registrationStatus === filter.status);

export { STATE, reducer };
