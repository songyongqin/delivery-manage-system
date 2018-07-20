

import React from 'react'
const style = require('./index.less')

interface props {
  data: Array<string>,
  init?: string
  getValue: (any) => any
}

const tranform = (str:string, data:Array<string>):string => {
  let num = 0
  for(let i=0; i<data.length; i++){
    if(data[i]===str) {
      num = i 
      break
    }
  }
  return num +''
}

class WhichSelect extends React.Component<props, any>{
  constructor(props){
    super(props)
    this.state={
      select: tranform(props.init, props.data)
    }
  }

  click = e => {
    const select = e.currentTarget.dataset.select
    this.setState({ select })
    let num = parseInt(select, 10) || 0
    let str = this.props.data[num]
    this.props.getValue(str)
  }
  render(){
    let  data = this.props.data
    const { select } = this.state
    // console.log(select)
    if(!Array.isArray(data)) {
      data = []
    }
    return(
      <div>
        {
          data.map((item, index) => 
            <div  className={ select===index+'' ? style.select : style.tag } onClick={ this.click } 
                  data-select={ index +'' }
                  key={ index } >{item}</div>)
        }
      </div>
    )
  }
}

export default WhichSelect