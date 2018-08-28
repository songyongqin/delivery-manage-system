
const canParse = str => {
  try{
    JSON.parse(str)
    return true
  }
  catch(err){
    return false
  }
}


const  tranformPathToObj = (str:string):object => {
  if(!check(str)){
    console.error('不是正确的路径参数，期望的格式是: \n"?example=example", 而不是: \n'+str)
    return {}
  }
  let strs = str.replace('?', '')
  let arr = strs.split('&') || []
  let obj = {}
  for(let i=0; i<arr.length; i++ ){
    if(arr[i]&&arr[i].indexOf('=')){
      let array = arr[i].split('=')

      let value = canParse(array[1]) ? JSON.parse(array[1]) : array[1]

      // if(array[0]==='timestampRange'){
      //   let arr = value.split
      //   value = [value.split(',')]
      // }

      obj[array[0]] = value
    }
  }
  return obj
}

const check = (str:string):boolean =>{
  return str[0]==='?'&&str.indexOf('=')>1
}

export default tranformPathToObj