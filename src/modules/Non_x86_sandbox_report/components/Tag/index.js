/**
 * Created by jojo on 2017/7/10.
 */
import {Tag} from 'antd';


const WrappedTag=(props)=>{
  return <Tag {...props}
              style={{
                ...props.styles||{},
                cursor:"text",
                margin:"0 5px 5px 0"
              }}/>
};


export default WrappedTag;
