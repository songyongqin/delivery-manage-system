export const setTemp = (key: string, value: object | string) => window.sessionStorage.setItem(key, JSON.stringify(value))

export const getTemp = (key: string) => JSON.parse(window.sessionStorage.getItem(key))

export const setCache = (key: string, value: object | string) => window.localStorage.setItem(key, JSON.stringify(value))

export const getCache = (key: string) => JSON.parse(window.localStorage.getItem(key))

export const delTemp = (key: string) => window.sessionStorage.removeItem(key)

export const delCache = (key: string) => window.localStorage.removeItem(key)