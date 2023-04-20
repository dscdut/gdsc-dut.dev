export const getRules = {
  require(name: string) {
    return {
      required: true,
      message: `Vui lòng nhập ${name}`
    }
  }
}
