
 import React, { Component } from 'react';
 import extraConnect from 'domainUtils/extraConnect'
import { Button, Dropdown, Icon, Menu  } from 'antd'
import { TYPICAL_CASE_NAMESPACE } from 'constants/model'
import { download as downloadJs } from 'utils'
const styles = require('./index.less')


 interface State{
   data: Obj[];
 }

 interface Obj{
  preReportUrl: string;
  img: string;
  title: string;
  abstract: string;
  report: string[];
  videoUrl: string;
  download: {
    url: string;
    name: string
  }
 }

const initState = {
  data: [
    // {preReportUrl: '/static/',
    //   img: '/static/1.png',
    //   title: 'WannCryin',
    //   abstract: `WannaCry（又叫Wanna Decryptor），一种“蠕虫式”的勒索病毒软件，大小3.3MB，由不法分子利用NSA（National Security Agency，美国国家安全局）泄露的危险漏洞“EternalBlue”（永恒之蓝）进行传播  。最新统计数据显示，100多个国家和地区超过10万台电脑遭到了勒索病毒攻击、感染。 勒索病毒是自熊猫烧香以来影响力最大的病毒之一。WannaCry勒索病毒全球大爆发，至少150个国家、30万名用户中招，造成损失达80亿美元，已经影响到金融，能源，医疗等众多行业，造成严重的危机管理问题。`,
    //   report: ['1.pdf', '1.pdf'],
    //   videoUrl: '/static/1.mp4',
    //   download: {
    //     url: '/static/1.mp4',
    //     name: '1.mp4'
    //   }
    // }
  ]
}

const mapStateToProps = state => {
  return {
    state,
    getLoading: state.loading.effects[`${TYPICAL_CASE_NAMESPACE}/get`],
    // postLoading: state.loading.effects[`${TYPICAL_CASE_NAMESPACE}/get`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    get: payload => dispatch({
      type: `${TYPICAL_CASE_NAMESPACE}/get`,
      payload
     })
  }
}

@extraConnect( mapStateToProps, mapDispatchToProps )
class TypicalCase extends Component<any,State> {

  constructor(props){
    super(props)
    this.state={
      data: initState.data||[]
    }
  }

  componentDidMount(){
    this.getList()
  }

  getList = () => {
    console.log(this.props)
    this.props.get()
    .then(res => {
      if(res&&res.data&&res.data.length>-1){
        this.setState({ data: res.data })
      }
    } )
  }




  render() {
    const { data } = this.state
    return (
      <div className={styles['container']} >
        {
          data&&data.length>0&&data.map((i,index) => <Item key={ index } data={ i } />)
        }
      </div>
    );
  }
}

export default TypicalCase

const Item = ({ data }) => {
  const { img, title, abstract, report=[], preReportUrl='/static/', videoUrl, download } = data
  return(
    <div className={ styles.item } >
      <div className={ styles.video } >
        <a href={ videoUrl }  target='_blank' >
          <img src={ img }  className={ styles.videoimg }  />
          <Icon type="play-circle" className={ styles.icon } />
        </a>
      </div>
      <div className={ styles.right } >
        <div className={styles['right-title']} >{ `典型案例-${title|| ''}` }</div>
        <div className={ styles.abstract } >{ abstract }</div>
        <div className='item-footer' >
          <Button type='primary' onClick={ _ => downloadJs(download.url, download.name)  } >报告下载</Button>
          <Dropdown overlay={ <Menu  style={{ padding: 15 }} >
              {
                report.map((i, index )=> <Menu.Item key={ index+i }  ><a href={ preReportUrl+ i } target='_blank' >{ i }</a></Menu.Item>)
              }
            </Menu > } >
            <span className={ styles.report }>分析报告 <Icon type="down" /></span>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}