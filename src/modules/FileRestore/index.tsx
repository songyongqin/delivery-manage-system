import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import styles from './styles.css'
import { Button, Modal, Upload, message as Message, Row, Col, Tooltip } from 'antd'
import { getCache, setCache } from 'utils'
import { NAMESPACE } from './constants'
import { connect } from 'dva'
import Table from 'domainComponents/Table'
import Spin from 'domainComponents/Spin'
import TimesLabel from 'components/TimeLabel'
import WithAnimateRender from 'components/WithAnimateRender'
import extraConnect from 'domainUtils/extraConnect'

const SNORT_CACHE_NAMESPACE = "@@__SNORT__@@"


const getDraft = () => {
  try {
    const cache = getCache(SNORT_CACHE_NAMESPACE).value
    if (cache === null) {
      return null
    }
    if (cache.trim().length !== 0) {
      return cache
    }
    return null
  } catch (e) {

    return null
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.effects[`${NAMESPACE}/fetch`],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: payload => dispatch({
      type: `${NAMESPACE}/fetch`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, (mapDispatchToProps))
@WithAnimateRender
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      total: 0,
      filters: {
        page: 1,
        limit: 20
      }
    }
  }
  componentDidMount() {
    this.fetchData(this.state.filters)
  }
  fetchData = (filters) => {
    this.setState({
      filters,
    })
    this.props.fetch(filters).then(res => {
      this.setState({
        data: res.data,
        total: res.total,
      })
    })
  }

  onChange = (page) => {

    this.fetchData({
      ...this.state.filters,
      page
    })
  }

  render() {

    const { loading } = this.props
    const { value } = this.state


    const tableProps = {
      dataSource: this.state.data.map((i, index) => {
        return {
          ...i,
          key: `${index}-item`
        }
      }),
      columns: [
        {
          dataIndex: "time",
          title: "时间",
          render: value => <TimesLabel value={[value]}></TimesLabel>
        },
        {
          dataIndex: "fileName",
          title: "文件名",
          render: value => <div style={{ maxWidth: "240px" }}>{value}</div>
        },
        {
          dataIndex: "ip",
          title: "下载者IP",
          render: value => <div style={{ width: "120px" }}>{value}</div>
        },
        {
          dataIndex: "url",
          title: "URL"
        },
        {
          dataIndex: "md5",
          title: "MD5"
        },
        {
          dataIndex: "familyName",
          title: "病毒名",
          render: value => <div style={{ minWidth: "80px" }}>{value}</div>
        }
      ]
    }

    return (
      <div>
        <Spin spinning={loading}>
          {
            this.props.animateRender([
              <div key="table">
                <Table
                  tableProps={tableProps}
                  paginationProps={{
                    onChange: this.onChange,
                    current: this.state.filters.page,
                    pageSize: this.state.filters.limit,
                    total: this.state.total,
                  }}
                ></Table>
              </div>
            ])
          }
        </Spin>
      </div>
    )
  }
}

export default Page