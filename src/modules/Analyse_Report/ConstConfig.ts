// import { THREAT_DATA_INDEX } from "modules/Statistics/ConstConfig";
const THREAT_DATA_INDEX = 'threat'
import React from 'react';
export const NAMESPACE: string = "analyse",
  NAMESPACE_FILE: string = "analyseFile",
  NAMESPACE_MAIL: string = "analyseMail",
  NAMESPACE_URL: string = "analyseUrl",
  FILETYPE: string[] = [
    "NULL",
    "7z",
    "arj",
    "cab",
    "chm",
    "dll",
    "doc",
    "docx",
    "elf",
    "eml",
    "exe",
    "iso",
    "jar",
    "msi",
    "pdf",
    "pps",
    "ppt",
    "pptx",
    "rar",
    "rtf",
    "swf",
    "xls",
    "xlsx",
    "zip",
  ],
  THREAT_TYPE: string[] = [
    "NULL",
    "Adware",
    "BackDoor",
    "Click",
    "DDOS",
    "Downloader",
    "Exploit",
    "KeyLog",
    "KillDisk",
    "Malware",
    "PWD",
    "Ransomware",
    "RAT",
    "StealInfor",
    "StealPass",
    "Spam",
    "Trojan",
    "Virus",
    "Worm"
  ],

  TAB_FILE: string = "文件记录",
  TAB_URL: string = "URL记录",
  PAGE_SIZE_RANGE: number[] = [10, 15, 20, 30, 50],
  FILE_NAME_SEARCH: string = "文件名称搜索",
  MD5_NAME_SEARCH: string = "MD5搜索",
  URL_SEARCH: string = "URL搜索",
  FILE_MD5_NAME_SEARCH: string = "文件MD5搜索：",
  MAIL_THEME_SEARCH: string = "文件主题搜索：",
  MAIL_RECEIVER_SEARCH = "收件人搜索",
  MAIL_SENDER_SEARCH = "发件人搜索",
  DYNAMIC_ANALYSIS = "动态分析",
  MAIL_ACCOUNT_SEARCH = "邮箱地址",
  MAIL_IP_SEARCH = "IP"

export const FETCH_FILE_REPORT_ACTION = "fetchFileReport",
  SAFE = "1",
  UN_SAFE = "-1",
  UN_KNOWN = "0"
export const JUDGE_TYPE = [
  SAFE,
  UN_SAFE,
  UN_KNOWN
]

export const JUDGE_TEXT_TYPE = {
  [SAFE]: "可疑",
  [UN_SAFE]: "威胁",
  [UN_KNOWN]: "未知"
}
export const
  KEY_INDEX = "key",
  FILE_NAME_DATA_INDEX = "fileName",
  MD5_DATA_INDEX = "md5",
  FILE_TYPE_DATA_INDEX = "fileType",
  THREAT_TYPE_DATA_INDEX = "threatType",
  TIME_DATA_INDEX = "time",
  THREAT_LEVEL_DATA_INDEX = "threatLevel",
  TASK_ID_DATA_INDEX = "taskId",
  OPERATION_COL_KEY = "operation",
  SAMPLE_DOWNLOAD_INDEX = "SampleDownload",

  URL_DATA_INDEX = "url",
  URL_MD5_DATA_INDEX = "md5",
  JUDGE_DATA_INDEX = "judge",
  URL_TIME_DATA_INDEX = "time",
  URL_SAMPLE_DOWNLOAD_INDEX = "SampleDownload"

export const urlDataIndexTextConfig = {
  [KEY_INDEX]: "序号",
  [URL_DATA_INDEX]: "URL",
  [URL_MD5_DATA_INDEX]: "MD5",
  [JUDGE_DATA_INDEX]: "威胁判定",
  [THREAT_TYPE_DATA_INDEX]: "威胁类型",
  [THREAT_LEVEL_DATA_INDEX]: "威胁等级",
  [URL_TIME_DATA_INDEX]: "提交时间",
  [URL_SAMPLE_DOWNLOAD_INDEX]: "样本报告"
}


export const dataIndexTextConfig = {
  [KEY_INDEX]: "序号",
  [FILE_NAME_DATA_INDEX]: "文件名称",
  [MD5_DATA_INDEX]: "MD5",
  [FILE_TYPE_DATA_INDEX]: "文件类型",
  [JUDGE_DATA_INDEX]: "威胁判定",
  [THREAT_TYPE_DATA_INDEX]: "威胁类型",
  [TIME_DATA_INDEX]: "提交时间",
  [THREAT_LEVEL_DATA_INDEX]: "威胁等级",
  [OPERATION_COL_KEY]: "样本报告",
  [SAMPLE_DOWNLOAD_INDEX]: "样本下载"
}
export const urlDataAllIndexes = [
  KEY_INDEX,
  URL_DATA_INDEX,
  URL_MD5_DATA_INDEX,
  JUDGE_DATA_INDEX,
  THREAT_TYPE_DATA_INDEX,
  THREAT_LEVEL_DATA_INDEX,
  URL_TIME_DATA_INDEX,
  URL_SAMPLE_DOWNLOAD_INDEX
]
export const dataAllIndexes = [
  KEY_INDEX,
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  FILE_TYPE_DATA_INDEX,
  JUDGE_DATA_INDEX,
  THREAT_TYPE_DATA_INDEX,
  TIME_DATA_INDEX,
  THREAT_LEVEL_DATA_INDEX,
  OPERATION_COL_KEY,
  SAMPLE_DOWNLOAD_INDEX
]
export const dataIndexes = [
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  THREAT_TYPE_DATA_INDEX,
  THREAT_LEVEL_DATA_INDEX,
  OPERATION_COL_KEY
]

export const filterOption = [
  FILETYPE,
  THREAT_TYPE
]
export const MAIL_KEY_INDEX = "key",
  MAIL_FILE_MD5_DATAINDEX = "fileMd5",
  MAIL_THEME_DATAINDEX = "emailTheme",
  MAIL_RECEIVER_DATAINDEX = "receiver",
  MAIL_SENDER_DATAINDEX = "sender",
  MAIL_URL_COUNT_INDEX = "urlCount",
  MAIL_FILE_COUNT_DATAINDEX = "fileCount",
  MAIL_THREATTYPE_DATAINDEX = "threatType",
  MAIL_TIME_DATAINDEX = "time",
  MAIL_REPORT_DATAINDEX = "operation",
  MAIL_DOWNLOAD_DATAINDEX = "SampleDownload",
  MAIL_SENDER_ACCOUNT_DATAINDEX = "senderAccount",
  MAIL_SENDER_IP_DATAINDEX = "senderIp",
  MAIL_RECEIVER_ACCOUNT_DATAINDEX = "receiverAccount",
  MAIL_RECEIVER_IP_DATAINDEX = "receiverIp",
  MAIL_URL_DATAINDEX = "url",
  MAIL_MD5_DATAINDEX = "md5",
  MAIL_STATIC_DATAINDEX = "staticDetection",
  MAIL_FILENAME_DATAINDEX = "fileName",
  MAIL_FILETYPE_DATAINDEX = "fileType",
  MAIL_FILESIZE_DATAINDEX = "fileSize",
  MAIL_DOWNLOADURL_DATAINDEX = "downloadUrl",
  MAIL_ACCOUNT_DATAINDEX = "account",
  MAIL_IP_DATAINDEX = "ip"

export const URLDate = [
  MAIL_KEY_INDEX,
  MAIL_URL_DATAINDEX,
  MAIL_MD5_DATAINDEX,
  MAIL_STATIC_DATAINDEX,
  MAIL_REPORT_DATAINDEX,
]
export const URLText = {
  [MAIL_KEY_INDEX]: "序号",
  [MAIL_URL_DATAINDEX]: "URL地址",
  [MAIL_MD5_DATAINDEX]: "MD5",
  [MAIL_STATIC_DATAINDEX]: "静态检测",
  [MAIL_REPORT_DATAINDEX]: "操作"
}

export const fileDate = [
  MAIL_KEY_INDEX,
  MAIL_FILENAME_DATAINDEX,
  MAIL_MD5_DATAINDEX,
  MAIL_FILETYPE_DATAINDEX,
  MAIL_FILESIZE_DATAINDEX,
  MAIL_STATIC_DATAINDEX,
  MAIL_REPORT_DATAINDEX,
]
export const fileText = {
  [MAIL_KEY_INDEX]: "序号",
  [MAIL_FILENAME_DATAINDEX]: "文件名称",
  [MAIL_MD5_DATAINDEX]: "MD5",
  [MAIL_FILETYPE_DATAINDEX]: "文件类型",
  [MAIL_FILESIZE_DATAINDEX]: "文件大小",
  [MAIL_STATIC_DATAINDEX]: "静态检测",
  [MAIL_REPORT_DATAINDEX]: "操作",
}
export const mailDataAllIndexes = [
  MAIL_KEY_INDEX,
  MAIL_FILE_MD5_DATAINDEX,
  MAIL_THEME_DATAINDEX,
  MAIL_RECEIVER_ACCOUNT_DATAINDEX,
  MAIL_SENDER_ACCOUNT_DATAINDEX,
  MAIL_URL_COUNT_INDEX,
  MAIL_FILE_COUNT_DATAINDEX,
  JUDGE_DATA_INDEX,
  MAIL_THREATTYPE_DATAINDEX,
  MAIL_TIME_DATAINDEX,
  MAIL_REPORT_DATAINDEX,
  MAIL_DOWNLOAD_DATAINDEX
]
export const mailDataIndexTextConfig = {
  [MAIL_KEY_INDEX]: "序号",
  [MAIL_FILE_MD5_DATAINDEX]: "文件MD5",
  [MAIL_THEME_DATAINDEX]: "邮件主题",
  [MAIL_RECEIVER_ACCOUNT_DATAINDEX]: "收件人",
  [MAIL_SENDER_ACCOUNT_DATAINDEX]: "发件人",
  [MAIL_URL_COUNT_INDEX]: "URL数量",
  [MAIL_FILE_COUNT_DATAINDEX]: "附件数量",
  [JUDGE_DATA_INDEX]: "威胁判定",
  [MAIL_THREATTYPE_DATAINDEX]: "威胁类型",
  [MAIL_TIME_DATAINDEX]: "分析时间",
  [MAIL_REPORT_DATAINDEX]: "样本报告",
  [MAIL_DOWNLOAD_DATAINDEX]: "样本下载"
}
