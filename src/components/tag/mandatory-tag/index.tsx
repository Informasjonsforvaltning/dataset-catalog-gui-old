import React from 'react';
import { localization } from '../../../utils/language/localization';
import SC from './styled';

const MandatoryTag = () => (
  <SC.MandatoryTag
    text={localization.dcatKeywords.mandatory}
  />
);

export default MandatoryTag;
