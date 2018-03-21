
export enum ArrayMode {
  MUL = "multiple",
  SPLIT = "split"
}

interface StringifyFn {
  (obj: Object, option?: Option): string
}

interface Option {
  suffix?: string,
  arrayMode?: ArrayMode
}

interface ParseFn {
  (str: string, option?: Option): object
}

/******************************************************************************************
arrayStringify::(string,any[],ArrayMode)->String

arrayStringify("key",[1,2,3,4],ArrayMode.MUL)  --->  "key=1&key=2&key=3&key=4&"  

arrayStringify("key",[1,2,3,4],ArrayMode.SPLIT) --->  "key=1,2,3,4&"
******************************************************************************************/
const arrayStringify = (key: string, arr: any[], arrayMode: ArrayMode): string =>
  arrayMode === ArrayMode.MUL
    ?
    arr.reduce((total, item) => total + `${key}=${item}&`, "")
    :
    `${key}=${arr.join(",")}&`


/******************************************************************************************
arrayParse::(string,string,ArrayMode)->String

arrayStringify("key",[1,2,3,4],ArrayMode.MUL)  --->  "key=1&key=2&key=3&key=4"  

arrayStringify("key",[1,2,3,4],ArrayMode.SPLIT) --->  "key=1,2,3,4&"
******************************************************************************************/


/******************************************************************************************
isArrayValue::any->boolean
******************************************************************************************/
const isArrayValue = value => (value !== null && value !== undefined && value.constructor === [].constructor)

/******************************************************************************************
isArrayValue::any->boolean
******************************************************************************************/
const isArrayQueryString = value => {

  if (value === null || value === undefined) {
    return false
  }
  if (value.indexOf(",") === -1) {
    return false
  }
  return true

}


/******************************************************************************************
reduceQueryString::ArrayMode->(string,[string,string])->string
******************************************************************************************/
const reduceQueryString = arrayMode => (sum, [key, value]) => (
  sum + (isArrayValue(value) ? arrayStringify(key, value, arrayMode) : `${key}=${value}&`)
)


/******************************************************************************************
stringify::(object,Option)->string
******************************************************************************************/
const stringify: StringifyFn = (obj, option = {}) => {

  const { suffix, arrayMode = ArrayMode.SPLIT } = option

  let queryString = Object.entries(obj).reduce(reduceQueryString(arrayMode), suffix || "?")

  return queryString.substring(0, queryString.length - 1)
}


/******************************************************************************************
parse::(object,Option)->string
******************************************************************************************/
const parse: ParseFn = (str, option = {}) => {

  const { arrayMode = ArrayMode.SPLIT } = option

  let finalStr = str.startsWith("?") ? str.slice(1) : str,
    items = finalStr.split("&"),
    result = {}

  if (finalStr.trim().length === 0) {
    return result
  }

  items.forEach(i => {

    if (i.trim().length === 0) {
      return
    }

    let [key, value] = i.split("=")

    if (isArrayQueryString(value) && (arrayMode === ArrayMode.SPLIT)) {
      return result[key] = value.split(",")
    }

    if (key in result && (arrayMode === ArrayMode.MUL)) {
      let target = result[key]
      if (isArrayValue(target)) {
        return result[key] = [...result[key], value]
      }
      return result[key] = [result[key], value]
    }

    return result[key] = value
  })

  return result

}

export default {
  stringify,
  parse,
  ArrayMode
}



