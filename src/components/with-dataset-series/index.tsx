import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Dataset } from '../../types';

export interface Props {
  datasetSeries: Dataset[];
  datasetSeriesActions: typeof actions;
  isLoadingDatasetSeries: boolean;
}

const withDatasetSeries = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    datasetSeries:
      state.DatasetSeriesReducer.get('datasetSeries')?.toJS() ?? [],
    isLoadingDatasetSeries: state.DatasetSeriesReducer.get(
      'isLoadingDatasetSeries'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetSeriesActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withDatasetSeries;
