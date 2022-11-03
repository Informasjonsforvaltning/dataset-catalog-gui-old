import styled from 'styled-components';
import Tag from '..';
import { theme, Colour } from '@fellesdatakatalog/theme';

const MandatoryTag = styled(Tag)`
  background-color: ${theme.colour(Colour.BLUE, 'B60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

export default { MandatoryTag };
