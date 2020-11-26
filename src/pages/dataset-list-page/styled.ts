import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import Common from '../../components/common/styled';

const DatasetListPage = styled(Common.Container)`
  margin-bottom: ${theme.spacing('S24')};
`;

const ListActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing('S16')};
`;

const CreateButton = styled.button`
  align-items: center;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(45, 55, 65, 0.3);
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  display: flex;
  font-size: ${theme.fontSize('FS14')};
  padding: ${theme.spacing('S10')} ${theme.spacing('S12')};

  & > svg {
    margin-right: ${theme.spacing('S4')};
  }
`;

const SearchBox = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1 1 0;
  flex-flow: row nowrap;
  position: relative;

  & > svg {
    font-size: ${theme.fontSize('FS20')};
    position: absolute;
    right: ${theme.spacing('S16')};
    top: 1.4rem;
  }
`;

const SearchField = styled.input`
  border: 1px solid;
  border-radius: 5px;
  flex: 1 1 0;
  margin-left: ${theme.spacing('S10')};
  outline: none;
  padding: 0 ${theme.spacing('S8')};
`;

export default {
  DatasetListPage,
  ListActions,
  CreateButton,
  SearchBox,
  SearchField
};
