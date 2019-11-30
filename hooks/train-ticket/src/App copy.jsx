import React, { Component, createContext } from 'react';
import logo from './logo.svg';
import './App.css';

const BatteryContext = createContext()
const OnlineContext = createContext()

class Leaf extends Component {
  static contextType = BatteryContext
  render() {
    const battery = this.context
    return (
      <>
      <h1>{battery}</h1>
        {/* <BatteryContext.Consumer>

          {
            battery => <h1>{battery}</h1>
          }

        </BatteryContext.Consumer> */}
        <OnlineContext.Consumer>{online => <p>{String(online)}</p>}</OnlineContext.Consumer>
      </>
    )
  }
}
class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  state = {
    val: 60,
    online: true
  }
  render() {
    const { val, online } = this.state
    return (
      <BatteryContext.Provider value={val}>
        <OnlineContext.Provider value={online} >
          <Middle />
          <button onClick={() => { this.setState({ val: val - 1 }) }}>click</button>
          <button onClick={() => { this.setState({ online: !online }) }}>switch</button>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}


export default App;
