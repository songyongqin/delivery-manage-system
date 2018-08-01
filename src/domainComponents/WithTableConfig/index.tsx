
// import request from 'utils/request'
// import * as React from 'react'
// import { Icon } from 'antd'

// let getFilters = arr =>{
//   let obj={}
//   for(let i=0; i<arr.length;i++){
//     if(arr[i]&&Array.isArray(arr[i]['filters'])){
//       obj[arr[i]['dataIndex']] = arr[i]['filters']
//     }
//   }
//   return { constants :{ filter: obj }}
// }

// export default (url: string) => (WrappedComponentx: any) => {
//   console.log(url)
//   class ComponentWithConfigxx extends React.Component<any, any>{
//     constructor(props) {
//       super(props)
//     }
//     componentDidMount() {
//       request(url + `?${new Date().getTime()}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json; charset=utf-8",
//         }
//       })
//         .then(data => {
//           const { columns } = data['config']
//           let constants = getFilters(columns)
//           console.log('xxxx',constants)
//           this.setState({ config: data, initial: true })
//         })
//         .catch(message => this.setState({ initial: true }))
//     }
//     state = {
//       initial: false,
//       config: {
//         columns: []
//       }
//     }
//     render() {

//       if ("config" in this.props) {
//         console.warn(`With config conflict: prop <config> has exist in props `)
//       }

//       if (!this.state.initial) {
//         return <div style={{ textAlign: "center", fontSize: "18px", padding: "15px" }}>
//           <Icon type="loading"></Icon>&nbsp; 正在初始化静态配置
//         </div>
//       }

//       return (
//         <WrappedComponentx {...this.props} config={this.state.config}></WrappedComponentx>
//       )
//     }
//   }

//   return ComponentWithConfigxx as any
// }

import request from 'utils/request'
import * as React from 'react'
import { Icon } from 'antd'


export default (url: string) => (WrappedComponent: any) => {

  class ComponentWithConfig extends React.Component<any, any>{
    constructor(props) {
      super(props)
    }
    componentDidMount() {
      request(url + `?${new Date().getTime()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      })
        .then(data => {
   
          let constants = this.getFilters(data['columns'])
          let columns = this.getColumns(data['columns'])
          this.setState({ config: { columns, constants }, initial: true })
        })
        .catch(message => this.setState({ initial: true }))
    }
    state = {
      initial: false,
      config: {
        columns: [],
        constants: {},
      }
    }

    getFilters = arr =>{
      let obj={}
      for(let i=0; i<arr.length;i++){
        if(arr[i]&&Array.isArray(arr[i]['filters'])){
          obj[arr[i]['dataIndex']] = arr[i]['filters']
        }
      }
      return { filter: obj }
    }

    getColumns = arr => {
      let array = arr.map(item => {
        let items = {}
        items['dataIndex'] = item['dataIndex']
        if(item['title']) {
           items['title'] = item['title']
          }
        if(item['title']) {
          items['title'] = item['title']
          }
        if(item['conditionType']==='input') {
          items['types'] = ['search']
          }
        if(item['filters']&&item['filters'].length!==0) {
          items['types'] = ['filters']
          }

        return items
      })
      return array
    }

    render() {

      if ("config" in this.props) {
        console.warn(`With config conflict: prop <config> has exist in props `)
      }

      if (!this.state.initial) {
        return <div style={{ textAlign: "center", fontSize: "18px", padding: "15px" }}>
          <Icon type="loading"></Icon>&nbsp; 正在初始化静态配置
        </div>
      }

      return (
        <WrappedComponent {...this.props} config={this.state.config}></WrappedComponent>
      )
    }
  }

  return ComponentWithConfig as any
}