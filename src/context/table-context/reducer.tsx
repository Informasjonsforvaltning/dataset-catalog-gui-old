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
import { RegistrationStatus } from '../../utils/types/enums';

type SORT_ORDER = 'ascending' | 'descending';
type FILTER_TYPE = { lastModified?: Date | undefined; status?: RegistrationStatus | undefined; searchTerm?: string };
type SORT_BY_TYPE = 'title' | 'last-modified' | 'status';
type SORT_TYPE = { sortBy: SORT_BY_TYPE; sortOrder: SORT_ORDER };

type STATE = {
  datasets: Dataset[];
  datasetsView: Dataset[];
  headerColumns: HeaderColumnProps;
  rows: RowProps<ColumnProps>[];
  filter: FILTER_TYPE;
  sort: SORT_TYPE;
};

const reducer = produce((state: STATE, action: ACTION) => {
  switch (action.type) {
    case ACTION_TYPE.GET_DATASETS:
      state.datasets = getDatasets();
      state.datasetsView = state.datasets.slice();
      return state;
    case ACTION_TYPE.ADD_HEADER_COLUMNS:
      state.headerColumns = getHeaderColumns(state.sort.sortBy);
      return state;
    case ACTION_TYPE.ADD_ROWS:
      state.rows = getRows(state.datasets);
      return state;
    case ACTION_TYPE.FILTER_DATASETS:
      state.datasetsView = getFilteredDatasets(state.datasets, state.filter);
      if (state.sort) {
        state.datasetsView = sortDatasetsView(state.datasetsView, state.sort);
      }
      return state;
    case ACTION_TYPE.SORT_DATASETS:
      if (action.payload.sortBy && action.payload.sortBy !== state.sort.sortBy) {
        state.sort.sortBy = action.payload.sortBy;
        state.sort.sortOrder = 'ascending';
      } else {
        if (state.sort.sortOrder === 'ascending') state.sort.sortOrder = 'descending';
        else state.sort.sortOrder === 'descending';
      }
      state.datasetsView = sortDatasetsView(state.datasetsView, state.sort);
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

const getFilteredDatasets = (datasets: Dataset[], filter?: FILTER_TYPE, searchTerm?: string) => {
  let datasetsView = datasets;
  if (filter) {
    if (filter.status) datasetsView = datasets.filter(dataset => dataset.registrationStatus === filter.status);
    else if (filter.lastModified)
      datasetsView = datasets.filter(dataset => dataset._lastModified.getTime() === filter.lastModified!.getTime());
  } else if (searchTerm)
    datasetsView = datasets.filter(
      dataset => dataset.title?.nb === searchTerm || dataset.title?.nn.startsWith(searchTerm)
    );
  return datasetsView;
};

const sortDatasetsView = (datasets: Dataset[], sort: SORT_TYPE) => {
  switch (sort.sortBy) {
    case 'status':
      datasets.sort((datasetA, datasetB) => {
        if (sort.sortOrder === 'ascending') {
          return ascendSort(datasetA.registrationStatus, datasetB.registrationStatus);
        } else {
          return descendSort(datasetA.registrationStatus, datasetB.registrationStatus);
        }
      });
      break;
    case 'last-modified':
      datasets.sort((datasetA, datasetB) => {
        if (sort.sortOrder === 'ascending') {
          return ascendSort(datasetA._lastModified.getTime(), datasetB._lastModified.getTime());
        } else {
          return descendSort(datasetA._lastModified.getTime(), datasetB._lastModified.getTime());
        }
      });
      break;
    default:
      datasets.sort((datasetA, datasetB) => {
        if (sort.sortOrder === 'ascending') {
          return ascendSort(datasetA.title.nb, datasetB.title.nb);
        } else {
          return descendSort(datasetA.title.nb, datasetB.title.nb);
        }
      });
  }
  return datasets;
};

const ascendSort = (A: string | number, B: string | number): number => {
  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};

const descendSort = (A: string | number, B: string | number): number => {
  if (A > B) return -1;
  if (A < B) return 1;
  return 0;
};

export { STATE, SORT_TYPE, FILTER_TYPE, reducer };
