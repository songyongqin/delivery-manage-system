
import * as React from 'react'
const styles = require("./styles.less")
import tranformTime from 'utils/tranformTime'
import { Button, Popover } from 'antd'
import getAuthURL from 'utils/getAuthURL'
import ApplicationTestingUpd from '../ApplicationTestingUpd'

class ApplicationTesting extends React.Component<any, any> {

  state = {
    popVisible: false,
    reqData:{}
  }
  openPop = (el) => {
    let reqData = {...el,id:this.props.id,pid:this.props.pid}
    this.setState({
      popVisible: true,
      reqData
    })
  }

  closePop = ()=> {
    this.setState({
      popVisible: false
    })
  }
  download = () => {

  }

  render() {
    const {data} = this.props
    const {popVisible, reqData} = this.state
    return (
      <div>
          {
            data.length === 0 
            ?
            <span>等待文件上传</span>
            :
            <div>
              {
                data.map((el, index) => 
                  <div key ={index} className = {styles['wrap']}>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                        销售人员:
                      </div>
                      <div className = {styles['value']}>
                        {el.salesman}
                      </div>
                    </div>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                      部署时间:
                      </div>
                      <div className = {styles['value']}>
                        {tranformTime(el.deploymentTime,"YYYY-MM-DD")}
                      </div>
                    </div>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                      授权到期时间:
                      </div>
                      <div className = {styles['value']}>
                        {tranformTime(el.authorityExpirationTime,"YYYY-MM-DD")}
                      </div>
                    </div>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                        备注:
                      </div>
                      <div className = {styles['value']}>
                        {el.remarks}
                      </div>
                    </div>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                        附件:
                      </div>
                      <div className = {styles['value']}>
                        {
                          el.enclosures.map((el,index) => {
                            const content = <img style={{width:500,height:500}} src={el} ></img>
                            return  <Popover title={null} content={content} key={index}>
                                      <img src={el} className={styles['img']} ></img>
                                    </Popover>
                          })
                        }
                        <Button type="primary">
                        <a href = {getAuthURL(el.download)} download>下载附件</a>
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Button type="primary" className={styles['update']} onClick={_ => this.openPop(el)}>修改</Button>
                    </div>
                  </div>
                )
              }
            </div>
          }
          <ApplicationTestingUpd closePop = {this.closePop} data = {reqData} popVisible={popVisible} getTable = {this.props.getTable} />
      </div>
    )
  }
}
export default ApplicationTesting