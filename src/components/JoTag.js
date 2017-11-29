/**
 * Created by jojo on 2017/8/28.
 */
import { Tag as AntTag, Tooltip } from 'antd';


const Tag = props => {
  let { overflowLength = 30, children } = props,
    value = children;
  if (typeof children === 'string') {

    if (children.length > overflowLength) {
      value = <Tooltip title={<span>{children}</span>}>
        {children.substr(0, overflowLength) + "..."}
      </Tooltip>;
    } else {
      value = children;
    }

  }
  return <AntTag
    {...props}
    style={{ textAlign: "center", cursor: "text", borderRadius: "4px", margin: "0 5px 5px 0", ...(props.style || {}) }}
    children={value} />
};

export default Tag;
