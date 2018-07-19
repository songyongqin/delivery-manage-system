

import React from 'react'
const style = require('./index.less')

interface props {
  data: Array<string>,
  getValue: (any) => any
}

class WhichSelect extends React.Component<props, any>{
  constructor(props){
    super(props)
    this.state={
      select: '0'
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