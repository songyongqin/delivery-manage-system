import React from 'react'
import { connect } from 'dva'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import JoBreadcrumb from 'components/JoBreadcrumb';
import Icon from 'components/JoIcon'
import QueryForm from 'components/TimestampForm'
/*

*/
export const WithCommonConnect = namespace => {

  const mapStateToProps = state => ({
    filters: state[namespace].filters,
    results: state[namespace].results,
    lastQueryTime: state.lastEffectTime.effects[`${namespace}/query`],
    queryLoading: state.loading.effects[`${namespace}/query`],
    commonLayout: state.layout,
    isDark: state.layout.commonLayout.darkTheme,
  })

  const mapDispatchToProps = dispatch => ({
    query: payload => dispatch({
      type: `${namespace}/query`,
      payload
    })
  })

  return WrappedComponent => {

    const FinalComponent = props => <WrappedComponent {...props} ></WrappedComponent>

    return connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(FinalComponent)
  }
}
/*

*/
export const WithCommonTableHandle = WrappedComponent =>
  props => {

    const reload = () => props.query({
      ...props.filters,
    })

    const pageOnChange = page => props.query({
      ...props.filters,
      page
    });

    const onSearch = (payload = {}) => props.query({
      ...props.filters,
      ...payload,
      page: 1
    })

    const tableOnChange = (pagination, filters, sorter) => props.query({
      ...props.filters,
      ...filters,
      page: 1,
    })

    return (
      <WrappedComponent
        {...props}
        pageOnChange={pageOnChange}
        tableOnChange={tableOnChange}
        onSearch={onSearch}
        reload={reload}>
      </WrappedComponent>
    )
  }


export const WithModal = (options = {}) => WrappedComponent => class extends React.Component {
  state = {
    ...options
  }

  switchModal = (key) => this.setState({
    [key]: !this.state[key]
  })

  createSwitchModal = key => () => this.setState({
    [key]: !this.state[key]
  })

  setModalVisible = (key, value) => this.setState({
    [key]: value
  })

  render = () => {
    return (
      <WrappedComponent
        switchModal={this.switchModal}
        setModalVisible={this.setModalVisible}
        createSwitchModal={this.createSwitchModal}
        modalVisible={this.state}
        {...this.props} >
      </WrappedComponent>
    )
  }
}

const mapStateToProps=state=> {
  return {
    commonLayout:state.layout.commonLayout,
    languageConfig:state.layout.languageConfig
  }
}

export const WithBreadcrumb=(WrappedComponent)=>{
  
    @connect(mapStateToProps)
    class WrapperComponent extends React.Component{
      getBreadcrumb=(routes)=>{
  
        const {languageConfig,commonLayout}=this.props;
        const {language,darkTheme}=commonLayout;
        const {routes:routesTitleConfig}=languageConfig[language];
  
        return (
          <JoBreadcrumb routes={routes}
                        isDark={darkTheme}
                        routesTitleConfig={routesTitleConfig}
                        title={<Icon type="home4"/>}/>
        )
      };
      render=()=>{
        return (
          <WrappedComponent {...this.props} getBreadcrumb={this.getBreadcrumb}/>
        )
      }
    }
  
    return WrapperComponent;
  };
  
  
  
  export const WithContainerHeader=(WrappedComponent)=>{
  
    @WithBreadcrumb
    class WrapperComponent extends React.Component{
      getContainerHeader=({routes,onQuery,filters})=>{
        return (
          <div style={{overflow:"hidden"}}>
            <div style={{float:"left"}}>
              {this.props.getBreadcrumb(routes)}
            </div>
            <div style={{float:"right"}}>
              <QueryForm defaultValue={filters}
                         onSubmit={onQuery}/>
            </div>
          </div>
        )
      };
      render=()=>{
        return (
          <WrappedComponent {...this.props} getContainerHeader={this.getContainerHeader}/>
        )
      }
    }
  
  
    return WrapperComponent;
  
  };