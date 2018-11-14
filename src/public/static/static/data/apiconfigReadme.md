
## api设置
config.json的state为0的时候，使用apiconfig.json上方json配置，采用模拟数据，如果为1，则使用apiconfig.json下方的设置  


## 注意
如设置了
```
'safeEventMap': 'situations/safeEventMap',
```
但是在项目中实际请求的api地址为 /static/situations/safeEventMap


对照表
```
[
  {
    // 安全呈现地图
    'safeEmergeMap': '',
    'safeEventMap': 'static/data/safeEventMap.json',
    'safeInformationMap': 'static/data/safeInformationMap.json',
    // 安全呈现统计
    'safeEmergeTotal': 'static/data/safeEmergeTotal.json',
    // 威胁事件-威胁等级占比
    'threatEventType': 'static/data/threatEventType.json',
    // 威胁事件-事件发生数量趋势
    'threatEventTrend': 'static/data/threatEventTrend.json',
    // 攻击者-国家排行
    'aggressorCountry': 'static/data/aggressorCountry.json',
    // 攻击者参与事件数量排行
    'aggressorEvent': 'static/data/aggressorEvent.json',
    // 受攻击资产-资产状态
    'underFireAssetState': 'static/data/underFireAssetState.json',
    // 受攻击资产-受攻击阶段
    'underFireAssetStep': 'static/data/underFireAssetStep.json',
    // 受攻击资产-受攻击次数排行
    'underFireAssetTime': 'static/data/underFireAssetTime.json',
    // 事件列表
    'eventList': 'static/data/listEvent.json',
    // 攻击者列表
    'aggressorList': 'static/data/listAggressor.json',
    // 受攻击资产列表
    'underFireAssetList': 'static/data/listUnderFireAsset.json'
  },
  {
    // 安全呈现地图
    'safeEmergeMap': '',
    'safeEventMap': 'situation/safeEventMap',
    'safeInformationMap': 'situation/safeInformationMap',
    // 安全呈现统计
    'safeEmergeTotal': 'situation/safeEmergeTotal',
    // 威胁事件-威胁等级占比
    'threatEventType': 'situation/threatEventType',
    // 威胁事件-事件发生数量趋势
    'threatEventTrend': 'situation/threatEventTrend',
    // 攻击者-国家排行
    'aggressorCountry': 'situation/aggressorCountry',
    // 攻击者参与事件数量排行
    'aggressorEvent': 'situation/aggressorEvent',
    // 受攻击资产-资产状态
    'underFireAssetState': 'situation/underFireAssetState',
    // 受攻击资产-受攻击阶段
    'underFireAssetStep': 'situation/underFireAssetStep',
    // 受攻击资产-受攻击次数排行
    'underFireAssetTime': 'situation/underFireAssetTime',
    // 事件列表
    'eventList': 'situation/listEvent',
    // 攻击者列表
    'aggressorList': 'situation/listAggressor',
    // 受攻击资产列表
    'underFireAssetList': 'situation/listUnderFireAsset'
  }
]
```

