export enum TargetType {
  PANEL = 'IFRAME',
  WINDOW = 'WINDOW',
  TAB = 'TAB',
  DRAWER = 'DRAWER',
}

export enum AppStatus {
  pending = '',
  auth = 'auth',
  ready = 'ready',
  alert = 'alert',
}

export interface App {
  id: string
  title: string
  icon: string
  static: Boolean
  url?: string
  tileUrl?: string
  width?: number
  height?: number
  settings?: any
  patientOnly?: boolean
  authUrl?: string
  target?: TargetType
  status?: AppStatus
}