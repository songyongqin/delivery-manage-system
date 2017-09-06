/**
 * Created by jojo on 2017/8/28.
 */
import {Tag as AntTag,Tooltip} from 'antd';


const Tag =(props)=>{
  let children=props.children,
      value="";
  if(typeof children === 'string'){
    if(children.length>60){
      value=<Tooltip title={<span>{children}</span>}>
        {children.substr(0,60)+"..."}
      </Tooltip>;
    }else{
      value=children;
    }
  }else{
    value=children;
  }
  return <AntTag style={{cursor:"text",borderRadius:"4px"}}
                 {...props}
                 children={value}/>
};

export default Tag;
