import './style.css'

const { getPatientInfo, onPatientChanged } = globalThis.bridge
let state = { patient: {} }

const setState = (updates) => {
  state = { ...state, ...updates
}
render()
}

const render = () => document.querySelector('#app').innerHTML = `<h2>Bridge Starter (Vanilla JS)</h2>
    <strong>PATIENT INFO</strong>
    <pre><code>${JSON.stringify(state.patient, null, 2)}</code></pre>`

const mounted = async () => {
  // check if patient is currently in view on initialization
  const patient = await getPatientInfo()
  setState({ patient })

  // listen for changes while application is open
  onPatientChanged(patient => setState({ patient }))
}

mounted()
