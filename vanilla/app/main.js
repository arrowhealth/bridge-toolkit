import './style.css'

console.log(`Bridge SDK v${bridge.version}`)

let state = {
  authUser: {},
  authStatus: {},
  patient: {}
}

globalThis.getPatient = () => {
  bridge.getPatient().then(v => {
    console.log('patient', v)
    state.patient = v
  })
}

const setState = (updates) => {
  state = {
    ...state,
    ...updates,
  }
  render()
}

const render = () => document.querySelector('#app').innerHTML = `<div>
  <h2>Starter App (Vanilla JS)</h2>
  <div class="section">
    <div class="title">Using Bridge SDK v${bridge.version}</div>
    <div>Inside Bridge: ${bridge.inBridge.toString()}</div>
    <div>Inside Iframe: ${bridge.inIframe.toString()}</div>
    <div>Inside Popout: ${bridge.inPopout.toString()}</div>
  </div>

  <div class="section">
    <div class="title">Bridge User</div>
    <pre><code>${JSON.stringify(state.authUser, null, 2)}</code></pre>
  </div>

  <div class="section">
    <div class="title">Authentication Status</div>
    <div class="actions">
      <button onclick="bridge.setAuthStatus('require')">Login Required</button>
      <button onclick="bridge.setAuthStatus('fail')">Auth Failed</button>
      <button onclick="bridge.setAuthStatus('pass')">Auth Passed</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Patient</div>
    <button onclick="getPatient()">Get Patient</button>
    <pre><code>${JSON.stringify(state.patient, null, 2)}</code></pre>
  </div>

  <div class="section">
    <div class="title">Badge</div>
    <div class="actions">
      <button onclick="bridge.setBadgeCount(0)">0</button>
      <button onclick="bridge.setBadgeCount(9)">9</button>
      <button onclick="bridge.setBadgeCount(99)">99</button>
      <button onclick="bridge.setBadgeCount(999)">999</button>
      <button onclick="bridge.setBadgeCount(9999)">9999</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Tile</div>
    <div class="actions">
      <button onclick="bridge.showTile()">Show</button>
      <button onclick="bridge.hideTile()">Hide</button>
      <button onclick="bridge.enableTile()">Enable</button>
      <button onclick="bridge.disableTile()">Disable</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Smart Tile</div>
    <p>These actions would only be done in your smart tile. They are here
      for demonstration purposes only
    </p>
    <div class="actions">
      <button onclick="bridge.captureUserEvents()">Capture User Events</button>
      <button onclick="bridge.releaseUserEvents()">Release User Events</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Application</div>
    <div class="actions">
      <button onclick="bridge.closeApp()">Close App</button>
    </div>
  </div>
</div>`

const mounted = async () => {
  bridge.getAuthUser().then((v) => setState({ authUser: v }))
  bridge.getAuthStatus().then((v) => setState({ authStatus: v }))
  bridge.getPatient().then((v) => setState({ patient: v }))
  bridge.onPatientChanged((v) => setState({ patient: v }))
}

mounted()
