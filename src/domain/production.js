import { getTemp } from 'utils/tools'

const PRODUCT_TYPE = "productType"

export const getProduction = () => {
  try {
    return getTemp(PRODUCT_TYPE).type
  } catch (e) {
    console.error(e)
  }
}

export const hasSnort = () => {
  try {
    return getTemp(PRODUCT_TYPE).snort === 1
  } catch (e) {
    console.error(e)
    return false
  }
}