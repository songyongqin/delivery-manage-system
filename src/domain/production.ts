import request from 'utils/request'
import { getTemp, setTemp } from 'utils'
import combineNamespace from 'domainUtils/combineNamespace'

const PRODUCTION_CONFIG = "/config/production.json"

const PRODUCTION_STORAGE_NAMESPACE = combineNamespace("@@__production__@@")

const setProduction = (production: string) => {
  try {
    setTemp(PRODUCTION_STORAGE_NAMESPACE, production)
  } catch (e) {
    // console.error(e)
  }
}

export const getProduction = () => {
  try {

    const production = getTemp(PRODUCTION_STORAGE_NAMESPACE) || ""

    if (production.trim().length === 0) {
      throw new Error("Production have not config")
    }

    return production

  } catch (e) {
    // console.error(e)
  }
}

export const initProductionConfig = () => {
  return request(PRODUCTION_CONFIG, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  }).then(data => {
    setProduction((data as any).production)
    return data
  })
}

