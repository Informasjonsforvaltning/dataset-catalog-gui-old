import React, { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../components/page-main';
import DatasetsPage from '../pages/datasets-page';
import { routes } from './routes';
import EditDatasetPage from '../pages/edit-dataset-page';
import { useGlobalDispatch } from '../context/global-context';
import { ACTION_TYPE } from '../context/actions';

const Router: FC = () => {
  const globalDispatch = useGlobalDispatch();

  useEffect(() => globalDispatch({ type: ACTION_TYPE.ADD_NAVIGATE, payload: { navigate: () => useNavigate() } }), []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Main />}>
          <Route index element={<DatasetsPage />} />
          <Route path={routes.dataset} element={<EditDatasetPage />} />
        </Route>
        <Route path='*' element={<h1>Routing Error ...</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
