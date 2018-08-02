
const checkType = num =>  /^[0-9]*$/.test(num)

const getStr = num => {
  if(num<0){
    console.error('期望输入数字是大于0的数，但是接受到的是：'+num)
      return '0'
  }
  if(num<1000){
          return num +''
        }
  else if(num>=1000&&num<1000*1000){
    return Math.floor(num/10)/100 + ' K'
  }
  else if(num>=1000*1000&&num<1000*1000*1000){
    return Math.floor(num/(10*1000))/100 + ' M'
  }
  else if (num>1000*1000*1000){
    return Math.floor(num/(10*1000*1000))/100 + ' B'
  }
}

const transformNum = (num:number):string => {
  let isNum = checkType(num)
  if(isNum){
    return getStr(num)
  }
  else {
    console.error('期望输入的是数字，但是接受到的类型是：'+  typeof num + '\n' + '他的值是：\n'+ num)
    return '0'
  }
}

export default transformNum