
export const intelligenceKeyObj = {
  "url": "URL",
  "md5": "MD5",
  
  "virusFamily":"病毒家族",
  "attackGroup":"攻击组织",
  "eventName":"事件名称",
  "attackTarget":"攻击目的",
  "sampleUrl":"样本URL",

  "basicProtocol":"基本协议",
  "honeypotType":"蜜罐类型",
  "nodeOs":"节点操作系统",
  "attackStage":"攻击阶段",
  "CVENumber":"CVE编号",
  "loophole":"漏洞",
  "sourceIp":"源IP",
  "sourcePort":"源端口",
  "targetIp":"目的IP",
  "targetPort":"目的端口",

  "attackedDomainName":"被攻击者域名",
  "attackedUrl":"被攻击者URL",
  "attackedIP":"被攻击者IP",
  "attackedType":"被攻击者类型",
  "attackePort":"被攻击者端口",
  "attackerC2DomainName":"攻击者C2域名",
  "attackerC2IP":"攻击者C2IP",
  "attackerC2Protoaol":"攻击者C2协议",
  "attackerC2Port":"攻击者C2端口",
}

const getArr = (arr:string[]) => {
  let array = arr.map(i => {
    let item = {}
    item['key'] = [i]
    item['text'] = intelligenceKeyObj[i] 
    return item
  })
  return array
}

const C2Arr = ['url', 'md5']

export const C2ThreatIntelligence = getArr(C2Arr)

const APTArr = ['virusFamily', 'attackGroup', 'eventName', 'attackTarget', 'sampleUrl', 'md5']

export const APTThreatIntelligence = getArr(APTArr)

const HoneynetArr = ['basicProtocol', 'honeypotType', 'nodeOs', 'attackStage', 'CVENumber', 'loophole', 'sourceIp', 'sourcePort', 'targetIp', 'targetPort']

export const HoneynetThreatIntelligence = getArr(HoneynetArr)


const DDOSArr = ['attackedDomainName', 'attackedUrl', 'attackedIP', 'attackedType', 'attackePort', 'attackerC2DomainName', 'attackerC2IP', 'attackerC2Protoaol', 'attackerC2Port']

export const DDOSThreatIntelligence = getArr(DDOSArr)