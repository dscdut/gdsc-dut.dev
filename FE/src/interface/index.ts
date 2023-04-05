import type { MenuProps } from 'antd'

export type IMenu = Required<MenuProps>['items'][number] & { path: string }
