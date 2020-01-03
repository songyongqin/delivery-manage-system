
import * as React from 'react'
const styles = require("./styles.less")
import tranformTime from 'utils/tranformTime'
import { Button, Popover } from 'antd'
import getAuthURL from 'utils/getAuthURL'
import DeliveryTestingUpd from '../DeliveryTestingUpd'

class DeliveryTesting extends React.Component<any, any> {

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
    const {role} = this.props
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
                      过期时长:
                      </div>
                      <div className = {styles['value']}>
                        {el.expirationDate}
                      </div>
                    </div>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                      测试人:
                      </div>
                      <div className = {styles['value']}>
                        {el.tester}
                      </div>
                    </div>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                      测试时间:
                      </div>
                      <div className = {styles['value']}>
                        {tranformTime(el.testTime,"YYYY-MM-DD")}
                      </div>
                    </div>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                      检验人:
                      </div>
                      <div className = {styles['value']}>
                        {el.inspector}
                      </div>
                    </div>
                    <div className = {styles['item']}>
                      <div className = {styles['key']}>
                      检验时间:
                      </div>
                      <div className = {styles['value']}>
                        {tranformTime(el.inspectionTime,"YYYY-MM-DD")}
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
                            const content = <img style={{width:500,height:500}} src={el.enclosure} ></img>
                            return  <Popover title={null} content={content} key={index}>
                                      <img src={el.enclosure} className={styles['img']} ></img>
                                    </Popover>
                          })
                        }
                        <Button type="primary" disabled={ role===3 }>
                        <a href = {getAuthURL(el.download)} download>下载附件</a>
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Button type="primary" disabled={ role===3 } className={styles['update']} onClick={_ => this.openPop(el)}>修改</Button>
                    </div>
                  </div>
                )
              }
            </div>
          }
          <DeliveryTestingUpd closePop = {this.closePop} data = {reqData} popVisible={popVisible} getTable = {this.props.getTable} />
      </div>
    )
  }
}
export default DeliveryTesting