import { IdcardOutlined, SolutionOutlined, TeamOutlined } from '@ant-design/icons'

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
    key: 'events',
    label: 'Events',
    path: '/admin/events',
    icon: SolutionOutlined
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
  invalid: 'This field is invalid.'
}
