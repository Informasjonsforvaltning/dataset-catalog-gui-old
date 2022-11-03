import styled from 'styled-components';
import Tag from '..';
import { theme, Colour } from '@fellesdatakatalog/theme';


const RecommendedTag = styled(Tag)`
  background-color: ${theme.colour(Colour.BLUE, 'B30')};
  color: ${theme.colour(Colour.BLUE, 'B60')};
`;

export default { RecommendedTag };
