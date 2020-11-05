import React, { FC, memo, useState } from 'react';

import { ListItemsPure } from '../../../components/list-items/list-items.component';
import type { Dataset } from '../../../types';

import './dataset-items-list.scss';

interface Props {
  catalogId: string;
  datasets: Dataset[];
  searchSort: boolean;
}

export const DatasetItemsListPure: FC<Props> = ({
  catalogId,
  datasets,
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
      items={datasets}
      sortField={searchSort && sortField === '' ? 'none' : sortField}
      sortType={sortType}
      onSortField={onSortField}
      prefixPath={`/catalogs/${catalogId}/datasets`}
    />
  );
};

export default memo(DatasetItemsListPure);
