
import React from 'react'

export const threatEventConfig = [
  {  
    title:'序号',
    dataIndex: 'index',
    render: ( text, record, index ) => <div>{index+1}</div>
   },
   {  
    title:'威胁行为',
    dataIndex: 'threatenBehavior'
   },
   {  
    title:'详细描述',
    dataIndex: 'detailDescription'
   },
   {  
    title:'攻击类型',
    dataIndex: 'attackType'
   },
   {  
    title:'事件归并次数',
    dataIndex: 'eventMergeCount'
   },
   {  
    title:'攻击者ip',
    dataIndex: 'attackerIP'
   },
   {  
    title:'受害资产ip',
    dataIndex: 'attatcedAssetIp'
   },
   {  
    title:'资产状态',
    dataIndex: 'assetStates'
   },
   {  
    title:'攻击阶段',
    dataIndex: 'attackStage'
   },
   {  
    title:'威胁等级',
    dataIndex: 'level'
   }
]

export const threatGroupConfig = [
  {  
    title:'序号',
    dataIndex: 'index',
    render: ( text, record, index ) => <div>{index+1}</div>
   },
   {  
    title:'威胁组织',
    dataIndex: 'groupName'
   },
   {  
    title:'攻击次数',
    dataIndex: 'attackCount'
   }
]

export const threatAttackedAssetsConfig = [
  {  
    title:'序号',
    dataIndex: 'index',
    render: ( text, record, index ) => <div>{index+1}</div>
   },
   {  
    title:'受攻击资产IP',
    dataIndex: 'attatcedAssetIp'
   },
   {  
    title:'资产状态',
    dataIndex: 'assetStates'
   }
]

export const threatFamilyConfig = [
  {  
    title:'序号',
    dataIndex: 'index',
    render: ( text, record, index ) => <div>{index+1}</div>
   },
   {  
    title:'威胁家族',
    dataIndex: 'family'
   },
   {  
    title:'攻击出现次数',
    dataIndex: 'attackCount'
   }
]

export const threatIntelligenceConfig = [
  {  
    title:'序号',
    dataIndex: 'index',
    render: ( text, record, index ) => <div>{index+1}</div>
   },
   {  
    title:'威胁类型',
    dataIndex: 'threatType'
   },
   {  
    title:'情报特征',
    dataIndex: 'intelligenceFeatures'
   },
   {  
    title:'威胁名称',
    dataIndex: 'threatName'
   },
   {  
    title:'特征准确度',
    dataIndex: 'featuresAccuracy'
   }
]