import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExpansionPanel from '.';
import { localization } from '../../utils/language/localization';

export default {
  title: 'ExpansionPanel',
  component: ExpansionPanel,
} as ComponentMeta<typeof ExpansionPanel>;


const Template: ComponentStory<typeof ExpansionPanel> = (args) => <ExpansionPanel {...args} />;

const testChildComponent = <h3>Child components are shown here</h3>

export const ExpansionPanelMandatory = Template.bind({});
ExpansionPanelMandatory.args = {
  headerTitle: localization.sectionTitle['titleAndDescription'],
  tag: 'mandatory',
  summary: 'Dette er sammendraget fra innholdet i denne boksen.',
  hasError: false,
  children: testChildComponent,
};

export const ExpansionPanelRecommended = Template.bind({});
ExpansionPanelRecommended.args = {
  headerTitle: localization.sectionTitle['conceptAndSearchTerms'],
  tag: 'recommended',
  initiallyExpanded: true,
  hasError: true,
  summary: 'Dette er sammendraget fra innholdet i denne boksen.',
  children: testChildComponent,
};
