import * as React from 'react'
import ScrollWrapper from '../../../components/ScrollWrapper/index'


class basicComps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { result } = this.props.data;
    const { str_list } = result;
    return (
      <div>
        <p style={{ color: "#40a9ff" }}>共{str_list.length}条</p>
        <ScrollWrapper>
          {
            str_list.map((i, index) => {
              return <p style={{ margin: "0" }} key={`${index}`}>{i}</p>
            })
          }
        </ScrollWrapper>
      </div>

    )
  }
}
export default basicComps;
