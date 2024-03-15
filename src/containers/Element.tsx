import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField } from "@mui/material"

/* eslint-disable @typescript-eslint/no-explicit-any */
const FieldType = {
  Text: "TEXT",
  Options: "OPTIONS",
  Radio: "RADIO"
} as const

export type Option = {
  id: string;
  description: string;
}

interface ElementProps {
  label: string;
  placeholder: string;
  //fieldType: typeof FieldType[keyof typeof FieldType];
  fieldType: string;
  options: Option[]
  value: string | string[]
  onChange: (value: string) => void
}

export const Element = ({
  label,
  placeholder,
  fieldType,
  options,
  value,
  onChange
}: ElementProps) => {

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    event.stopPropagation()

    onChange(event.target.value)
  }

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
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {options.map(option => (
              <FormControlLabel value={option.id} control={<Radio />} label={option.description} />
            ))}
          </RadioGroup>
        </FormControl>
      )
  }
}