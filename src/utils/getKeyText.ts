export default (
  key: number | string,
  textConfig: object = {}
): (number | string) => (key in textConfig ? textConfig[key] : key)
