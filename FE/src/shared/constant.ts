/* eslint-disable no-useless-escape */
import {
  ApartmentOutlined,
  IdcardOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  TeamOutlined,
  ProjectOutlined
} from '@ant-design/icons'
import PATH_URL from './path'

export const urlRegex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi

export const phoneRegex = /^(0)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])([0-9]{7})$/

export const SECONDS_IN_DAY = 86400

export const SIZEBAR_OPTIONS = [
  {
    key: 'members',
    label: 'Members',
    path: PATH_URL.members,
    icon: TeamOutlined
  },
  {
    key: 'gen',
    label: 'Generations',
    path: PATH_URL.gens,
    icon: SolutionOutlined
  },
  {
    key: 'events',
    label: 'Events',
    path: PATH_URL.events,
    icon: ScheduleOutlined
  },
  {
    key: 'sponsors',
    label: 'Sponsors',
    path: PATH_URL.sponsors,
    icon: IdcardOutlined
  },
  {
    key: 'department',
    label: 'Department',
    path: PATH_URL.department,
    icon: ApartmentOutlined
  },
  {
    key: 'products',
    label: 'Products',
    path: PATH_URL.products,
    icon: ProjectOutlined
  }
]

export const HEADER_OPTIONS = [
  {
    key: 'home',
    label: 'Home',
    path: PATH_URL.home
  },
  {
    key: 'department',
    label: 'Department',
    path: PATH_URL.homeDepartment
  },
  {
    key: 'events',
    label: 'Events',
    path: PATH_URL.homeEvents
  },
  {
    key: 'products',
    label: 'Products',
    path: PATH_URL.homeProducts
  },
  {
    key: 'activities',
    label: 'Activities',
    path: PATH_URL.homeActivities
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
  DELETE_SUCCESS: 'The item has been successfully deleted!',
  NOT_FOUND: 'The item does not exist.',
  SUCCESS_DELETE: 'Delete the item successfully.'
}

export const TOOLTIP_MESSAGE = {
  image: 'Only JPG, PNG files are allowed.'
}

export const IMAGE_FILETYPE = 'image/png, image/jpeg'

export enum DepartmentKey {
  'Backend' = 'Backend',
  'Frontend' = 'Frontend',
  'Marketing' = 'Marketing',
  'Event' = 'Event',
  'HR' = 'HR'
}

export const DepartmentTagColor = {
  [DepartmentKey.Backend]: 'red',
  [DepartmentKey.Frontend]: 'green',
  [DepartmentKey.Marketing]: 'purple',
  [DepartmentKey.Event]: 'yellow',
  [DepartmentKey.HR]: 'cyan'
}
