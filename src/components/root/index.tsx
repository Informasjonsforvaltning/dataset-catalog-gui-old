import React, { memo, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';

import SC from './styled';

interface Props extends PropsWithChildren {}

const Root: FC<Props> = ({ children }) => <SC.Root>{children}</SC.Root>;

export default compose<FC<Props>>(memo)(Root);
