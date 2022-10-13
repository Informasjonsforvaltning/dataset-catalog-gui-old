import React, { FC, PropsWithChildren, useState } from "react";
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
  
  return (
      <SC.ExpansionPanel isExpanded={isExpanded}>
        <Header
          headerTitle={headerTitle}
          tag={tag}
          hasError={hasError}
          summary={summary}
          isExpanded={isExpanded}
          onClick={handleClick}
        />
        <>
          {isExpanded 
            ? <SC.ChildWrapper isExpanded={isExpanded}>
                {children}
              </SC.ChildWrapper>
            : <></> }
        </>
      </SC.ExpansionPanel>
  )
}

export default ExpansionPanel;
