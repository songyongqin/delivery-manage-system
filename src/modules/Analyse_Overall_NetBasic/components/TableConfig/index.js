import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
    dataIndexesConfig,
    PROTOCOL_TYPE_DATA_INDEX,
    textConfig
} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';


export const getColumns = ({ queryFilters } = {}) =>
    tableColumnsGenerator({
        keys: dataIndexesConfig[queryFilters[PROTOCOL_TYPE_DATA_INDEX]],
        titleTextConfig: textConfig,
    })