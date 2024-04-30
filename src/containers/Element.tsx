import { Box, Chip, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { boolToString, key } from '../utils'
import { Description, FieldType } from '../shared'
import { Field } from '../components/Field'

export type Option = {
  id: string;
  description: string;
}

interface ElementProps {
  label: string;
  placeholder: string;
  type: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  description: Description | null;
}

const addToValue = (value: string, newMember: string) => {
  if (value.length === 0)
    return newMember

  return value.concat(`;${newMember}`)
}

export const Element = ({
  label,
  placeholder,
  type: fieldType,
  options,
  value,
  onChange,
  description
}: ElementProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    event.stopPropagation()

    onChange(event.target.value)
  }

  const handleChangeMultiple = (id: string) => {
    if (!value.includes(id)){
      onChange(addToValue(value, id))
      return
    }

    const arrayOfValuesFiltered = value.split(';').filter(v => v !== id)
    onChange(arrayOfValuesFiltered.join(';'))
  }

  const identifier = label + key()

  return (
    <Field 
      className="element" 
      description={description}
      label={
        <Typography component='label' sx={{ fontSize: '2rem' }} htmlFor={identifier}>{label}</Typography>
      }>
      {(function(){
        switch(fieldType){
        case FieldType.Text:
          return <TextField 
            inputProps={{ style: { fontSize: '1.8rem' } }}
            id={identifier}
            value={value} 
            placeholder={placeholder} 
            fullWidth 
            onChange={handleChange}/>
        case FieldType.Options:
          return <TextField 
            SelectProps={{
              sx: {
                fontSize: '1.8rem'
              }
            }}
            value={value} 
            select 
            placeholder={placeholder} 
            fullWidth 
            onChange={handleChange}>
            {options.map(option => (
              <MenuItem sx={{ fontSize: '1.8rem' }} key={`${'distinctKey'}-${option.id}`} value={option.id}>
                {option.description}
              </MenuItem> 
            ))}
          </TextField>
        case FieldType.Radio:
          return (
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
              <RadioGroup
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                {options.map(option => (
                  <FormControlLabel 
                    key={`${'distinctKey'}-${option.id}`}
                    value={option.id} 
                    control={<Radio />} 
                    label={option.description} />
                ))}
              </RadioGroup>
            </FormControl>
          )
        case FieldType.Multiple:
          return (
            <Box display='flex' gap='16px' alignItems='center'>
              <FormLabel>{label}</FormLabel>
              <div className="multiple-container">
                {options.map(option => (
                  <Chip 
                    key={`${'distinctKey'}-${option.id}`}
                    label={option.description} 
                    onClick={() => handleChangeMultiple(option.id)} 
                    data-active={boolToString(value.includes(option.id))}/>
                ))}
              </div>
            </Box>
          )
        default:
          return null
        }
      })()}
    </Field>
  )
}
