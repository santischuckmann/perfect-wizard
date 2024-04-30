export interface Wizard {
    wizardId: string;
    color: string;
    title: string;
    count: number;
    screens: Screen[];
  }
  
export const FieldType = {
  Text: 'TEXT',
  Options: 'OPTIONS',
  Radio: 'RADIO',
  Multiple: 'MULTIPLE'
} as const
  
  interface Field {
    fieldId: string
    type: typeof FieldType[keyof typeof FieldType]
    label: string;
    placeholder: string;
    options: Option[]; // Optional string array for TEXT fields, required for OPTIONS field
    name: string;
    description: Description | null;
    isIdentifier: boolean
  }
  
export interface Description {
    text: string;
    position: 'ABOVE' | 'BELOW'
}
  
export interface Screen {
  fields: Field[];
  stepName: string;
}
  
interface Option {
  id: string;
  description: string;
}

export interface Tenant {
  tenantId: string 
  name: string
}