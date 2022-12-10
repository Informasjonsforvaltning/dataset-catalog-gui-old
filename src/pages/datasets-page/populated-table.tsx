import React, { useEffect } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import Icon from '../../components/icon';
import Button from '../../components/inputs/button';
import Table from '../../components/table';
import getDate from '../../utils/helpers/date-and-time-formatter';
import getTag from '../../utils/helpers/tag-finder';
import { CellType } from '../../components/table/table-header';
import { ACTION, ACTION_TYPE } from '../../context/actions';
import { useTableContext, useTableDispatch } from '../../context/table-context';
import { Dataset } from '../../utils/types';
import { Props as ColumnProps } from '../../components/table/table-row/row-cell';
import { Props as RowProps } from '../../components/table/table-row';

const PopulatedTable = () => {
  const tableContext = useTableContext();
  const tableDispatch = useTableDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const tableUpdate = () => (
    tableDispatch({
      type: ACTION_TYPE.ADD_TABLE_HEADER,
      payload: { headerColumns: getHeaderColumns(tableContext.sort.sortBy ?? 'title', tableDispatch) },
    }),
    tableDispatch({
      type: ACTION_TYPE.ADD_TABLE_ROWS,
      payload: { rows: getRows(tableContext.datasets, location.pathname, navigate) ?? [] },
    })
  );

  useEffect(tableUpdate, []);

  return <Table rows={tableContext.rows} cols={tableContext.headerColumns} />;
};

const colWidths = {
  col_1: '70%',
  col_2: '16%',
  col_3: '14%',
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

const getHeaderColumns = (sortBy: string, tableDispatcher: React.Dispatch<ACTION>): CellType[] => {
  return [
    {
      sortButton: (
        <Button
          name='Title'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sortBy)}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'title' } })}
        />
      ),
      width: colWidths.col_1,
    },
    {
      sortButton: (
        <Button
          name='Sist endret'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sortBy)}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'last-modified' } })}
        />
      ),
      width: colWidths.col_2,
    },
    {
      sortButton: (
        <Button
          name='Status'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sortBy)}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'status' } })}
        />
      ),
      width: colWidths.col_3,
    },
  ];
};

const getRows = (datasets: Dataset[], location: string, navigate?: NavigateFunction): RowProps<ColumnProps>[] =>
  datasets.map(dataset => ({
    row: [
      { text: dataset.title?.nb ?? 'Empty', width: colWidths.col_1 },
      { text: getDate(dataset?._lastModified), width: colWidths.col_2 },
      { tag: getTag(dataset?.registrationStatus), width: colWidths.col_3 },
    ],
    onRowClick: navigate ? () => navigate(`${location}/${dataset.id}`) : () => {},
  }));

export default PopulatedTable;
