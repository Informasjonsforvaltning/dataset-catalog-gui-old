import React from 'react';
import Table from '../../components/table';
import { useTableContext } from '../../context/table-context';

const PopulatedTable = () => {
  const tableContext = useTableContext();
  return <Table rows={tableContext.rows} cols={tableContext.headerColumns} />;
};

export default PopulatedTable;
