import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "./Form";
import "./App.css";

export const App = () => {
  return (
    <div className='App'>
      <div className='navbar'>
        <nav>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to='/calculator'
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Calculator
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            About
          </NavLink>
        </nav>
        <Link to='#'>NL</Link>
      </div>
      <Outlet />
    </div>
  );
};

export const Home = () => {
  return (
    <div className='Home'>
      <div className='hero'>
        <h1>How the Dutch state calculates welfare things lorem ipsum</h1>
        <div className='hero-caption'>
          <p>
            The investigative journalists at lightvessel acquired an Excel
            spreadsheet and made a website
          </p>
        </div>
      </div>
      <div className='cta-buttons'>
        <Button>Calculate your score</Button>
        <Button>Read more at NRC</Button>
        <Button>Read more at VPRO</Button>
      </div>
      <div className='credits'>
        <p>
          A project by Lightvessel Reports, VPRO, some American foundation and a
          range of other people
        </p>
      </div>
    </div>
  );
};

export const About = () => {
  return <div></div>;
};

export default App;
