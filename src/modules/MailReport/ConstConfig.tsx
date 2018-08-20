export const NAMESPACE: string = "MailReport",
  OVERVIEW = "overview",
  BASIC_INFO = "basic_info",
  EMAIL_INFO = "email_info",
  URLLIST = "urllist",
  FILELIST = "filelist"
export const panelKeys = [
  OVERVIEW,
  BASIC_INFO,
  EMAIL_INFO,
  URLLIST,
  FILELIST
],
  panelTitleConfigs = {
    [OVERVIEW]: "概述",
    [BASIC_INFO]: "基本信息",
    [EMAIL_INFO]: "邮件信息",
    [URLLIST]: "URL列表",
    [FILELIST]: "附件列表"
  }
export const FILE_NAME_DATA_INDEX = "mailName",
  SIZE_DATA_INDEX = "mailSize",
  FORMAT_DATA_INDEX = "fileFormats",
  MD5_DATA_INDEX = "MD5",
  START_TIME_DATA_INDEX = "time",
  JUDGE_DATA_INDEX = "judge"

export const basicPanelTextConfig = {
  [FILE_NAME_DATA_INDEX]: "邮件名称",
  [SIZE_DATA_INDEX]: "邮件大小",
  [FORMAT_DATA_INDEX]: "文件格式",
  [MD5_DATA_INDEX]: "MD5",
  [START_TIME_DATA_INDEX]: "分析时间",
  [JUDGE_DATA_INDEX]: "威胁判定",
}

export const basicInfoDataIndexes = [
  FILE_NAME_DATA_INDEX,
  SIZE_DATA_INDEX,
  FORMAT_DATA_INDEX,
  MD5_DATA_INDEX,
  START_TIME_DATA_INDEX,
  JUDGE_DATA_INDEX
]
export const EMAIL_DATA_INDEX = "emailTheme",
  SENDER_DATA_INDEX = "senderAccount",
  RECEIVER_DATA_INDEX = "receiverAccount"
export const emailPanelTextConfig = {
  [EMAIL_DATA_INDEX]: "主题",
  [SENDER_DATA_INDEX]: "发件人",
  [RECEIVER_DATA_INDEX]: "收件人",
}

export const emailInfoDataIndexes = [
  EMAIL_DATA_INDEX,
  SENDER_DATA_INDEX,
  RECEIVER_DATA_INDEX,
]
export const URL_INDEX = "url",
  MD5_INDEX = "md5",
  OPERATE_INDEX = "operate",
  urlIndex = [
    URL_INDEX,
    MD5_INDEX,
    JUDGE_DATA_INDEX,
    OPERATE_INDEX
  ],
  urlText = {
    [URL_INDEX]: "URL",
    [MD5_INDEX]: "文件MD5",
    [JUDGE_DATA_INDEX]: "威胁判定",
    [OPERATE_INDEX]: "操作"
  },
  FILE_NAME_INDEX = "fileName",
  SIZE_INDEX = "fileSize",
  fileIndex = [
    FILE_NAME_INDEX,
    MD5_INDEX,
    SIZE_INDEX,
    JUDGE_DATA_INDEX,
    OPERATE_INDEX
  ],
  fileText = {
    [FILE_NAME_INDEX]: "文件名称",
    [MD5_INDEX]: "文件MD5",
    [SIZE_INDEX]: "文件大小",
    [JUDGE_DATA_INDEX]: "威胁判定",
    [OPERATE_INDEX]: "操作"
  }
