/**
 * Created by jojo on 2017/9/6.
 */
import {statisticsTextConfig} from '../Analyse_Event/ConstConfig';


const {icons}=statisticsTextConfig;

export const THREAT_EVENT_EXPLOIT="exploits";
export const THREAT_EVENT_TOOL="tools";

export const THREAT_EVENT_THREAT_INFO="threatInfos";


export const threatEventKeys=[
  THREAT_EVENT_EXPLOIT,
  THREAT_EVENT_TOOL,
  THREAT_EVENT_THREAT_INFO
]

export const threatEventTextConfig={
  title:{
    [THREAT_EVENT_EXPLOIT]: <span>{icons[THREAT_EVENT_EXPLOIT]}&nbsp;&nbsp;{"攻击利用漏洞"}</span>,
    [THREAT_EVENT_TOOL]: <span>{icons[THREAT_EVENT_TOOL]}&nbsp;&nbsp;{"攻击武器（家族）"}</span>,
    [THREAT_EVENT_THREAT_INFO]: <span>{icons[THREAT_EVENT_THREAT_INFO]}&nbsp;&nbsp;{"威胁情报"}</span>
  }
}
