import { useState } from 'react'
import { Screen, Wizard as WizardType } from '../shared'
import { Element } from './Element'
import { Button } from '../components/Button'
import { Typography } from '@mui/material'
import { boolToString, key } from '../utils'
import { useIncremental, useMutate } from '../hooks'

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

type SendWizardBody = Record<string, unknown> & {
  wizardId: string
  identifier: string[]
  responseFields: {
    fieldId: string
    values: string[]
  }[]
}

const prepareForm = (wizard: WizardType, form: Record<string, string>) => {
  const response: SendWizardBody = {
    wizardId: wizard.wizardId,
    identifier: [],
    responseFields: [] 
  }

  for (let i = 0; i < wizard.screens.length; i++){
    for (let j = 0; j < wizard.screens[i].fields.length; j++){
      const currentField = wizard.screens[i].fields[j]
      const nameInForm = getFieldNameInForm(currentField.name, i)

      if (currentField.isIdentifier)
        response.identifier.push(form[nameInForm])

      response.responseFields.push({
        fieldId: currentField.fieldId,
        values: form[nameInForm].split(';')
      })
    }
  }

  return response
}

interface WizardProps {
  wizard: WizardType
}

export const Wizard = ({
  wizard
}: WizardProps) => {
  const currentScreen = useIncremental(0)
  const [ form, setForm ] = useState(transformFieldsIntoForm(wizard.screens))
  const sendWizard = useMutate()

  const screenCount = wizard.screens.length

  const changeForm = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSendWizard = async () => {
    await sendWizard.mutate({
      endpoint: '/client',
      data: prepareForm(wizard, form),
      method: 'POST'
    })
  }

  if (sendWizard.status === 'SUCCESS'){
    return (
      <div className='screen-container'>
        <Typography variant='h3'>
        The wizard has been completed succesfully! 
        Thanks for using Perfect Wizard.
        </Typography>
      </div>
    )
  }

  if (sendWizard.status === 'LOADING'){
    return (
      <div className='screen-container'>
        <Typography variant='h3'>
          Seeing if you made any mistake...
        </Typography>
      </div>
    )
  }

  console.log(sendWizard.status)

  return (
    <div className='screen-container'>
      <div className='steps-container'>
        {screenCount > 0 && wizard.screens.map((screen, index) => {
          return (
            <div 
              key={key()} 
              className='step' 
              data-active={boolToString(currentScreen.value === index)}>
              <span onClick={() => currentScreen.set(index)}>
                {screen.stepName ?? `Paso ${index + 1}`}
              </span>
            </div>
          )
        })}
      </div>
      <Typography variant='h3'>{wizard.title}</Typography>
      <div className='screen-fields-container'>
        {screenCount > 0 && wizard.screens[currentScreen.value].fields.map((field) => {
          const fieldName = getFieldNameInForm(field.name, currentScreen.value)
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
          sx={{ fontSize: '1.8rem' }}
          variant='outlined' 
          disabled={currentScreen.value === 0} 
          onClick={() => currentScreen.decrease()}>
          <Typography sx={{ fontSize: '1.5rem' }}>Previous Page</Typography>
        </Button>
        <Button 
          sx={{ fontSize: '1.8rem' }}
          variant='outlined' 
          data-visible={boolToString(currentScreen.value === screenCount - 1)} 
          onClick={handleSendWizard}>
          <Typography sx={{ fontSize: '1.5rem' }}>Finish</Typography>
        </Button>
        <Button 
          sx={{ fontSize: '1.8rem' }}
          variant='outlined' 
          disabled={currentScreen.value === screenCount - 1} 
          onClick={() => currentScreen.increase()}>
          <Typography sx={{ fontSize: '1.5rem' }}>Next Page</Typography>
        </Button>
      </div>
    </div>
  )
}