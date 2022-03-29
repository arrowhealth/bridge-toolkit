import { reactive } from "vue"

const state = reactive<{
  authOptions: any,
  config: any
}>({
  authOptions: [],
  config: null
})

const getConfig = async () => {
  const response = await fetch('config.json')
  state.config = await response.json()
  return state.config
}

const getAuthOptions = async () => {
  const response = await fetch('auth.json')
  state.authOptions = await response.json()
  return state.authOptions
}

export const useConfigStore = () => {
  return {
    state,
    getAuthOptions,
    getConfig,
  }
}