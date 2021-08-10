const toolsFunction = {
  dateToString(date) {
    const day = ('0' + String(date.getDate())).slice(-2)
    const month = ('0' + String(date.getMonth() + 1)).slice(-2)
    const year = String(date.getFullYear())
    const dateArray = [year, month, day]
    return dateArray.join('-')

    // return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
    //   .toISOString()
    //   .split("T")[0]
  }
}

module.exports = toolsFunction