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
            to='/scorekaart'
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Scorekaart
          </NavLink>
          {/* <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            About
          </NavLink> */}
        </nav>
        {/* <Link to='#'>NL</Link> */}
      </div>
      <Outlet />
    </div>
  );
};

export const Home = () => {
  return (
    <div className='Home'>
      <div className='hero'>
        <h1>
          Hoe Nederlandse gemeenten frauderisicoscores berekenden van mensen met
          een bijstandsuitkering – en sommige gemeenten dit nog steeds doen
        </h1>
        <div className='hero-caption'>
          <p>
            Lighthouse Reports heeft inzage gekregen in de fraudescorekaart; een
            spreadsheet en simpel algoritme gebruikt om mensen met een
            bijstandsuitkering te profileren op frauderisico.
          </p>
          <p>
            Om te laten zien hoe deze kaart werkt hebben we deze interactieve
            reconstructie ontwikkeld.
          </p>
        </div>
      </div>
      <div className='cta-buttons'>
        <Link to='/scorekaart'>
          <Button>Bereken je score</Button>
        </Link>
        <a href='https://nrc.nl' target='_blank' rel='noreferrer'>
          <Button secondary>Lees meer bij NRC</Button>
        </a>
        <a href='https://vpro.nl' target='_blank' rel='noreferrer'>
          <Button secondary>Lees meer bij de VPRO</Button>
        </a>
      </div>
      <div className='credits'>
        <p>Een project van Lighthouse Reports, VPRO en NRC.</p>
      </div>
    </div>
  );
};

export const About = () => {
  return <div></div>;
};

export default App;
