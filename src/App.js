import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


import { Button } from 'antd';

// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//     <Button type="primary" size="large">Button</Button>
       




//   );
// }


 class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {redirect: false};
    }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
    renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

    render() {
      return (
        <div>
        {this.renderRedirect()}
        <div className="App">
          <Button type="primary" size="large" shape="round" className="go-to-login" onClick={this.setRedirect}>Go To Login</Button>
          
        </div>
        </div>
      );
    }
  }

export default App;
