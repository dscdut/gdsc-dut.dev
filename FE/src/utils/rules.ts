import { ERROR_MESSAGE} from 'src/shared/constant'

export const getRules = {
  require() {
    return {
      required: true,
      message: `Please select ${name}`
    }
  }
}
