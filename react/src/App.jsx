import { Component } from 'react'
import { getPatientInfo, onPatientChanged } from '@arrowhealth/bridge-sdk'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: {},
    }
  }

  async componentDidMount() {
    // check if patient is currently in view on initialization
    const patientInfo = await getPatientInfo()
    this.setState({ patient: patientInfo })

    // listen for changes while application is open
    onPatientChanged((patientInfo) => this.setState({ patient: patientInfo }))
  }

  render() {
    return (
      <div>
        <h2>Bridge Starter (React)</h2>
        <strong>PATIENT INFO</strong>
        <pre>
          <code>{JSON.stringify(this.state.patient, null, 2)}</code>
        </pre>
      </div>
    )
  }
}

export default App
