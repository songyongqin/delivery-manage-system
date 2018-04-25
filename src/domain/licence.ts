

class Licence {
  overdue = false
  setLicenceStatus = value => {
    this.overdue = !!value
  }
  getLicenceStatus = () => {
    return this.overdue
  }
}

const licence = new Licence()

export const saveLicenceStatus = licence.setLicenceStatus

export const isLicenceOverdue = licence.getLicenceStatus