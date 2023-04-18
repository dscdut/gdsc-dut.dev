import { IdcardOutlined, ScheduleOutlined, SolutionOutlined, TeamOutlined } from '@ant-design/icons'

export const urlRegex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi

export const SECONDS_IN_DAY = 86400

export const SIZEBAR_OPTIONS = [
  {
    key: 'members',
    label: 'Members',
    path: '/admin/members',
    icon: TeamOutlined
  },
  {
    key: 'gen',
    label: 'Generations',
    path: '/admin/gens',
    icon: SolutionOutlined
  },
  {
    key: 'events',
    label: 'Events',
    path: '/admin/events',
    icon: ScheduleOutlined
  },
  {
    key: 'sponsors',
    label: 'Sponsors',
    path: '/admin/sponsors',
    icon: IdcardOutlined
  }
]

export const ERROR_MESSAGE = {
  required: 'This field is required.',
  invalid: 'This field is invalid.',
  invalidImage: 'Uploaded file is not a valid image. Only JPG, PNG files are allowed.'
}

export const TOAST_MESSAGE = {
  ERROR: 'Oops! Something went wrong. Please try again later.',
  SUCCESS: 'Your data has been successfully saved!',
  DELETE_SUCCESS: 'The item has been successfully deleted!'
}

export const TOOLTIP_MESSAGE = {
  image: 'Only JPG, PNG files are allowed.'
}

export const IMAGE_FILETYPE = 'image/png, image/jpeg'
