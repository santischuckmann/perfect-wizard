import { Box, Chip, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { Description, FieldType } from "../App";
import { turnBoolIntoString } from "../utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Option = {
  id: string;
  description: string;
}

interface ElementProps {
  label: string;
  placeholder: string;
  fieldType: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  description: Description | null;
}

const addToValue = (value: string, newMember: string) => {
  if (value.length === 0)
    return newMember;

  return value.concat(`;${newMember}`)
}

export const Element = ({
  label,
  placeholder,
  fieldType,
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

  return (
    <div className="element">
      {description != null && description.position === "ABOVE" && (
        <Typography className="description">{description.text}</Typography>
      )}
      {(function(){
        switch(fieldType){
          case FieldType.Text:
            return <TextField value={value} label={label} placeholder={placeholder} fullWidth onChange={handleChange}/>
          case FieldType.Options:
            return <TextField value={value} select label={label} placeholder={placeholder} fullWidth onChange={handleChange}>
              {options.map(option => (
                <MenuItem key={`${"distinctKey"}-${option.id}`} value={option.id}>
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
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  {options.map(option => (
                    <FormControlLabel 
                      key={`${"distinctKey"}-${option.id}`}
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
                      key={`${"distinctKey"}-${option.id}`}
                      label={option.description} 
                      onClick={() => handleChangeMultiple(option.id)} 
                      data-active={turnBoolIntoString(value.includes(option.id))}/>
                  ))}
                </div>
              </Box>
            )
          default:
            return null;
        }
      })()}
      {description != null && description.position === "BELOW" && (
        <Typography className="description">{description.text}</Typography>
      )}
    </div>
  )
}
