export const NAMESPACE = "analyseOverallPcap"


export const TIME_DATA_INDEX = "time",
  PACKAGE_NAME_DATA_INDEX = "packageName",
  DOWNLOAD_URL_DATA_INDEX = "downloadUrl"


export const dataIndexes = [
  TIME_DATA_INDEX,
  PACKAGE_NAME_DATA_INDEX,
  DOWNLOAD_URL_DATA_INDEX
]

export const textConfig = {
  [TIME_DATA_INDEX]: "时间",
  [PACKAGE_NAME_DATA_INDEX]: "Pcap包文件名字",
  [DOWNLOAD_URL_DATA_INDEX]: "Pcap包"
}