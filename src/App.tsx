import { useState } from 'react'
import { Typography } from '@mui/material'
import { Element } from './containers/Element'
import { objeto } from './mocks';
import { turnBoolIntoString } from './utils';

export interface MainObject {
  color: string;
  title: string;
  count: number;
  screens: Screen[];
}

export const FieldType = {
  Text: "TEXT",
  Options: "OPTIONS",
  Radio: "RADIO",
  Multiple: "MULTIPLE"
} as const

interface Field {
  fieldType: typeof FieldType[keyof typeof FieldType]
  label: string;
  placeholder: string;
  options: Option[]; // Optional string array for TEXT fields, required for OPTIONS field
  name: string;
  description: Description | null;
}

export interface Description {
  text: string;
  position: "ABOVE" | "BELOW"
}

interface Screen {
  fields: Field[];
  stepName: string;
}

interface Option {
  id: string;
  description: string;
}

const getFieldNameInForm = (name: string, screenIndex: number) => `${screenIndex}-${name}`

const transformFieldsIntoForm = (screens: Screen[]) => {
  const form: Record<string, string> = {};
  for (let i = 0; i < screens.length; i++){
    for (let j = 0; j < screens[i].fields.length; j++){
      const currentField = screens[i].fields[j];

      form[getFieldNameInForm(currentField.name, i)] = "";
    }
  }

  return form;
}


function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [ form, setForm ] = useState(transformFieldsIntoForm(objeto.screens));

  console.log(form)

  const changeForm = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='screen-container'>
      <div className='steps-container'>
        {objeto.count > 0 && objeto.screens.map((screen, index) => {
          return (
            <div className='step' data-active={turnBoolIntoString(currentScreen === index)}>
              <span>
                {screen.stepName ?? `Paso ${index + 1}`}
              </span>
            </div>
          )
        })}
      </div>
      <Typography>{objeto.title}</Typography>
      <div className='screen-fields-container'>
        {objeto.count > 0 && objeto.screens[currentScreen].fields.map((field) => {
          const fieldName = getFieldNameInForm(field.name, currentScreen)
          return (
            <Element 
              {...field}
              options={field.options}
              value={form[fieldName]}
              onChange={(value: string) => changeForm(fieldName, value)}
              />
          )
        })}
      </div>
      <div className='button-container'>
        <button disabled={currentScreen === 0} onClick={() => setCurrentScreen(prev => prev - 1)}>
          Previous page
        </button>
        <button data-visible={currentScreen === objeto.count - 1 ? 'true': 'false'} onClick={() => console.log(form)}>
          Finish
        </button>
        <button disabled={currentScreen === objeto.count - 1} onClick={() => setCurrentScreen(prev => prev + 1)}>
          Next page
        </button>
      </div>
    </div>
  )
}

export default App
