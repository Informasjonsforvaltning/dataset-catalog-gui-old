import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps,
  Language
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import SelectField from '../fields/field-select/field-select.component';
import MultilingualField from '../multilingual-field/multilingual-field.component';
import InputField from '../fields/field-input/field-input.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';

import { datasetFormPatchThunk } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

import {
  CircleMinusInlineIcon,
  CirclePlusInlineIcon
} from '../../fdk-icons/icons';

interface ExternalProps {
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
  datasetItem: any;
  isReadOnly: boolean;
  onInputChange: () => void;
  referenceTypesItems: any[];
  referenceDatasetsItems: any[];
  referenceDatasetSeriesItems: any[];
  languages: any[];
}

interface Props extends ExternalProps, TranslationsProps {}

// Se på denne senere...
const renderReadOnly = ({
  input,
  referenceDatasetsItems,
  referenceDatasetSeriesItems,
  translationsService
}: any) => {
  const { referenceType } = input.value || {};
  const referenceTypeText = translationsService.translate(
    referenceType && referenceType.prefLabel
  );

  const uri = input.value && input.value.source && input.value.source.uri;

  const dataset = referenceDatasetsItems.find((i: any) => i.uri === uri);
  const datasetSeries = referenceDatasetSeriesItems.find(
    (i: any) => i.uri === uri
  );

  const datasetTitle = translationsService.translate(dataset?.title);
  const DatasetSeriesTitle = translationsService.translate(
    datasetSeries?.title
  );

  return (
    <div className='pl-3'>
      {referenceTypeText} {datasetTitle} {DatasetSeriesTitle}
    </div>
  );
};

const renderReferenceFields = ({
  item,
  index,
  fields,
  onDeleteFieldAtIndex,
  referenceTypesItems,
  referenceDatasetsItems,
  isReadOnly,
  onInputChange,
  translationsService
}: any) => (
  <div key={item}>
    {isReadOnly && (
      <Field
        name={`${item}`}
        component={renderReadOnly}
        referenceDatasetsItems={referenceDatasetsItems}
        translationsService={translationsService}
      />
    )}
    {!isReadOnly && (
      <div className='d-flex mb-2' key={index}>
        <div className='w-50'>
          <Field
            name={`${item}.referenceType`}
            component={SelectField}
            labelKey='label'
            items={referenceTypesItems}
            placeholder='Velg type'
          />
        </div>
        <div className='w-50'>
          <Field
            name={`${item}.source`} // When nested in FormSection, returns the name prop prefixed with the FormSection name. Otherwise, returns the name prop that you passed in.
            component={SelectField}
            items={referenceDatasetsItems.map(
              ({ uri, title, publisher }: any) => ({
                uri,
                prefLabel: {
                  // Dette er alternativene i nedtrekkslisten
                  [Language.NB]: `${translationsService.translate(
                    title
                  )} (Eier: ${
                    translationsService.translate(publisher?.prefLabel) ||
                    publisher?.name
                  })`
                }
              })
            )}
            onInputChange={onInputChange} // A function to call when the form field is changed. It expects to either receive the React SyntheticEvent or the new value of the field.
            placeholder='Søk på datasett'
          />
        </div>
        <div className='d-flex align-items-end'>
          <button
            className='fdk-btn-no-border'
            type='button'
            title='Remove reference'
            onClick={() => onDeleteFieldAtIndex(fields, index)}
          >
            <CircleMinusInlineIcon />
          </button>
        </div>
      </div>
    )}
  </div>
);

const renderReference = ({
  fields,
  onDeleteFieldAtIndex,
  referenceTypesItems,
  referenceDatasetsItems,
  isReadOnly,
  onInputChange,
  translationsService
}: any) => (
  <div>
    {fields?.map((item: any, index: number) =>
      renderReferenceFields({
        item,
        index,
        fields,
        referenceTypesItems,
        referenceDatasetsItems,
        onDeleteFieldAtIndex,
        isReadOnly,
        onInputChange,
        translationsService
      })
    )}
    {!isReadOnly && (
      <button
        className='fdk-btn-no-border'
        type='button'
        onClick={() => fields.push({})}
      >
        <CirclePlusInlineIcon />
        <Translation id='schema.reference.addReferenceLabel' />
      </button>
    )}
  </div>
);

// Dataset series

// const getDatasetSeries() //hente listen over alle dataset. Denne må kjøre i starten om den ikke er kjørt fra før.

const renderReferenceToDatasetSeriesFields = ({
  item,
  index,
  fields,
  onDeleteFieldAtIndex,
  referenceDatasetSeriesItems,
  isReadOnly,
  onInputChange,
  translationsService
}: any) => (
  <div key={item}>
    {isReadOnly && (
      <Field
        name={`${item}`}
        component={renderReadOnly}
        referenceDatasetSeriesItems={referenceDatasetSeriesItems}
        translationsService={translationsService}
      />
    )}
    {!isReadOnly && (
      <div className='d-flex mb-2' key={index}>
        <div className='w-50'>
          <Field
            name={`${item}.source`} // Usikker på hva som skal være her //When nested in FormSection, returns the name prop prefixed with the FormSection name. Otherwise, returns the name prop that you passed in.
            component={SelectField}
            items={
              referenceDatasetSeriesItems &&
              referenceDatasetSeriesItems.map(
                ({ uri, title, publisher }: any) => ({
                  uri,
                  prefLabel: {
                    // Dette er alternativene i nedtrekkslisten
                    [Language.NB]: `${translationsService.translate(
                      title
                    )} (Eier: ${
                      translationsService.translate(publisher?.prefLabel) ||
                      publisher?.name
                    })`
                  }
                })
              )
            }
            onInputChange={onInputChange} // A function to call when the form field is changed. It expects to either receive the React SyntheticEvent or the new value of the field.
            placeholder='Søk på datasett serie'
          />
        </div>
        <div className='d-flex align-items-end'>
          <button
            className='fdk-btn-no-border'
            type='button'
            title='Remove reference'
            onClick={() => onDeleteFieldAtIndex(fields, index)}
          >
            <CircleMinusInlineIcon />
          </button>
        </div>
      </div>
    )}
  </div>
);

const renderReferenceDatasetSeries = ({
  fields, // Feltene -> indexer på felter tror jeg. Tom til å begynne med?
  onDeleteFieldAtIndex,
  referenceDatasetSeriesItems, // Innholdet i nedtrekkslisten
  isReadOnly,
  onInputChange, // Valgt verdi i nedtrekkslisten
  translationsService
}: any) => (
  <div>
    {fields?.map(
      (
        item: any,
        index: number // For hvert "felt", lag <Field/> komponent
      ) =>
        renderReferenceToDatasetSeriesFields({
          item, // Hva er item -> kommer fra fields.
          index, // Nummer på feltet -> brukt til å slette
          fields,
          onDeleteFieldAtIndex,
          isReadOnly,
          onInputChange,
          translationsService,
          referenceDatasetSeriesItems // Innholdet i nedtrekkslisten
        })
    )}
    {!isReadOnly && (
      <button
        className='fdk-btn-no-border'
        type='button'
        onClick={() => fields.push({})} // Knapp for å legge til felt -> ingen felter til å begynne med. Legger til tomt objekt, men som kan innholde item og index.
      >
        <CirclePlusInlineIcon />
        <Translation id='schema.reference.addReferenceLabel' />
      </button>
    )}
  </div>
);

const renderRelationFields = ({
  field,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly
}: any) => (
  <div key={field}>
    {isReadOnly && (
      <div className='mb-4'>
        <MultilingualField
          name={`${field}.prefLabel`} // tror dette er en slags key/id, corresponding to a value in the form values,
          // When nested in FormSection, returns the name prop prefixed with the FormSection name. Otherwise, returns the name prop that you passed in.
          component={InputFieldReadonly} // corresponding to a default JSX element. Component som er input, sannsynligvis en stateless function i dette tilfellet
          languages={languages}
          label='Title'
          showLabel
        />
        <div className='mt-4'>
          <Field
            name={`${field}.uri`}
            component={InputFieldReadonly}
            label='Lenke'
            showLabel
          />
        </div>
      </div>
    )}
    {!isReadOnly && (
      <div className='mb-4' key={field}>
        <MultilingualField
          name={`${field}.prefLabel`}
          component={InputField}
          languages={languages}
          label='Title'
          showLabel
        />
        <div className='mt-4'>
          <Field
            name={`${field}.uri`}
            component={InputField}
            label='Lenke'
            showLabel
          />
        </div>
        <div className='d-flex align-items-end my-2 mb-4'>
          <button
            className='fdk-btn-no-border'
            type='button'
            title='Remove reference'
            onClick={onDeleteFieldAtIndex}
          >
            <CircleMinusInlineIcon />
            <Translation id='schema.reference.removeRelationLabel' />
          </button>
        </div>
      </div>
    )}
  </div>
);

const renderRelations = ({
  fields,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly
}: any) => (
  <div>
    {fields.map((field: any, index: number) =>
      renderRelationFields({
        field,
        languages,
        onDeleteFieldAtIndex: () => onDeleteFieldAtIndex(fields, index),
        isReadOnly
      })
    )}
    {!isReadOnly && (
      <button
        className='fdk-btn-no-border'
        type='button'
        onClick={() => fields.push({})}
      >
        <CirclePlusInlineIcon />
        <Translation id='schema.reference.addRelationLabel' />
      </button>
    )}
  </div>
);

const FormReference: FC<Props> = ({
  dispatch,
  catalogId,
  datasetId,
  datasetItem,
  languages,
  isReadOnly,
  onInputChange,
  referenceTypesItems,
  referenceDatasetsItems,
  referenceDatasetSeriesItems,
  translationsService
}) => {
  const deleteFieldAtIndex = (fields: any, index: number) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({
      catalogId,
      datasetId,
      datasetItem,
      patch
    });
    dispatch(thunk);
  };

  // With Field, you give a name, referring to the location of the field in the Redux state,
  // and a component to render the field, which is given the props to connect the field to the Redux state.
  // With FieldArray, you provide a name just like with Field, but the component
  // you give to FieldArray will be given a set of props to query, update, and iterate through the field array.

  return referenceTypesItems && referenceDatasetsItems ? ( // Spørsmål: Hva skjer dersom det ikke er noen serier?
    <form>
      <div className='form-group'>
        <Helptext
          title={translationsService.translate(
            'schema.reference.helptext.reference'
          )}
          term='Dataset_relation'
          recommended // Anbefalt tag'en
        />
        <FieldArray
          name='references'
          component={renderReference} // Liste med <Field/> (og add knapp)
          referenceTypesItems={referenceTypesItems} // Innhold i nedtrekksliste
          referenceDatasetsItems={referenceDatasetsItems} // Innholdet i nedtrekkslisten
          onDeleteFieldAtIndex={deleteFieldAtIndex} // Når man sletter et felt (regner jeg med) - ikke brukt her
          isReadOnly={isReadOnly}
          onInputChange={onInputChange} // Når man enderhvilket felt som er valgt blir det lagret i references i name.
          translationsService={translationsService} // Oversetter i guess
          // test2={console.log("I den fungerende listen:", referenceDatasetsItems)}
        />
      </div>

      <div className='form-group'>
        <Helptext
          title='Her kommer datasett serie'
          term='Dataset_relation' // Hva gjør denne?
          recommended // Anbefalt tag
        />
        {/* DatasetSeries */}
        <FieldArray
          name='inSeries' // Corresponding to a value in the form values --> se i network (Navn på variabel der det man velger blir lagret?)
          component={renderReferenceDatasetSeries} // A Component or stateless function to render the field array. Array med <Field/>
          referenceDatasetSeriesItems={referenceDatasetSeriesItems} // Innholdet i nedtrekkslisten
          onDeleteFieldAtIndex={deleteFieldAtIndex} // Slett felt
          isReadOnly={isReadOnly}
          onInputChange={onInputChange} // Valgt verdi endret
          translationsService={translationsService}
          // test={console.log("I min liste:", referenceDatasetSeriesItems)}
        />
      </div>

      <div className='form-group'>
        <Helptext
          title={translationsService.translate(
            'schema.reference.helptext.relatedResources'
          )}
          term='Dataset_relation_resource'
          recommended
        />
        <FieldArray
          name='relations'
          component={renderRelations}
          languages={languages}
          onDeleteFieldAtIndex={deleteFieldAtIndex}
          isReadOnly={isReadOnly}
        />
      </div>
    </form>
  ) : null;
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormReference);
