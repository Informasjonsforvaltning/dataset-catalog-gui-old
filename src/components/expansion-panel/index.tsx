import React, { FC, PropsWithChildren, useState, useId } from "react";
import SC from './styled';

import Header from './header';

interface Props {
  headerTitle: string;
  tag?: 'mandatory' | 'recommended';
  hasError: boolean;
  summary: string;
  initiallyExpanded: boolean;
}

const ExpansionPanel: FC<PropsWithChildren<Props>> = ({
  headerTitle,
  tag,
  hasError = false,
  initiallyExpanded = false,
  summary,
  children
}) => {

  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  }

  const handleClick = () => {
    toggleExpansion();
  }

  const headerId = useId();
  const panelId = useId();
  
  return (
      <SC.ExpansionPanel
        isExpanded={isExpanded}
        aria-labelledBy={headerId}>
        <Header
          headerTitle={headerTitle}
          tag={tag}
          hasError={hasError}
          summary={summary}
          isExpanded={isExpanded}
          headerId={headerId}
          controlledPanelId={panelId}
          onClick={handleClick}
        />
        <>
          {isExpanded 
            ? <SC.ChildWrapper
              id={panelId}
              isExpanded={isExpanded}
              >
                {children}
              </SC.ChildWrapper>
            : <></> }
        </>
      </SC.ExpansionPanel>
  )
}

export default ExpansionPanel;
