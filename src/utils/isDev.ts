export default () => {
  try {
    return process.env.NODE_ENV === "development"
  } catch (e) {
    return false
  }
}