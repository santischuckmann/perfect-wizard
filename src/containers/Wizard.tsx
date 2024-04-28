import { useState } from 'react'
import { Screen, Wizard as WizardType } from '../shared'
import { Element } from './Element'
import { Button, ThemeProvider, Typography, createTheme } from '@mui/material'
import { boolToString, key } from '../utils'

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } })

const theme = createTheme({
  palette: {
    primary: createColor('#eee'),
    secondary: createColor('#29345b')
  },
})

const getFieldNameInForm = (name: string, screenIndex: number) => `${screenIndex}-${name}`

const transformFieldsIntoForm = (screens: Screen[]) => {
  const form: Record<string, string> = {}
  for (let i = 0; i < screens.length; i++){
    for (let j = 0; j < screens[i].fields.length; j++){
      const currentField = screens[i].fields[j]

      form[getFieldNameInForm(currentField.name, i)] = ''
    }
  }

  return form
}

interface WizardProps {
  wizard: WizardType
}

export const Wizard = ({
  wizard
}: WizardProps) => {
  const [ currentScreen, setCurrentScreen ] = useState(0)
  const [ form, setForm ] = useState(transformFieldsIntoForm(wizard.screens))

  const screenCount = wizard.screens.length

  const changeForm = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='screen-container'>
        <div className='steps-container'>
          {screenCount > 0 && wizard.screens.map((screen, index) => {
            return (
              <div 
                key={key()} 
                className='step' 
                data-active={boolToString(currentScreen === index)}>
                <span>
                  {screen.stepName ?? `Paso ${index + 1}`}
                </span>
              </div>
            )
          })}
        </div>
        <Typography>{wizard.title}</Typography>
        <div className='screen-fields-container'>
          {screenCount > 0 && wizard.screens[currentScreen].fields.map((field) => {
            const fieldName = getFieldNameInForm(field.name, currentScreen)
            return (
              <Element
                key={fieldName} 
                {...field}
                options={field.options}
                value={form[fieldName]}
                onChange={(value: string) => changeForm(fieldName, value)}
              />
            )
          })}
        </div>
        <div className='button-container'>
          <Button 
            variant='outlined' 
            disabled={currentScreen === 0} 
            onClick={() => setCurrentScreen(prev => prev - 1)}>
          Previous page
          </Button>
          <Button 
            variant='outlined' 
            data-visible={boolToString(currentScreen === screenCount - 1)} 
            onClick={() => console.log(form)}>
          Finish
          </Button>
          <Button 
            variant='outlined' 
            disabled={currentScreen === screenCount - 1} 
            onClick={() => setCurrentScreen(prev => prev + 1)}>
          Next page
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}