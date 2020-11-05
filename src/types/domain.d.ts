import { RegistrationStatus, SearchType } from './enums';

export interface MediaType {
  name: string;
  code: string;
}

export interface EnhetsregisteretOrganization {
  organisasjonsnummer: string;
  navn: string;
}

export interface SearchResult {
  datasets: Dataset[];
  catalogs: Catalog[];
}

export interface SearchRequest {
  searchType: SearchType;
  catalogIDs: string[];
  query: string;
}

export interface Catalog {
  id: string;
  uri: string;
  title: Map<string, string>;
  description: Map<string, string>;
  publisher: Publisher;
  issued: Date;
  modified: Date;
  language: string;
  dataset: Dataset[];
}

export interface Dataset {
  id: string;
  catalogId: string;
  lastModified: Date;
  registrationStatus: RegistrationStatus;
  concepts: Concept[];
  subjects: Subject[];
  uri: string;
  originalUri: string;
  source: string;
  title: Map<string, string>;
  description: Map<string, string>;
  descriptionFormatted: Map<string, string>;
  objective: Map<string, string>;
  contactPoint: Contact[];
  keyword: Map<string, string>[];
  publisher: Publisher;
  issued: Date;
  modified: Date;
  language: SkosCode[];
  landingPage: string[];
  theme: DataTheme[];
  distribution: Distribution[];
  sample: Distribution[];
  temporal: PeriodOfTime[];
  spatial: SkosCode[];
  accessRights: SkosCode;
  accessRightsComment: string[];
  legalBasisForRestriction: SkosConcept[];
  legalBasisForProcessing: SkosConcept[];
  legalBasisForAccess: SkosConcept[];
  hasAccuracyAnnotation: QualityAnnotation;
  hasCompletenessAnnotation: QualityAnnotation;
  hasCurrentnessAnnotation: QualityAnnotation;
  hasAvailabilityAnnotation: QualityAnnotation;
  hasRelevanceAnnotation: QualityAnnotation;
  references: Reference[];
  relations: SkosConcept[];
  provenance: SkosCode;
  identifier: string[];
  page: string[];
  accrualPeriodicity: SkosCode;
  subject: Subject[];
  admsIdentifier: string[];
  conformsTo: SkosConcept[];
  informationModel: SkosConcept[];
  qualifiedAttributions: Set<string>;
  type: string;
  catalog: Catalog;
}

export interface Concept {
  id: string;
  uri: string;
  identifier: string;
  application: Map<string, string>[];
  definition: Definition;
  alternativeDefinition: Definition;
  subject: Map<string, string>;
  prefLabel: Map<string, string>;
  altLabel: Map<string, string>[];
  hiddenLabel: Map<string, string>[];
  contactPoint: ContactPoint;
  example: Map<string, string>;
}

export interface ContactPoint {
  email: string;
  telephone: string;
}

export interface Definition {
  text: Map<string, string>;
  remark: Map<string, string>;
  source: Source;
  sourceRelationship: string;
  range: TextAndURI;
  sources: TextAndURI[];
  lastUpdated: number;
}

export interface Source {
  uri: string;
  prefLabel: Map<string, string>;
}

export interface TextAndURI {
  text: Map<string, string>;
  uri: string;
}

export interface Contact {
  id: string;
  uri: string;
  fullname: string;
  email: string;
  organizationName: string;
  organizationUnit: string;
  hasURL: string;
  hasTelephone: string;
}

export interface Publisher {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
  prefLabel: Map<string, string>;
}

export interface SkosCode {
  uri: string;
  code: string;
  prefLabel: Map<string, string>;
}

export interface DataTheme {
  id: string;
  uri: string;
  code: string;
  pickedDate: string;
  startUse: string;
  title: Map<string, string>;
  conceptSchema: ConceptSchema;
  numberOfHits: number;
}

export interface Distribution {
  id: string;
  uri: string;
  title: Map<string, string>;
  description: Map<string, string>;
  downloadURL: string[];
  accessURL: string[];
  license: SkosConcept;
  openLicense: boolean;
  conformsTo: SkosConcept[];
  page: SkosConcept[];
  format: string[];
  accessService: DataDistributionService[];
}

export interface PeriodOfTime {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface SkosConcept {
  uri: string;
  prefLabel: Map<string, string>;
  extraType: string;
}

export interface QualityAnnotation {
  inDimension: string;
  motivatedBy: string;
  hasBody: Map<string, string>;
}

export interface Reference {
  referenceType: SkosCode;
}

export interface ConceptSchema {
  id: string;
  title: Map<string, string>;
  versioninfo: string;
  versionnumber: string;
}

export interface DataDistributionService {
  id: string;
  uri: string;
  title: Map<string, string>;
  publisher: Publisher;
  description: Map<string, string>;
  endpointDescription: SkosConcept[];
}

export interface Subject {
  uri: string;
  definition: Map<string, string>;
  prefLabel: Map<string, string>;
  id: string;
  identifier: string;
  altLabel: Map<string, string>[];
  note: Map<string, string>;
  source: string;
  creator: Publisher;
  inScheme: string[];
  datasets: Dataset[];
}
