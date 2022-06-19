import { Link, Outlet } from "react-router-dom";
import "./App.css";

export const App = () => {
  return (
    <div className='App'>
      <div className='navbar'>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/calculator'>Calculator</Link>
        </nav>
        <Link to='#'>NL</Link>
      </div>
      <Outlet />
    </div>
  );
};

export const Home = () => {
  return (
    <div>
      <div className='hero'>
        <h1>How the Dutch state calculates welfare things lorem ipsum</h1>
      </div>
      <div className='cta-buttons'></div>
      <div className='credits'></div>
    </div>
  );
};

export const Calculator = () => {
  return <div />;
};

export default App;
