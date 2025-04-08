import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import Autosuggest from 'react-autosuggest';
import TagsInput, { RenderTagProps } from 'react-tagsinput';
import type { WrappedFieldProps } from 'redux-form';

import { isEmpty } from 'lodash';
import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import {
  extractSuggestions,
  getConceptSuggestions
} from '../../../services/api/search-api/suggestions';

import Translation from '../../translation';

import './concept-tags-input-field.scss';
import '../../fields/field-input-tags/field-input-tags.scss';

interface ExternalProps {}

interface Props extends ExternalProps, TranslationsProps, WrappedFieldProps {}

const ConceptTagsInputField: FC<Props> = ({ input, translationsService }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let lastRequestId: any;

  const tagNodes = (input.value || []).map((item: any) => {
    const label = translationsService.translate(item.prefLabel);
    if (isEmpty(label)) {
      return item.uri;
    }
    return label;
  });

  const getSuggestionValue = (suggestion: any) =>
    translationsService.translate(suggestion?.title);

  const renderSuggestion = (suggestion: any) => (
    <div className='d-flex mb-3'>
      <span className='w-25'>
        <Translation object={suggestion?.title} />
      </span>
      <div className='w-75 ml-5 d-flex'>
        <span className='w-50'>
          <Translation object={suggestion?.description} />
        </span>
        <span className='w-50 ml-5'>
          <Translation
            object={
              suggestion?.organization?.prefLabel ||
              suggestion?.organization?.name
            }
          />
        </span>
      </div>
    </div>
  );

  const renderSuggestionContainer = (containerProps: any, children: any) => (
    <div {...containerProps}>
      <div className='d-flex mb-3 react_autosuggest__suggestions-heading'>
        <span className='w-25 first'>
          <strong>
            <Translation id='anbefaltTerm' />
          </strong>
        </span>
        <div className='w-75 ml-5 d-flex'>
          <span className='w-50'>
            <strong>
              <Translation id='definition' />
            </strong>
          </span>
          <span className='w-50 ml-5'>
            <strong>
              <Translation id='responsible' />
            </strong>
          </span>
        </div>
      </div>
      {children}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }: any) => {
    if (lastRequestId !== null) {
      clearTimeout(lastRequestId);
    }

    setIsLoading(true);

    getConceptSuggestions({
      q: value
    })
      .then(extractSuggestions)
      .then((suggestionsResponse: any) => {
        lastRequestId = setTimeout(() => {
          setSuggestions(suggestionsResponse);
          setIsLoading(false);
        }, 250);
      })
      .catch(() => {});
  };

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const autosuggestRenderInput = ({ addTag, onChange, ...props }: any) => {
    const handleOnChange = (e: any, { method }: any) => {
      if (method === 'enter') {
        e.preventDefault();
      } else {
        onChange(e);
      }
    };

    return (
      <>
        <Autosuggest
          suggestions={suggestions}
          shouldRenderSuggestions={(value: any) => value?.trim().length > 0}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSuggestionsContainer={({ containerProps, children }) =>
            renderSuggestionContainer(containerProps, children)
          }
          inputProps={{
            ...props,
            onChange: handleOnChange
          }}
          onSuggestionSelected={(_, { suggestion: { id, uri, title } }) =>
            addTag({ id, uri, prefLabel: title })
          }
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        />
        {isLoading && (
          <i
            className='fa fa-spinner fa-spin'
            style={{ position: 'absolute', right: '10px', top: '12px' }}
          />
        )}
      </>
    );
  };

  const handleChange = (
    _tags: any[],
    changed: any[],
    changedIndexes: number[]
  ) => {
    // if changedIndex er smaller than number of tags, then it must be deletion of the tag
    if (changedIndexes < input.value.length) {
      const newValue = input.value;
      newValue.splice(changedIndexes[0], 1);
      input.onChange(newValue);
    } else if (typeof changed?.[0] === 'object') {
      // only add if object was selected from droptown, not free text
      const newValue = input.value || [];
      newValue.push(changed[0]);
      input.onChange(newValue);
    }
  };

  const renderTag = (props: RenderTagProps) => {
    const {
      tag,
      key,
      disabled,
      onRemove,
      classNameRemove,
      getTagDisplayValue,
      ...other
    } = props;
    return (
      <span key={key} {...other}>
        {getTagDisplayValue(tag)}
        {!disabled && (
          <button
            type='button'
            className='fa-solid fa-xmark'
            onClick={() => onRemove(key)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                onRemove(key);
              }
            }}
          />
        )}
      </span>
    );
  };

  return (
    <div className='pl-2'>
      <div className='d-flex align-items-center'>
        <TagsInput
          value={tagNodes}
          className='fdk-reg-input-tags fdk-autosuggest'
          inputProps={{ placeholder: '' }}
          onChange={handleChange}
          renderInput={autosuggestRenderInput}
          renderTag={renderTag}
        />
      </div>
    </div>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(ConceptTagsInputField);
