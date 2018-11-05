

const dataSetName = data =>  Array.isArray(data)? data.map(i => {
  if(!i.name){
    i.name='unknown'
  }
  return i
}) : []

export default dataSetName