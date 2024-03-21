import './App.css';
import Body from './Components/Body/Body';
import Header from './Components/Headers/Header';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <header className=""><Header />
      </header>
      <body>
        <Body />
      </body>
    </div>
  );
}

export default App;
