import {
  HTTP,
  URL,
  DNS,
  TCP,
  IP,
  SSH,
  FTP,
  SMB,

  REVEICER,
  SENDER,
  THEME,
  SOURCE_IP_PORT,
  TARGET_IP_PORT,
  SOURCE_IP,
  TARGET_IP,
  SMTP_POP3,
  ruleItemPlaceholder
} from '../../../constants'

import * as tools from 'utils/tools'

const ipReg = tools.ipReg
const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
const numberReg = /^[0-9]*$/;
const checkerDecorator = fn => (args) => {
  try {
    fn(args)
  } catch (e) {
    // console.warn(e);
  }
}

const isNumberStr = (str) => numberReg.test(str);

const isIpPort = (str = "") => {
  const items = str.split(":");
  if (items.length > 2 || items.length === 0) {
    return false;
  }

  let isIp = ipReg.test(items[0]) || items[0] === "any"

  if (isIp && items.length === 1) {
    return true;
  }
  let port = items[1],
    isPort = (isNumberStr(port) && parseInt(port) >= 0 && parseInt(port) <= 65535) || port === 'any'
  if (isPort && isIp) {
    return true;
  }
  return false;
}

const ipChecker = checkerDecorator(({ dataIndex, props, setCheckStatus, checkerStatus }) => {
  let sourceIp = props.form.getFieldValue(SOURCE_IP) || "",
    targetIp = props.form.getFieldValue(TARGET_IP) || "",
    isSourceEmpty = sourceIp.trim().length === 0,
    isTargetEmpty = targetIp.trim().length === 0

  if (isSourceEmpty && isTargetEmpty) {
    setCheckStatus(TARGET_IP, "error", "至少填写一项")
    setCheckStatus(SOURCE_IP, "error", "至少填写一项")
    return;
  } else {
    setCheckStatus(TARGET_IP, "", "")
    setCheckStatus(SOURCE_IP, "", "")
  }

  if ((!ipReg.test(sourceIp)) && !isSourceEmpty) {
    setCheckStatus(SOURCE_IP, "error", "请输入正确的IP")
  }

  if ((!ipReg.test(targetIp)) && !isTargetEmpty) {
    setCheckStatus(TARGET_IP, "error", "请输入正确的IP")
  }

})


const ipPortTypeChecker = checkerDecorator(({ dataIndex, props, setCheckStatus, checkerStatus }) => {
  let souceIpPort = props.form.getFieldValue(SOURCE_IP_PORT),
    targetIpPort = props.form.getFieldValue(TARGET_IP_PORT);

  souceIpPort = souceIpPort || "";
  targetIpPort = targetIpPort || "";

  let isSourceEmpty = souceIpPort.trim().length === 0,
    isTargetEmpty = targetIpPort.trim().length === 0;

  if (isSourceEmpty && isTargetEmpty) {
    setCheckStatus(TARGET_IP_PORT, "error", "至少填写一项")
    setCheckStatus(SOURCE_IP_PORT, "error", "至少填写一项")
    return;
  } else {
    setCheckStatus(TARGET_IP_PORT, "", "")
    setCheckStatus(SOURCE_IP_PORT, "", "")
  }

  if ((!isIpPort(souceIpPort)) && !isSourceEmpty) {
    setCheckStatus(SOURCE_IP_PORT, "error", "请输入正确的IP:PORT")
  }

  if ((!isIpPort(targetIpPort)) && !isTargetEmpty) {
    setCheckStatus(TARGET_IP_PORT, "error", "请输入正确的IP:PORT")
  }


})


export default {

  [HTTP]: checkerDecorator(({ props, setCheckStatus }) => {
    let urlValue = props.form.getFieldValue(URL);
    urlValue = urlValue || "";

    urlValue.trim().length === 0
      ?
      setCheckStatus(URL, "error", "不能为空")
      :
      setCheckStatus(URL, "success", "");
  }),

  [DNS]: checkerDecorator(({ props, setCheckStatus }) => {
    let urlValue = props.form.getFieldValue(URL);

    if (!urlValue) {
      return setCheckStatus(URL, "error", "不能为空")
    }

    urlValue.trim().length === 0
      ?
      setCheckStatus(URL, "error", "不能为空")
      :
      setCheckStatus(URL, "success", "");
  }),

  [TCP]: ipPortTypeChecker,

  [IP]: ipPortTypeChecker,

  [SSH]: ipPortTypeChecker,

  [FTP]: ipPortTypeChecker,

  [SMB]: ipPortTypeChecker,

  [SMTP_POP3]: checkerDecorator(({ props, setCheckStatus, dataIndex }) => {
    let receiver = props.form.getFieldValue(REVEICER),
      sender = props.form.getFieldValue(SENDER),
      theme = props.form.getFieldValue(THEME);

    receiver = receiver || "";
    sender = sender || "";
    theme = theme || "";

    let isReceiverEmpty = receiver.trim().length === 0,
      isSenderEmpty = sender.trim().length === 0,
      isThemeEmpty = theme.trim().length === 0;

    if (isReceiverEmpty && isThemeEmpty && isSenderEmpty) {
      setCheckStatus(REVEICER, "error", "至少填写一项")
      setCheckStatus(SENDER, "error", "至少填写一项")
      setCheckStatus(THEME, "error", "至少填写一项")
    } else {
      setCheckStatus(REVEICER, "", "")
      setCheckStatus(SENDER, "", "")
      setCheckStatus(THEME, "", "")
    }


    if ((!emailReg.test(receiver)) && !isReceiverEmpty) {
      setCheckStatus(REVEICER, "error", "请输入正确的邮箱")
    }

    if ((!emailReg.test(sender)) && !isSenderEmpty) {
      setCheckStatus(SENDER, "error", "请输入正确的邮箱")
    }


  }),
}
