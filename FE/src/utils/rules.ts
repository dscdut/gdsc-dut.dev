export const getRules = {
  require(name: string) {
    return {
      required: true,
      message: `Please select ${name}`
    }
  }
}
