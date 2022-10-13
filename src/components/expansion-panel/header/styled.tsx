import styled, { css } from 'styled-components';
import Icon from '../../icon';
import { theme, Colour } from '@fellesdatakatalog/theme'

interface Props {
  isExpanded? : boolean;
  showAlert : boolean;
}

const CollapseButton = styled.button<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-family: inherit;
  background-color: ${({ showAlert }) => 
    showAlert 
    ? css`${theme.colour(Colour.RED, 'R30')}`
    : css`${theme.colour(Colour.NEUTRAL, 'N0')}`
  };

  border: none;
  padding: 0rem 2.4rem;
  cursor: pointer;

  min-height: ${({ isExpanded }) => 
    isExpanded
    ? `7rem`
    : `9.3rem`
  };

  border-radius: 4px;

  :hover {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    h1, h2, h3, h4, h5, h6, p {
      color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }

    span {
      background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
      color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    }

    svg {
      & * {
        stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
      }
    }
  }

  transition: .4s;
  transition-property: color, background-color;
`;

const DivHeading = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  width: 100%;
`;

const ExpansionPanelTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
  flex: 1;
`;

const ExpansionPanelTitle = styled.h2<Props>`
  display: flex;
  justify-self: flex-start;
  align-items: baseline;

  font-weight: ${theme.fontWeight('FW700')};
  font-size: ${theme.fontSize('FS24')};
  line-height: 3.2rem;

  padding: 0px;
  margin: 0px;

  color: ${({showAlert}) =>
    showAlert 
    ? theme.colour(Colour.RED, 'R60')
    : theme.colour(Colour.BLUE, 'B60')
  };
`;

const ChevronIcon = styled(Icon)<Props>`
  align-self: center;
  & * {
    stroke: ${({showAlert}) => 
      showAlert 
      ? css`${theme.colour(Colour.RED, 'R60')}` 
      : css`${theme.colour(Colour.BLUE, 'B60')};`
    };
  }
`;

const AlertIcon = styled(Icon)`
  align-self: center;
  & * {
      stroke: ${theme.colour(Colour.RED, 'R60')};
  }
`;

const MandatoryTagWrapper = styled.div<Props>`
  span {
    background-color: ${({showAlert}) =>
      showAlert
      ? theme.colour(Colour.RED, 'R60')
      : theme.colour(Colour.BLUE, 'B60')
    };
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const RecommendedTagWrapper = styled.div<Props>`
  span {
    color: ${({showAlert}) =>
    showAlert
      ? theme.colour(Colour.RED, 'R60')
      : theme.colour(Colour.BLUE, 'B60')
    };
    background-color: ${({showAlert}) =>
      showAlert
      ? theme.colour(Colour.NEUTRAL, 'N0')
      : theme.colour(Colour.BLUE, 'B30')
    };
  }
`;

const ExpansionPanelSummary = styled.p<Props>`
  justify-self: center;
  align-self: flex-start;

  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};

  line-height: 2.4rem;

  color: ${({showAlert}) =>
    showAlert
    ? theme.colour(Colour.RED, 'R60')
    : theme.colour(Colour.BLUE, 'B60')
  };
`;

export default {
  CollapseButton,
  DivHeading,
  ExpansionPanelTitle,
  ExpansionPanelTitleContainer,
  ChevronIcon,
  AlertIcon,
  MandatoryTagWrapper,
  RecommendedTagWrapper,
  ExpansionPanelSummary,
};
