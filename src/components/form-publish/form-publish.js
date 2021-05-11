import { compose } from 'redux';
import FormPublishPure from './form-publish-pure.component';
import { formPublishConnector } from './form-publish-connector';
import { formPublishConfigurer } from './form-publish-configurer';

export const FormPublish = compose(
  formPublishConnector,
  formPublishConfigurer
)(FormPublishPure);
