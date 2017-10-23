/**
 * Created by jojo on 2017/8/28.
 */
import { Tag as AntTag, Tooltip } from 'antd';


const Tag = (props) => {
  let children = props.children,
    value = "";
  if (typeof children === 'string') {
    if (children.length > 60) {
      value = <Tooltip title={<span>{children}</span>}>
        {children.substr(0, 60) + "..."}
      </Tooltip>;
    } else {
      value = children;
    }
  } else {
    value = children;
  }
  return <AntTag
    {...props}
    style={{ cursor: "text", borderRadius: "4px", margin: "0 5px 5px 0", ...(props.style || {}) }}
    children={value} />
};

export default Tag;
