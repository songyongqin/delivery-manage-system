import React from 'react';
import { Card } from 'antd';
import styles from './comps.css';
import ToNon_x86_sandbox_report from '../../ToNon_x86_sandbox_report'
import Tox86_sandbox_report from '../../Tox86_sandbox_report/'
class basicComps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { data, md5,x86_analysis_status,nox86_analysis_status } = this.props;


    return (
      <div>
        {
          data.map((i, index) => {
            const keys = Object.keys(i)[0]
            return keys == "non_x86_sandbox_report" 
            ? 
            // <Card
            //   key={index}
            //   title="x86_sandbox_report"
            // >

              <Tox86_sandbox_report md5={md5} nox86_analysis_status={nox86_analysis_status}></Tox86_sandbox_report>
              :
              <Card
                key={index}
                title={keys}
              >
                <p>{JSON.stringify(i[`${keys}`], null, 2)}</p>

              </Card>
          }
          )
        }
        <ToNon_x86_sandbox_report md5={md5} x86_analysis_status={x86_analysis_status}></ToNon_x86_sandbox_report>
      </div>
    )
  }
}
export default basicComps;
