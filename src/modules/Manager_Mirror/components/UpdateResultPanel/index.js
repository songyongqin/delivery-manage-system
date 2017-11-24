import classnames from 'classnames';
import JoTag from 'components/JoTag'
import { Badge } from 'antd'

export default ({ data, isDark }) => {
  const { add = [], remove = [] } = data || {}

  const textClasses = classnames({
    ["lbl-dark"]: isDark
  })

  return <div >
    <h3 className={textClasses} style={{ margin: "5px", textAlign: "center" }}>
      升级镜像完成 更新结果如下
    </h3>
    <table className={"common-table"}>
      <tbody>
        <tr>
          <td className={textClasses}>
            <Badge status="success"></Badge>新增镜像
          </td>
          <td className={textClasses}>
            <Badge status="error"></Badge>删除镜像
            </td>
        </tr>
        <tr>
          <td>
            <div>
              {
                add.map((i, index) => {
                  return <JoTag key={`${index}-tag`} color="#108ee9">
                    {i}
                  </JoTag>
                })
              }
            </div>
          </td>
          <td>
            <div>
              {
                remove.map((i, index) => {
                  return <JoTag key={`${index}-tag`} color="#108ee9">
                    {i}
                  </JoTag>
                })
              }
            </div>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
}
