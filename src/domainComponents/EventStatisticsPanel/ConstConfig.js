import JoIcon from 'components/JoIcon';

export const STATISTICS_TITLE = "威胁事件分类"

export const COUNTS_DATA_INDEX = "counts",
  HIGH_EVENTS_DATA_INDEX = 'highEvents',
  EXPLOITS_DATA_INDEX = "exploits",
  TOOLS_DATA_INDEX = "tools",
  THREAT_INFOS_DATA_INDEX = "threatInfos",
  FALL_HOST_DATA_INDEX = "fallHosts"

export const dataIndexes = [
  COUNTS_DATA_INDEX,
  HIGH_EVENTS_DATA_INDEX,
  EXPLOITS_DATA_INDEX,
  TOOLS_DATA_INDEX,
  THREAT_INFOS_DATA_INDEX,
  FALL_HOST_DATA_INDEX
];

export const haveDetailsDataIndexes = [
  EXPLOITS_DATA_INDEX,
  TOOLS_DATA_INDEX,
  THREAT_INFOS_DATA_INDEX,
]

export const textConfig = {
  title: STATISTICS_TITLE,
  items: {
    [COUNTS_DATA_INDEX]: "攻击次数",
    [HIGH_EVENTS_DATA_INDEX]: "攻击高危次数",
    [EXPLOITS_DATA_INDEX]: "攻击利用漏洞",
    [TOOLS_DATA_INDEX]: "攻击武器",
    [THREAT_INFOS_DATA_INDEX]: "威胁情报",
    [FALL_HOST_DATA_INDEX]: "失陷主机"
  },
  units: {
    [COUNTS_DATA_INDEX]: "次",
    [HIGH_EVENTS_DATA_INDEX]: "起",
    [EXPLOITS_DATA_INDEX]: "个",
    [TOOLS_DATA_INDEX]: "个",
    [THREAT_INFOS_DATA_INDEX]: "条",
    [FALL_HOST_DATA_INDEX]: "台"
  },
  icons: {
    [COUNTS_DATA_INDEX]: <JoIcon type="hacker" />,
    [HIGH_EVENTS_DATA_INDEX]: <JoIcon type="exclamationcircleo" />,
    [EXPLOITS_DATA_INDEX]: <JoIcon type="bug" />,
    [TOOLS_DATA_INDEX]: <JoIcon type="eyedropper" />,
    [THREAT_INFOS_DATA_INDEX]: <JoIcon type="filetext1" />,
    [FALL_HOST_DATA_INDEX]: <JoIcon type="iconfontdesktop" />
  }
};
