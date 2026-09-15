import { create } from 'apisauce'

export const timeout = 5000

export const api = create({
  baseURL: '', //`${environment.PROTOCOL}${environment.HOST}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
