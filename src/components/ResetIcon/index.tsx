

import React from 'react'
const css = require('./index.less')

const Icon = ({ onClick }) => <div className={ css.icon } onClick={ onClick }  title='刷新' ></div>

const ResetIcon = ({ onClick }) => <div style={{ minWidth: 70, verticalAlign:'top' }}  ><Icon onClick={ onClick } /> <span>序号</span></div>

export default ResetIcon