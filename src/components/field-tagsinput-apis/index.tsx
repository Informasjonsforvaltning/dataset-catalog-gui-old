import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import type { WrappedFieldProps } from 'redux-form';
import { isEmpty } from 'lodash';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import {
  extractSuggestions,
  getDataserviceSuggestions
} from '../../services/api/search-api/suggestions';

interface Props extends WrappedFieldProps, TranslationsProps {}

const InputTagsAPIsField: FC<Props> = ({
  input: { value, onChange },
  translationsService
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [suggestions, setSuggestions] = useState<Tag[]>([]);

  const addTagToInput = (updates: any) =>
    onChange(
      (value || []).concat({
        uri: updates.id,
        description: {
          [translationsService.getLanguage()]: updates.name
        }
      })
    );

  const removeTagFromInput = (index: number) => {
    value.splice(index, 1);
    onChange(value);
  };

  const loadSuggestions = (q: string) =>
    getDataserviceSuggestions({ q })
      .then(extractSuggestions)
      .then(items =>
        setSuggestions(
          items.map(({ uri, title }: any) => ({
            id: uri,
            name: translationsService.translate(title)
          }))
        )
      )
      .catch(() => {});

  const handleDelete = (i: number) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
    removeTagFromInput(i);
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
    addTagToInput(tag);
  };

  useEffect(() => {
    if (value) {
      const accessServices = Array.isArray(value) ? value : [value];

      setTags(
        accessServices.filter(Boolean).map(({ uri, description }) => {
          const label = translationsService.translate(description);
          return {
            id: uri,
            name: isEmpty(label) ? uri : label
          };
        })
      );
    }
  }, []);

  return (
    <div className='pl-2'>
      <div className='d-flex align-items-center'>
        <ReactTags
          autofocus={false}
          placeholderText=''
          tags={tags}
          minQueryLength={1}
          suggestions={suggestions}
          onDelete={handleDelete}
          onAddition={handleAddition}
          onInput={loadSuggestions}
        />
      </div>
    </div>
  );
};

export default compose<FC>(memo, withTranslations)(InputTagsAPIsField);
