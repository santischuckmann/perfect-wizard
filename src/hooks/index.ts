import { useCallback, useEffect, useState } from 'react'
import { request } from '../libraries/axios-lib'

export const OperationStatus = {
  Idle: 'IDLE',
  Loading: 'LOADING',
  Error: 'ERROR',
  Success: 'SUCCESS'
} as const

export const useDataFetching = <T>(baseEndpoint: string, onDemand = false) => {
  const [ data, setData ] = useState<T | null>(null)
  const [ status, setStatus ] = useState<typeof OperationStatus[keyof typeof OperationStatus]>(OperationStatus.Idle)

  const fetchData = useCallback(async (endpoint = '') => {
    setStatus(OperationStatus.Loading)

    try {
      const response = await request({ method: 'GET', endpoint: baseEndpoint + endpoint })
      setData(response)
      setStatus(OperationStatus.Success)
    } catch (err) {
      setStatus(OperationStatus.Error)
    }
  }, [])

  useEffect(() => {
    if (!onDemand)
      fetchData()
  }, [ fetchData ])

  return { data, status, fetch: fetchData }
}


export const useMutate = <T>() => {
  const [ data, setData ] = useState<T | null>(null)
  const [ status, setStatus ] = useState<typeof OperationStatus[keyof typeof OperationStatus]>(OperationStatus.Idle)

  const mutate = useCallback(async ({ endpoint, data, method } : { endpoint: string, data: Record<string, unknown> | undefined, method: 'POST' | 'PUT'}) => {
    setStatus(OperationStatus.Loading)

    try {
      const response = await request({ method, endpoint, data })
      setData(response)
      setStatus(OperationStatus.Success)
    } catch (err) {
      setStatus(OperationStatus.Error)
    }
  }, [])

  return { mutate, data, status }
}