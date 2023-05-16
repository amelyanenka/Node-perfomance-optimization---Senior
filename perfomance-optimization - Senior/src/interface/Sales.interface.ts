export interface AutocompleteOptions {
  uuid: string;
  name: string;
  groupBy?: string;
}

export interface SalesModelInterface {
  uuid: string;
  name: string;
}

export interface SalesModelsFilterInterface {
  uuid: string;
  name: string;
  salesModels: SalesModelInterface[];
}

export interface PaginationInterface {
  total?: number;
  pageCount?: number;
  perPage?: number;
}

export interface ColumnInterface {
  uuid?: string;
  name: string;
  label?: string | null;
  checked?: boolean;
  editable?: boolean;
  orderBy?: string;
  minWidth?: number;
  show?: boolean;
}

export interface MaterialInterface {
  uuid: string;
  name: string;
  timestamp?: string;

  label?: string;
  checked?: boolean;
  editable?: boolean;
  orderBy?: string;
  minWidth?: number;
}

export interface MaterialsLimitsInterface {
  uuid?: string;
  name: string;
  value: string;
}

export interface MaterialsInterface {
  name: string;
  wearLimitUuid?: string;
  materialUuid: string;
  editable: boolean;
  limits: MaterialsLimitsInterface[];
}

export interface WearLimitsInterface {
  platformUuid: string;
  platformName: string;
  salesModelUuid: string;
  salesModelName: string;
  componentPartUuid: string;
  componentPartNr: string;
  samplingPointUuid: string;
  samplingPointName: string;
  materials: MaterialsInterface[];
}

export interface WearLimitsPageInterface {
  material: MaterialInterface[];
  samplingPointsFilter: AutocompleteOptions[];
  productPlatformFilter: AutocompleteOptions[];
  salesModelsFilter: SalesModelsFilterInterface[];
  wearLimits: WearLimitsInterface[];
  pagination: PaginationInterface;
}
