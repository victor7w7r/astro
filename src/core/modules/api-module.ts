import { create } from 'apisauce'

export const timeout = 5000

export const api = create({
  baseURL: environment.PUBLIC_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
