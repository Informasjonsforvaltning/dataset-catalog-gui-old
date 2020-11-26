import React, { FC, memo, useState } from 'react';

import { ListItemsPure } from '../../../components/list-items/list-items.component';
import { Dataset } from '../../../types';

import './dataset-items-list.scss';

interface Props {
  catalogId: string;
  datasetItems: Dataset[];
  searchSort: boolean;
}

export const DatasetItemsListPure: FC<Props> = ({
  catalogId,
  datasetItems,
  searchSort
}) => {
  const [sortField, setSortField] = useState('');
  const [sortType, setSortType] = useState('');

  const onSortField = (field, type) => {
    setSortField(field);
    setSortType(type);
  };

  return (
    <ListItemsPure
      catalogId={catalogId}
      items={datasetItems}
      sortField={searchSort && sortField === '' ? 'none' : sortField}
      sortType={sortType}
      onSortField={onSortField}
      prefixPath={`/catalogs/${catalogId}/datasets`}
    />
  );
};

export default memo(DatasetItemsListPure);
