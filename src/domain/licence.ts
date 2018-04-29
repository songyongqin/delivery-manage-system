class Licence {
  overdue = false
  setOverdueStatus = value => {
    this.overdue = !!value
  }
  getLicenceStatus = () => {
    return this.overdue
  }
}

const licence = new Licence()

export const setOverdueStatus = licence.setOverdueStatus

export const isLicenceOverdue = licence.getLicenceStatus