import styled from 'styled-components';

const FieldBox = styled.div`
  margin: 5px 0px;
  display: flex;
`;

const Border = styled.div`
  border: 1px solid rgb(45, 55, 65);
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin-right: 2px;
`;

const MoveButtons = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 4px;
  width: 80px;
`;

const FieldText = styled.p`
  color: #6c737a;
  width: 350px;
`;

const DeleteButtonText = styled.p`
  color: #803353;
  text-decoration-line: underline;
  text-decoration-style: dotted;
  margin-left: 8px;
`;

export default {
  FieldBox,
  FieldText,
  Border,
  DeleteButtonText,
  MoveButtons
};
