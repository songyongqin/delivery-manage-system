import { getTemp } from 'utils/tools'

export const getProductType = () => {
  let productType = ""

  try {
    return productType = (getTemp("productType") || {}).type

  } catch (e) {
    return productType
  }

}