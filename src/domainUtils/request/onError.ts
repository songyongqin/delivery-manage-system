export default (err) => {
  return { status: err.status || -99999, message: err.message }
}