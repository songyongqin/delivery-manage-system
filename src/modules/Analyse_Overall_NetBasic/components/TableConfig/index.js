import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import moment from 'moment';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
    dataIndexesConfig,
    PROTOCOL_TYPE_DATA_INDEX,
    URL_DATA_INDEX,
    TIME_DATA_INDEX,
    textConfig
} from '../../ConstConfig'
import TimesLabel from '../../../../components/TimesLabel';
import JoTag from '../../../../components/JoTag';
import { Popover } from 'antd';

const OVER_FLOW_LENGTH = 40;

export const getColumns = ({ queryFilters } = {}) =>
    tableColumnsGenerator({
        keys: dataIndexesConfig[queryFilters[PROTOCOL_TYPE_DATA_INDEX]],
        titleTextConfig: textConfig,
        renderer: {
            [TIME_DATA_INDEX]: value => <TimesLabel times={[value]}></TimesLabel>,
            [URL_DATA_INDEX]: value => value.length > OVER_FLOW_LENGTH
                ?
                <Popover content={<p style={{ maxWidth: "400px", wordBreak: "break-all" }}>
                    {value}</p>}>
                    <span>
                        {value.substr(0, 40) + "..."}
                    </span>
                </Popover>
                :
                value
        }
    })