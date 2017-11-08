
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { PAGE_SIZE } from '../../ConstConfig';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable'
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE } from '../../ConstConfig'

@WithAnimateRender
@WithContainerHeader
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterDropdownVisiblename: false,
            filterDropdownVisibleip: false,
            searchTextip: '',
            searchTextname: '',

        };
    }
    getQueryPanel = () => {
        const { routes, timestampRange } = this.props;
        const queryFilters = {
            timestampRange
        }
        return (
            <div key="query-panel" style={{ marginTop: "15px" }}>
                {this.props.getContainerHeader({
                    routes,
                    queryFilters,
                    onQuery: this.timestampRangeOnChange
                })}
            </div>
        )
    };
    timestampRangeOnChange = (payload) => {
        this.props.dispatch({
            type: `${NAMESPACE}/fetch`,
            payload: {
                payload
            }
        })
    }
    onInputChangeip = (e) => {
        this.setState({ searchTextip: e.target.value });
    }
    onInputChangename = (e) => {
        this.setState({ searchTextname: e.target.value });
    }
    pageChangeHandler = (page) => {
        this.props.dispatch({
            type: `${NAMESPACE}/fetch`,
            payload: {
                page,
            }
        })
    }
    onSearchname = () => {
        const { searchTextname } = this.state;
        this.setState({ filterDropdownVisiblename: false });
        this.props.dispatch({
            type: `${NAMESPACE}/fetch`,
            payload: {
                searchTextname,
                page: 1
            }
        })
    }
    onSearchip = () => {
        const { searchTextip } = this.state;
        this.setState({ filterDropdownVisibleip: false });
        this.props.dispatch({
            type: `${NAMESPACE}/fetch`,
            payload: {
                searchTextip,
                page: 1
            }
        })
    }
    onExport = () => {
        const page = this.props.page;
        this.props.dispatch({
            type: `${NAMESPACE}/onExport`,
            payload: {
                page
            }
        })
    }

    render() {
        const data = this.props.list.data;
        const columns = [{
            title: '登录时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '登录账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
            filterDropdown: (
                <div className={styles["panel"]}>
                    <p style={{
                        color: "rgba(0, 0, 0, 0.65)",
                        textAlign: "justify",
                        marginBottom: "3px"
                    }}>
                        输入你要搜索的登录账号
      </p>
                    <Input
                        ref={ele => this.searchInputname = ele}
                        placeholder="Search userAccount"
                        value={this.state.searchTextname}
                        onChange={this.onInputChangename}
                        onPressEnter={this.onSearchname}
                    />
                    <Button icon="search" type="primary" onClick={this.onSearchname} style={{ marginTop: "10px" }}>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            filterDropdownVisible: this.state.filterDropdownVisiblename,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisiblename: visible,
                }, () => this.searchInputname.focus());
            },
        },
        {
            title: '登录IP',
            dataIndex: 'ip',
            key: 'ip',
            filterDropdown: (
                <div className={styles["panel"]}>
                    <p style={{
                        color: "rgba(0, 0, 0, 0.65)",
                        textAlign: "justify",
                        marginBottom: "3px"
                    }}>
                        输入你要搜索的IP
        </p>
                    <Input
                        ref={ele => this.searchInputip = ele}
                        placeholder="Search IP"
                        value={this.state.searchTextip}
                        onChange={this.onInputChangeip}
                        onPressEnter={this.onSearchip}
                    />
                    <Button icon="search" type="primary" onClick={this.onSearchip} style={{ marginTop: "10px" }}>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            filterDropdownVisible: this.state.filterDropdownVisibleip,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisibleip: visible,
                }, () => this.searchInputip.focus());
            },
        },
        {
            title: '登录状态',
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            dataIndex: 'loginStatus',
            key: 'loginStatus',
            filters: [{
                text: '成功',
                value: '1',
            }, {
                text: '失败',
                value: '0',
            }],
            filterMultiple: false,
        },];
        const tableProps = {
            onChange: (pagination, filters) => {
                const value = filters.loginStatus[0];
                this.props.dispatch({
                    type: `${NAMESPACE}/fetch`,
                    payload: {
                        value,
                        page: 1
                    }
                })
            },
            columns: columns,
            dataSource: data.map((i, index) => {
                const status = i.loginStatus;
                return {
                    ...i,
                    loginStatus: i.loginStatus == "1" ? "成功" : "失败",
                    key: `${index}-item`
                }
            })
        }
        const paginationProps = {
            total: 500,
            current: this.props.page,
            onChange: this.pageChangeHandler,
            pageSize: this.props.limit
        };

        return (
            <div>
                <JoSpin spinning={this.props.loading}>
                    {
                        this.props.animateRender([
                            this.getQueryPanel(),
                            <div key="operation-panel" style={{ overflow: "hidden" }} >
                                <Button type="primary" style={{ float: "right", marginBottom: "15px" }} onClick={this.onExport}>导出登录日志</Button>
                            </div>,
                            <EnhanciveTable
                                key="table"
                                tableProps={tableProps}
                                paginationProps={paginationProps}></EnhanciveTable>
                        ])
                    }
                </JoSpin>

            </div>
        )

    }
}

function mapStateToProps(state) {
    const { list, page, loading, limit, timestampRange } = state[NAMESPACE];
    return {
        list,
        page,
        loading: state.loading.effects[`${NAMESPACE}/fetch`],
        limit,
        timestampRange

    };
}

export default connect(mapStateToProps)(App);