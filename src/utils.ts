import { v4 as uuidv4 } from 'uuid'

export const boolToString = (condition: boolean) => condition ? 'true' : 'false'

export const key = () => uuidv4()
