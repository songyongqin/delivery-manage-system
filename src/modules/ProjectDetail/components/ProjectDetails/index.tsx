
import * as React from 'react'
import { Collapse,Form, Button } from 'antd';
const { Panel } = Collapse;
const styles = require("./styles.less")
import tranformTime from 'utils/tranformTime'
import UpdateForm from '../UpdateForm'
import ProductAdd from '../add/ProductAdd'
import moment from 'moment'

class ProjectDetails extends React.Component<any, any> {

  state = {
    popVisible: false,
    popAddVisible: false,
  }

  openPop = () => {
    this.setState({
      popVisible: true
    }) 
  }
  openPopAdd = () => {
    this.setState({
      popAddVisible: true
    })
  }
  closePop = ()=> {
    this.setState({
      popVisible: false
    })
  }
  closePopAdd = ()=> {
    this.setState({
      popAddVisible: false
    })
  }

  render() {
    const {proName, cusName, proMsgs = [], startTime, state, remarks} = this.props.data
    const {popVisible, popAddVisible } = this.state
    const {role} = this.props
    return (
      <div>
        <Collapse id="aaa" defaultActiveKey={['1']}>
          <Panel style={{fontSize:16}} header="项目详情" key="1">
            <div className = {styles['wrap']}>
              <div className = {styles['item']}>
                <div className = {styles['key']}>
                  项目名称:
                </div>
                <div className = {styles['value']}>
                  {proName}
                </div>
              </div>
              <div className = {styles['item']}>
                <div className = {styles['key']}>
                  客户名称:
                </div>
                <div className = {styles['value']}>
                  {cusName}
                </div>
              </div>
              <div className = {styles['item']}>
                <div className = {styles['key']}>
                  产品名称:
                </div>
                <div className = {styles['value']}>
                  {
                    proMsgs.map((el, index) => 
                      <div key={index}>{el.proMsg}</div>
                    )
                  }
                </div>
              </div>
              <div className = {styles['item']}>
                <div className = {styles['key']}>
                  项目开始时间:
                </div>
                <div className = {styles['value']}>
                  {/* {tranformTime(startTime,"YYYY-MM-DD")} */}
                  {moment(startTime*1000).format("YYYY-MM-DD")}
                </div>
              </div>
              <div className = {styles['item']}>
                <div className = {styles['key']}>
                  项目状态:
                </div>
                <div className = {styles['value']}>
                  {state === 1 ? "进行中" : "售后"}
                </div>
              </div>
              <div className = {styles['item']}>
                <div className = {styles['key']}>
                  备注:
                </div>
                <div className = {styles['value']}>
                  {remarks}
                </div>
              </div>
              <div>
                <Button type="primary" className={styles['add']} disabled={ role===3 } onClick={this.openPopAdd}>新增产品</Button>
                <Button type="primary" className={styles['update']} disabled={ role===3 } onClick={this.openPop}>修改</Button>
              </div>
            </div>
          </Panel>
        </Collapse>
        <UpdateForm closePop = {this.closePop} getTable={this.props.getTable} popVisible={popVisible} id={this.props.id} data = {this.props.data}/>
        <ProductAdd closePop = {this.closePopAdd} getTable={this.props.getTable} popVisible={popAddVisible} id={this.props.id} />
      </div>
    )
  }
}
export default ProjectDetails