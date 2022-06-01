import logo from './logo.svg';
import './App.css';

const App = () => {
  console.log("Hello from component")
  alert("Hello there!")
  const now = new Date();
  const userAgent = navigator.userAgent;
  return ( 
    <div className="App">
        <HelloWorld name="Lucius"/>
        <HelloWorld name="Tom"/>
        <HelloWorld />
        <p>Hello there! It is {now.toString()}</p>
        <p>Your user agent string is {userAgent}</p>
        <Footer/>
    </div>
  );
}


const HelloWorld = (props) => {
  let safeProps = props || {
    name: "abc123"
  }
  return (
    <div>
      <p><strong>Hello {safeProps.name}!</strong></p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      Sample app made by <a href="https://github.com/czlucius">Lucius Chee Zihan</a>

    </div>
  )
}

export default App;
