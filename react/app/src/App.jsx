import { Component } from 'react'
import * as bridge from '@arrowhealth/bridge-sdk'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authUser: {},
      authStatus: {},
      patient: {},
    }
  }

  componentDidMount() {
    bridge.getAuthUser().then((v) => this.setState({ authUser: v }))
    bridge.getAuthStatus().then((v) => this.setState({ authStatus: v }))
    bridge.getPatient().then((v) => this.setState({ patient: v }))
    bridge.onPatientChanged((v) => this.setState({ patient: v }))
  }

  render() {
    return (
      <div>
        <h2>Starter App (React)</h2>

        <div className="section">
          <div className="title">Bridge User</div>
          <pre>
            <code>{JSON.stringify(this.state.authUser, null, 2)}</code>
          </pre>
        </div>

        <div className="section">
          <div className="title">Authentication Status</div>
          <div className="actions">
            <button onClick={() => bridge.setAuthStatus('require')}>Login Required</button>
            <button onClick={() => bridge.setAuthStatus('fail')}>Auth Failed</button>
            <button onClick={() => bridge.setAuthStatus('pass')}>Auth Passed</button>
          </div>
        </div>

        <div className="section">
          <div className="title">Patient</div>
          <pre>
            <code>{JSON.stringify(this.state.patient, null, 2)}</code>
          </pre>
        </div>

        <div className="section">
          <div className="title">Badge</div>
          <div className="actions">
            <button onClick={() => bridge.setBadgeCount(0)}>0</button>
            <button onClick={() => bridge.setBadgeCount(9)}>9</button>
            <button onClick={() => bridge.setBadgeCount(99)}>99</button>
            <button onClick={() => bridge.setBadgeCount(999)}>999</button>
            <button onClick={() => bridge.setBadgeCount(9999)}>9999</button>
          </div>
        </div>

        <div className="section">
          <div className="title">Tile</div>
          <div className="actions">
            <button onClick={() => bridge.showTile()}>Show</button>
            <button onClick={() => bridge.hideTile()}>Hide</button>
            <button onClick={() => bridge.enableTile()}>Enable</button>
            <button onClick={() => bridge.disableTile()}>Disable</button>
          </div>
        </div>

        <div className="section">
          <div className="title">Smart Tile</div>
          <p>These actions would only be done in your smart tile. They are here for demonstration purposes only</p>
          <div className="actions">
            <button onClick={() => bridge.captureUserEvents()}>Capture User Events</button>
            <button onClick={() => bridge.releaseUserEvents()}>Release User Events</button>
          </div>
        </div>

        <div className="section">
          <div className="title">Application</div>
          <div className="actions">
            <button onClick={() => bridge.closeApp()}>Close App</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
