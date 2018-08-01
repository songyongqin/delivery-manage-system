

const addComma = num => {
  if(typeof num !=='number'){
    console.log('type err, 期望接受的类型是number，而不是: '+ typeof num)
    return num
  }
  else {
    let str = num+''
    let arr = str.split('')
    let len = arr.length 
    let array = []
    for(let i=0;i<len;i++){
      let num = len-1-i 
      if(num%3===0&&num!==0){
        let str = arr[i]+','
        array.push(str)
      }
      else array.push(arr[i])
    }
    return array.join('')
  }
}


export default addComma