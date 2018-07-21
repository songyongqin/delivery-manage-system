

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
      obj[array[0]] = array[1]
    }
  }
  return obj
}

const check = (str:string):boolean =>{
  return str[0]==='?'&&str.indexOf('=')>1
}

export default tranformPathToObj