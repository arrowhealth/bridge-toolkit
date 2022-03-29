import { reactive } from "vue"
import { Patient } from '@arrowhealth/bridge-sdk'

const state = reactive<{
  patients: Patient[]
}>({
  patients: []
})

const getPatients = async (): Promise<Patient[]> => {
  if (!state.patients.length) {
    const response = await fetch('patients.json')
    state.patients = await response.json()
  }
  return state.patients
}

const getPatient = async (id: string): Promise<Patient | null> => {
  const results = state.patients.filter((patient: Patient) => patient.id === id)
  if (results.length) return results[0]
  return null
}

export const usePatientStore = () => {
  return {
    state,
    getPatients,
    getPatient,
  }
}