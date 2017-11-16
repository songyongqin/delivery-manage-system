import createSave from "./save";
export default (key = "filters", replace = false) => createSave(key, replace);