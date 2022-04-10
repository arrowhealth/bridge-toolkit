<script>
  import * as bridge from '@arrowhealth/bridge-sdk'

  const state = {
    authUser: null,
    authStatus: null,
    patient: null,
  }

  const getPatient = () => {
    bridge.getPatient().then(v => {
      console.log('patient', v)
      state.patient = v
    })
  }

  bridge.getAuthUser().then(v => (state.authUser = v))
  bridge.getAuthStatus().then(v => (state.authStatus = v))
  bridge.getPatient().then(v => (state.patient = v))
  bridge.onPatientChanged(v => (state.patient = v))
</script>

<main>
  <h2>Starter App (Svelte)</h2>

  <div class="section">
    <div class="title">Using Bridge SDK v{bridge.version}</div>
    <div>Inside Bridge: {bridge.inBridge}</div>
    <div>Inside Iframe: {bridge.inIframe}</div>
    <div>Inside Popout: {bridge.inPopout}</div>
  </div>

  <div class="section">
    <div class="title">Bridge User</div>
    <pre><code>{JSON.stringify(state.authUser, null, 2)}</code></pre>
  </div>

  <div class="section">
    <div class="title">Authentication Status</div>
    <div class="actions">
      <button on:click={() => bridge.setAuthStatus('require')}>Login Required</button>
      <button on:click={() => bridge.setAuthStatus('fail')}>Auth Failed</button>
      <button on:click={() => bridge.setAuthStatus('pass')}>Auth Passed</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Patient</div>
    <button on:click={() => getPatient()}>Get Patient</button>
    <pre><code>{JSON.stringify(state.patient, null, 2)}</code></pre>
  </div>

  <div class="section">
    <div class="title">Badge</div>
    <div class="actions">
      <button on:click={() => bridge.setBadgeCount(0)}>0</button>
      <button on:click={() => bridge.setBadgeCount(9)}>9</button>
      <button on:click={() => bridge.setBadgeCount(99)}>99</button>
      <button on:click={() => bridge.setBadgeCount(999)}>999</button>
      <button on:click={() => bridge.setBadgeCount(9999)}>9999</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Tile</div>
    <div class="actions">
      <button on:click={() => bridge.showTile()}>Show</button>
      <button on:click={() => bridge.hideTile()}>Hide</button>
      <button on:click={() => bridge.enableTile()}>Enable</button>
      <button on:click={() => bridge.disableTile()}>Disable</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Smart Tile</div>
    <p>These actions are performed within a Smart Tile. They are here for demonstration purposes only.</p>
    <div class="actions">
      <button on:click={() => bridge.captureUserEvents()}>Capture User Events</button>
      <button on:click={() => bridge.releaseUserEvents()}>Release User Events</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Application</div>
    <div class="actions">
      <button on:click={() => bridge.closeApp()}>Close App</button>
    </div>
  </div>
</main>

<style>
  :root {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 10px;
  }

  .section {
    background-color: #f9f9f9;
    padding: 12px 20px;
    border-radius: 10px;
    margin-bottom: 18px;
  }

  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
  }
</style>
