import { UploadProps } from 'antd'

export interface ReactWithChild {
  children: React.ReactNode
}

export type Dictionary<T> = Record<string, T>

export type ValidValue<T> = Exclude<T, null | undefined | 0 | '' | false>

export const BooleanFilter = <T>(x: T): x is ValidValue<T> => Boolean(x)
export type LazyLoadElement<T> = () => Promise<{ default: React.ComponentType<T> }>

export interface IRoute<T = string> {
  path: string
  element: LazyLoadElement<T>
}

export interface UploadRef extends UploadProps {
  onReset: () => void
}
