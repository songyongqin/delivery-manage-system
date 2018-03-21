const NAMESPACE_PREFIX = "@@__ACS__@@"

export default (namespace: string) => {
  return `${NAMESPACE_PREFIX}__${namespace}`
}