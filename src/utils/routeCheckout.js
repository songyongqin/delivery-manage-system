/**
 * Created by jojo on 2017/8/21.
 */
export default (nextState,replace,next)=>{
  const token=window.sessionStorage.getItem("token");
  if(token) {
    next()//如果有值直接下一步
  }else{
    replace("/login")//如果token信息为空就直接到登录页面
    next();
  }
}
