export interface Wizard {
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
    type: typeof FieldType[keyof typeof FieldType]
    label: string;
    placeholder: string;
    options: Option[]; // Optional string array for TEXT fields, required for OPTIONS field
    name: string;
    description: Description | null;
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