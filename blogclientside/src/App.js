import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {apiResponse:""};
  };
  // getData() {
  //   // create a new XMLHttpRequest
  //   var xhr = new XMLHttpRequest()

  //   // get a callback when the server responds
  //   xhr.addEventListener('load', () => {
  //     // update the state of the component with the result here
  //     console.log(xhr.responseText)
  //   })    // open the request with the verb and the url
  //   xhr.open('GET', 'http://localhost:9000/api/')
  //   // send the request
  //   xhr.send()
  //   this.setState({apiResponse:xhr.response})
  // };
  callAPI() {
    fetch("http://localhost:9000/api")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
    }

componentWillMount() {
    this.callAPI();
}
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code> src / App.js </code> and save to reload.{' '}
        </p>{' '}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React{' '}
        </a>{' '}
        <p className="App-intro">{this.state.apiResponse}</p>
      </header>{' '}
    </div>
  );}
}

export default App;
