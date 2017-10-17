/**
 * Created by jojo on 2017/10/13.
 */
import {
  HTTP,
  URL,
  DNS,
  TCP,
  IP,
  SSH,
  FTP,


  REVEICER,
  SENDER,
  THEME,
  SOURCE_IP_PORT,
  TARGET_IP_PORT,
  SMTP_POP3,
  ruleItemPlaceholder
} from '../../ConstConfig'


const ipReg=/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
const emailReg=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
const numberReg=/^[0-9]*$/;
const checkerDecorator=fn=>(args)=>{
  try{
    fn(args)
  }catch(e){
    // console.warn(e);
  }
}

const isNumberStr=(str)=>numberReg.test(str);

const isIpPort=(str="")=>{
  const items=str.split(":");
  if(items.length>2||items.length===0){
    return false;
  }
  if(!ipReg.test(items[0])){
    return false;
  }
  let port=items[1];
  if(isNumberStr(port)&&parseInt(port)>=0&&parseInt(port)<=65535){
    return true;
  }
  return false;
}

const ipPortTypeChecker=checkerDecorator(({dataIndex,props,setCheckStatus,checkerStatus})=>{
  let souceIpPort=props.form.getFieldValue(SOURCE_IP_PORT),
    targetIpPort=props.form.getFieldValue(TARGET_IP_PORT);

  souceIpPort=souceIpPort||"";
  targetIpPort=targetIpPort||"";

  let isSourceEmpty=souceIpPort.trim().length===0,
      isTargetEmpty=targetIpPort.trim().length===0;

  if(isSourceEmpty&&isTargetEmpty){
    setCheckStatus(TARGET_IP_PORT,"error","至少填写一项")
    setCheckStatus(SOURCE_IP_PORT,"error","至少填写一项")
    return;
  }else {
    setCheckStatus(TARGET_IP_PORT,"","")
    setCheckStatus(SOURCE_IP_PORT,"","")
  }

  if((!isIpPort(souceIpPort))&&!isSourceEmpty){
    setCheckStatus(SOURCE_IP_PORT,"error","请输入正确的IP:PORT")
  }

  if((!isIpPort(targetIpPort))&&!isTargetEmpty){
    setCheckStatus(TARGET_IP_PORT,"error","请输入正确的IP:PORT")
  }


})


export default {

  [HTTP]:checkerDecorator(({props,setCheckStatus})=>{
    let urlValue=props.form.getFieldValue(URL);
        urlValue=urlValue||"";

    urlValue.trim().length===0
      ?
      setCheckStatus(URL,"error","不能为空")
      :
      setCheckStatus(URL,"success","");
  }),

  [DNS]:checkerDecorator(({props,setCheckStatus})=>{
    let urlValue=props.form.getFieldValue(URL);
    urlValue.trim().length===0
      ?
      setCheckStatus(URL,"error","不能为空")
      :
      setCheckStatus(URL,"success","");
  }),

  [TCP]:ipPortTypeChecker,

  [IP]:ipPortTypeChecker,

  [SSH]:ipPortTypeChecker,

  [FTP]:ipPortTypeChecker,

  [SMTP_POP3]:checkerDecorator(({props,setCheckStatus,dataIndex})=>{
    let receiver=props.form.getFieldValue(REVEICER),
        sender=props.form.getFieldValue(SENDER),
        theme=props.form.getFieldValue(THEME);

    receiver=receiver||"";
    sender=sender||"";
    theme=theme||"";

    let isReceiverEmpty=receiver.trim().length===0,
        isSenderEmpty=sender.trim().length===0,
        isThemeEmpty=theme.trim().length===0;

    if(isReceiverEmpty&&isThemeEmpty&&isSenderEmpty){
      setCheckStatus(REVEICER,"error","至少填写一项")
      setCheckStatus(SENDER,"error","至少填写一项")
      setCheckStatus(THEME,"error","至少填写一项")
    }else {
      setCheckStatus(REVEICER,"","")
      setCheckStatus(SENDER,"","")
      setCheckStatus(THEME,"","")
    }


    if((!emailReg.test(receiver))&&!isReceiverEmpty){
      setCheckStatus(REVEICER,"error","请输入正确的邮箱")
    }

    if((!emailReg.test(sender))&&!isSenderEmpty){
      setCheckStatus(SENDER,"error","请输入正确的邮箱")
    }


  }),
}
