import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import Autosuggest from 'react-autosuggest';
import type { WrappedFieldProps } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import withKartverket, {
  Props as KartverketProps
} from '../../with-kartverket';

import Translation from '../../translation';
import TagsInputFieldArrayReadOnly from '../../fields/field-input-tags-objects-readonly/field-input-tags-objects-readonly.component';

import './styles.scss';

import type { AdministrativeUnit } from '../../../types';

import { CrossLightIcon } from '../../../fdk-icons/icons';

interface ExternalProps extends WrappedFieldProps {
  isReadOnly?: boolean;
  administrativeEnheter: AdministrativeUnit[];
  onUpdateAdministrativeUnits: (
    administrativeUnits: AdministrativeUnit[]
  ) => void;
}

interface Props extends ExternalProps, TranslationsProps, KartverketProps {}

const SpatialTagsInputField: FC<Props> = ({
  input,
  meta,
  isReadOnly,
  onUpdateAdministrativeUnits,
  translationsService,
  administrativeEnheter
}) => {
  const [value, setValue] = useState('');
  const [suggestionList, setSuggestionList] = useState<AdministrativeUnit[]>(
    []
  );

  const removePlace = (index: number) => () => {
    input.value.splice(index, 1);
    onUpdateAdministrativeUnits(input.value);
  };

  const onChange = (_: any, { newValue, method }: any) => {
    if (method === 'type') {
      setValue(newValue ?? '');
    }
  };

  const fetchSuggestions = ({ value: query }: any) => {
    const filteredSuggestions = administrativeEnheter.filter(suggestion =>
      suggestion?.name?.toLowerCase().includes(query)
    );
    setSuggestionList(filteredSuggestions);
  };

  const onSuggestionSelected = (_: any, { suggestion }: any) => {
    if (!input.value?.find(({ uri }: any) => uri === suggestion.uri)) {
      input.value.push({
        uri: suggestion.uri,
        prefLabel: { nb: suggestion.name }
      });

      onUpdateAdministrativeUnits(
        input.value.filter((v: any) => Object.entries(v).length > 0)
      );

      setValue('');
    }
  };

  const getSuggestionValue = ({ title }: any) =>
    translationsService.translate(title);

  const renderSuggestion = ({ name }: AdministrativeUnit) => (
    <div className='d-flex mb-3 suggestion'>
      <span>{name}</span>
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }: any) => (
    <div {...containerProps}>
      {children && children.props.items.length > 0 && (
        <div className='d-flex mb-3 react_autosuggest__suggestions-heading'>
          <span>
            <strong>
              <Translation id='administrativeUnit.name' />
            </strong>
          </span>
        </div>
      )}
      {children}
    </div>
  );

  const renderInputComponent = (inputProps: any) => (
    <input {...inputProps} className='form-control react-autosuggest__input' />
  );

  return isReadOnly ? (
    <TagsInputFieldArrayReadOnly input={input} meta={meta} />
  ) : (
    <div className='fdk-spatial'>
      <Autosuggest
        highlightFirstSuggestion
        suggestions={suggestionList}
        onSuggestionsFetchRequested={val => fetchSuggestions(val)}
        onSuggestionsClearRequested={() => setSuggestionList([])}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderInputComponent={renderInputComponent}
        inputProps={{
          value,
          type: 'text',
          onChange
        }}
      />
      {input.value?.map(({ uri }: any, index: number) => {
        const match = administrativeEnheter.find(item => item.uri === uri);
        return (
          <div
            key={`external-spatial-${uri}-${index}`}
            className='fdk-spatial-pill'
          >
            <span className='fdk-spatial-pill-label'>
              {match?.name ? match?.name : uri}
            </span>
            <i
              className='fa mr-2 remove-fdk-spatial'
              aria-label={
                Object.keys(match?.name ?? {}).length > 0 ? match?.name : uri
              }
              role='button'
              tabIndex={0}
              onClick={removePlace(index)}
              onKeyPress={removePlace(index)}
            >
              <CrossLightIcon />
            </i>
          </div>
        );
      })}
    </div>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations,
  withKartverket
)(SpatialTagsInputField);
