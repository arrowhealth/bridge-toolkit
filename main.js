import './style.css'

document.querySelector('#app').innerHTML = `Getting patient info...`

globalThis.bridge.getPatientInfo().then(
  patientInfo => {
    document.querySelector('#app').innerHTML = '<strong>PATIENT INFO</strong><br><pre><code>' + JSON.stringify(patientInfo, null, 2) + '</code></pre>'
  }
)

globalThis.bridge.onPatientChanged(patientInfo => {
  document.querySelector('#app').innerHTML = '<strong>PATIENT INFO</strong><br><pre><code>' + JSON.stringify(patientInfo, null, 2) + '</code></pre>'
})
