import React, { FC } from "react";
import { localization } from "../../../utils/language/localization";
import MandatoryTag from "../../tag/mandatory-tag";
import RecommendedTag from "../../tag/recommended-tag";
import SC from './styled';

interface Props {
  headerTitle: string;
  tag?: 'mandatory' | 'recommended';
  hasError?: boolean;
  isExpanded: boolean;
  summary: string;
  headerId: string;
  controlledPanelId: string;
  onClick: Function;
}

const Header: FC<Props> = ({
  headerTitle,
  tag,
  hasError,
  isExpanded,
  summary,
  headerId,
  controlledPanelId,
  onClick : handleClick,
}) => {

  const showAlertHeader = Boolean(hasError && !isExpanded);
  
  const ChevronIcon = () => (
    isExpanded
      ? <SC.ChevronIcon
        name="chevronUpStroke"
        showAlert={ showAlertHeader } />
      : <SC.ChevronIcon
        name="chevronDownStroke"
        showAlert={ showAlertHeader } />
  )

  const AlertIcon = () => (
    hasError
    ? <SC.AlertIcon
      name="triangleExclamationPointStroke" />
    : <></>);

  const Tag = () => {
    switch (tag) {
      case 'mandatory':
        return (
          <SC.MandatoryTagWrapper showAlert={ showAlertHeader }>
            <MandatoryTag />
          </SC.MandatoryTagWrapper>
          )
      case 'recommended':
        return (
          <SC.RecommendedTagWrapper showAlert={ showAlertHeader }>
            <RecommendedTag />
          </SC.RecommendedTagWrapper>
        )
      default:
        return <></>;
    }
  }

  const Summary = () => (
    !isExpanded
    ? (
      <SC.ExpansionPanelSummary showAlert={showAlertHeader}>
        {hasError ? localization.sectionErrorMessage : summary}
      </SC.ExpansionPanelSummary>
    )
    : <></>
  )   

  return (
    <SC.CollapseButton
      type='button'
      isExpanded={isExpanded}
      showAlert={showAlertHeader}
      onClick={() => handleClick()}
      id={headerId}
      aria-expanded={isExpanded}
      aria-controls={controlledPanelId}
    >
      <>
        <SC.DivHeading>
          <SC.ExpansionPanelTitleContainer>
            <SC.ExpansionPanelTitle showAlert={showAlertHeader}>
              {headerTitle}
            </SC.ExpansionPanelTitle>
            <Tag />
          </SC.ExpansionPanelTitleContainer>
          <AlertIcon />
          <ChevronIcon />
        </SC.DivHeading>
        <Summary />
      </>
    </SC.CollapseButton>
    )
}

export default Header;
