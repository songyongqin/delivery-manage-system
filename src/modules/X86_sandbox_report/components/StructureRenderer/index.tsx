import * as React from 'react'
const styles = require("./styles.less")
const PE_STRUCTURE_DATA_INDEX = "pestruct",
  COMPILE_TIME_DATA_INDEX = "compiletime",
  PACKER_DATA_INDEX = "packer",
  VERSION_DATA_INDEX = "version",
  PDB_DATA_INDEX = "pdb"

const textConfig = {
  [PACKER_DATA_INDEX]: "壳/编译器",
  [VERSION_DATA_INDEX]: "版本",
  [PDB_DATA_INDEX]: "PDB路径",
  [COMPILE_TIME_DATA_INDEX]: "编译时间"
}

const dataIndexes = [
  PACKER_DATA_INDEX,
  VERSION_DATA_INDEX,
  PDB_DATA_INDEX,
  COMPILE_TIME_DATA_INDEX
]

const renderer = {
  [VERSION_DATA_INDEX]: value => "N/A",
  [PACKER_DATA_INDEX]: value => value || "N/A",
  [PDB_DATA_INDEX]: value => value || "N/A",
  [COMPILE_TIME_DATA_INDEX]: value => value
}

export default (data) => {
  data = {
    ...data,
    ...data[PE_STRUCTURE_DATA_INDEX]
  }
  return <table className={styles["table"]}>
    <tbody>
      {
        dataIndexes.map((i, index) => {
          return (
            <tr key={i}>
              <td className={styles["title-cell"]}>
                {textConfig[i]}
              </td>
              <td>
                {
                  renderer[i](data[i])
                }
              </td>
            </tr>
          )
        })
      }

    </tbody>
  </table>
}