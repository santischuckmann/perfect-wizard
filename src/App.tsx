import { useState } from 'react'
import { Typography } from '@mui/material'
import { Element } from './containers/Element'

interface MainObject {
  color: string;
  title: string;
  count: number;
  screens: Screen[];
}

interface Field {
  fieldType: "TEXT" | "OPTIONS" | "RADIO";
  label: string;
  placeholder: string;
  options: Option[]; // Optional string array for TEXT fields, required for OPTIONS field
  multiple: boolean;
  name: string;
}

interface Screen {
  fields: Field[];
  stepName: string;
}

interface Option {
  id: string;
  description: string;
}


const objeto: MainObject = {
  "color": "white",
  "title": "Clinica Los Santis",
  "count": 2,
  "screens": [
    {
      "stepName": "Datos personales",
      "fields": [
        {
          "name": "name",
          "fieldType": "TEXT",
          "label": "Nombre",
          "placeholder": "John Doe",
          "options": [],
          "multiple": true,
        },
        {
          "name": "email",
          "fieldType": "TEXT",
          "label": "Email",
          "placeholder": "johndoe@gmail.com",
          "options": [],
          "multiple": true,
        }
      ]
    },
    {
      "stepName": "Mas datos",
      "fields": [
        {
          "name": "yearsOfExperience",
          "fieldType": "OPTIONS",
          "label": "años de experiencia",
          "placeholder": "johndoe@gmail.com",
          "multiple": true,
          "options": [
            {
              "id": "1",
              "description": "No tengo experiencia"
            },
            {
              "id": "2",
              "description": "1 a 3 de experiencia"
            }
          ]
        },
        {
          "name": "sex",
          "fieldType": "RADIO",
          "label": "genero",
          "placeholder": "",
          "multiple": true,
          "options": [
            {
              "id": "mujer",
              "description": "Mujercita"
            },
            {
              "id": "hombre",
              "description": "hombrecito"
            }
          ]
        },
      ]
    }
  ]
}

const getFieldNameInForm = (name: string, screenIndex: number) => `${screenIndex}-${name}`

const transformFieldsIntoForm = (screens: Screen[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const changeForm = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='screen-container'>
      <div className='steps-container'>
        {objeto.count > 0 && objeto.screens.map((screen, index) => {
          return (
            <div className='step'>
              <span>
                Paso {index + 1}
              </span>
              <span>
                {screen.stepName}
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
        <button disabled={currentScreen === objeto.count - 1} onClick={() => setCurrentScreen(prev => prev + 1)}>
          Next page
        </button>
      </div>
    </div>
  )
}

export default App
