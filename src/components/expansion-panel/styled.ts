import { Colour, theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';

interface Props {
  isExpanded: boolean;
}

const ExpansionPanel = styled.section<Props>`
  display: flex;
  flex-direction: column;

  ${({isExpanded}) =>
    !isExpanded && css`
      box-shadow: 0rem 0.3rem 0.5rem ${theme.colour(Colour.NEUTRAL, 'N60', 25)};
      border-radius: 0.4rem;`}
`;

const ChildWrapper = styled.div<Props>`
  padding: 3rem;

  ${({isExpanded}) =>
    isExpanded && css`
      border-top: solid ${theme.colour(Colour.BLUE, 'B30')} 1px;`}
`;

export default { ExpansionPanel, ChildWrapper };
