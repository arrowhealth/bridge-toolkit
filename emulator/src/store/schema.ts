import { AuthStatus } from '@arrowhealth/bridge-sdk'

export enum TargetType {
  PANEL = 'IFRAME',
  WINDOW = 'WINDOW',
  TAB = 'TAB',
  DRAWER = 'DRAWER',
}

export interface TileApp {
  id: string
  title: string
  icon: string
  static: Boolean
  url?: string
  tileUrl?: string
  width?: number
  height?: number
  settings?: object
  patientOnly?: boolean
  authUrl?: string
  target?: TargetType
  status: AuthStatus
}

export interface Config {
  settings?: {
    toolbarColor?: string
    signupShow?: boolean
    signupInstruct?: string
  }
  accountUrl?: string
  apps: TileApp[]
}
