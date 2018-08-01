

const wrapStr = (str, num=15) => {
  if(typeof str !=='string'){
    console.error('输入的数据类型不是字符串，而是：'+ typeof str)
    return str
  }
  else {
    let isLong = str.length >num
    let strs = isLong ? str.slice(0, num) + '...' : str
    return strs
  }
}

export default  wrapStr