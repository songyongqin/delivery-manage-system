
import * as React from 'react'
import { Menu, Upload } from 'antd'


interface UploadMenuPros {
  uploadFiles: (any:any) => void;
  // text: string;
  // types: string;
}

class UploadMenu extends React.Component<UploadMenuPros, any>{
  render(){
    const { uploadFiles,  } = this.props
    return(
      <Menu>
        <Menu.Item>
          <Upload  customRequest={ uploadFiles } fileList={[]} data={{ types:"C2" }}  >
            <div  >
              { "C2威胁情报" }
            </div>
          </Upload>
        </Menu.Item>
        <Menu.Item>
          <Upload  customRequest={ uploadFiles } fileList={[]} data={{ types:"APT" }}  >
            <div  >
              { "APT威胁情报" }
            </div>
          </Upload>
        </Menu.Item>
        <Menu.Item>
          <Upload  customRequest={ uploadFiles } fileList={[]} data={{ types:"DDOS" }}  >
            <div  >
              { "DDOS威胁情报" }
            </div>
          </Upload>
        </Menu.Item>
        <Menu.Item>
          <Upload  customRequest={ uploadFiles } fileList={[]} data={{ types:"Honeynet" }}  >
            <div  >
              { "Honeynet漏洞数据" }
            </div>
          </Upload>
        </Menu.Item>
      </Menu>
    )
  }
}


export default UploadMenu