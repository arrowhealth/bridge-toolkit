<script>
  import { getPatientInfo, onPatientChanged } from '@arrowhealth/bridge-sdk'

  const state = { patient: null }

  getPatientInfo().then((patient) => (state.patient = patient))

  onPatientChanged((patient) => (state.patient = patient))
</script>

<main>
  <h2>Bridge Starter (Svelte)</h2>
  <strong>PATIENT INFO</strong>
  <pre><code>{JSON.stringify(state.patient, null, 2)}</code></pre>
</main>

<style>
  :root {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 10px;
  }
</style>
