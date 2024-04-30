import { createTheme } from '@mui/material'

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } })

export const theme = createTheme({
  palette: {
    primary: createColor('#333'),
    secondary: createColor('#777'),
  },
})