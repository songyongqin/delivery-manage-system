import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
    commonDataIndexes,
    nodeDataIndexes,
    monitorLogTextConfig
} from '../../ConstConfig'

export const getCommonColumns = ({ getUsefulOnChangeHandle, getDelHandle } = {}) =>
    tableColumnsGenerator({
        keys: commonDataIndexes,
        titleTextConfig: monitorLogTextConfig
    })