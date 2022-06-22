import { Button } from "./Form";
import { Questions } from "./Questions";
import "./Calculator.css";
import { useState } from "react";
import { score } from "./Scoring";

export const Calculator = () => {
  const [expanded, setExpanded] = useState();
  const [formData, setFormData] = useState({});
  // Score used to calculate impact
  const [selectedScore, setSelectedScore] = useState();
  const results = score(formData);
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: parseInt(value) });
  };

  const calculateImpact = (id, options) => {
    if (selectedScore) {
      return options.map((option) => ({
        ...option,
        impact:
          score({ ...formData, [id]: option.value })[selectedScore] -
          results[selectedScore],
      }));
    } else {
      return options;
    }
  };

  const toggleCollapse = (id) => {
    if (expanded === id) {
      setExpanded();
    } else {
      setExpanded(id);
    }
  };

  const navigate = (id) => {
    setExpanded(id);
    setTimeout(() => {
      const target = document.getElementById(id);
      target.scrollIntoView({ behavior: "smooth" });
      // document.location.href = "#" + id;
    }, 200);
  };

  const form = Questions.map((item, i) => {
    if (item.component === "question") {
      return (
        <Question
          guidance={item.guidance}
          id={item.id}
          key={i}
          onChange={handleChange}
          options={calculateImpact(item.id, item.options)}
          text={item.text}
          title={item.title}
          value={formData[item.id]}
          toggleCollapse={toggleCollapse}
          expanded={expanded === item.id}
          next={item.nextId}
          prev={item.prevId}
          navigate={navigate}
        />
      );
    } else if (item.component === "section") {
      return <SectionHeader key={i} title={item.title} text={item.text} />;
    } else {
      throw new Error("Unknown component in form");
    }
  });

  return (
    <div className='Calculator'>
      <div className='calculator-intro'>
        <div>
          <h1>This is the headline</h1>
          <div>
            <p>
              Select a model (you can change it later) and click some buttons
              yolo. If you don’t feel like clicking some buttons, start with a
              pre-filled example:
            </p>
            {/* TODO */}
            <p>Example for high address fraud risk</p>
            <p>Example for high white fraud risk</p>
          </div>
        </div>
        {/* TODO */}
        <Button>Start</Button>
      </div>
      <div className='calculator-form'>
        <Question
          id='score'
          onChange={(_, value) => setSelectedScore(value)}
          options={[
            { label: "Witte fraude", value: "witteFraude" },
            { label: "Grijze fraude", value: "grijzeFraude" },
            { label: "Zwarte fraude", value: "zwarteFraude" },
            { label: "Vermogensfraude", value: "vermogensfraude" },
            { label: "Samenlevingsfraude", value: "samenlevingsfraude" },
            { label: "Adresfraude", value: "adresfraude" },
          ]}
          text='Select a score to see how your answers affect it. You get results for all scores at the end.'
          title='Scoring algorithm'
          value={selectedScore}
        />
        {form}
      </div>
      <ResultsTable results={results} />
    </div>
  );
};

export const Question = ({
  guidance,
  id,
  onChange,
  options,
  text,
  title,
  value,
  expanded,
  toggleCollapse,
  prev,
  next,
  navigate,
}) => {
  const className = !expanded ? " collapsed" : "";
  const handleKeyDown = (e) => {
    if (!e.isComposing && (e.keyCode === 32 || e.keyCode === 13)) {
      e.preventDefault();
      toggleCollapse(id);
    }
  };

  const handleChange = (value) => onChange(id, value);

  return (
    <div className={"Question" + className} id={id}>
      <div
        className='question-header'
        tabIndex={0}
        onClick={() => toggleCollapse(id)}
        onKeyDown={handleKeyDown}
      >
        <h3>{title}</h3>
      </div>
      <div className='question-body'>
        <div>{text}</div>
        {guidance && <Guidance>{guidance}</Guidance>}
        <fieldset>
          {options.map((option, i) => (
            <QuestionOption
              value={option.value}
              // Just gruesome lmao
              checked={value + "" === option.value + ""}
              onChange={handleChange}
              impact={option.impact}
              key={i}
              label={option.label}
            />
          ))}
        </fieldset>
        <NavButtons prev={prev} next={next} navigate={navigate} />
      </div>
    </div>
  );
};

export const QuestionOption = ({ label, value, checked, onChange, impact }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className='QuestionOption'>
      <label>
        <input
          type='radio'
          value={value}
          checked={checked}
          onChange={handleChange}
        />
        <div>{label}</div>
      </label>
      {impact !== undefined && !checked ? (
        <ScoreImpactLabel impact={impact} />
      ) : (
        ""
      )}
    </div>
  );
};

export const NavButtons = ({ prev, next, navigate }) => {
  return (
    <div className='NavButtons'>
      <Button no-outline narrow onClick={() => navigate(prev)}>
        Back
      </Button>
      <Button primary narrow onClick={() => navigate(next)}>
        Next
      </Button>
    </div>
  );
};

export const Guidance = (props) => {
  return (
    <details className='Guidance'>
      <summary>Guidance</summary>
      <div className='guidance-details'>{props.children}</div>
    </details>
  );
};

export const ScoreImpactLabel = ({ impact }) => {
  let scoreImpact;
  if (impact >= 0) {
    scoreImpact = "+" + impact;
  } else {
    scoreImpact = "–" + Math.abs(impact);
  }

  return <div className='ScoreImpactLabel'>{scoreImpact}</div>;
};

export const SectionHeader = ({ title, text }) => {
  return (
    <div className='SectionHeader'>
      <h2>{title}</h2>
      {text && (
        <div className='sectionheader-text-container'>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export const ResultsTable = ({ results }) => {
  return (
    <div className='ResultsTable'>
      <Result
        title='Witte fraude'
        description='Lorem ipsum white fraud is fraud that can be uncovered by exchanging data with the tax office.'
        score={results.witteFraude}
      />
      <p>Witte fraude: {results.witteFraude}</p>
      <p>Grijze fraude: {results.grijzeFraude}</p>
      <p>Zwarte fraude: {results.zwarteFraude}</p>
      <p>Vermogensfraude: {results.vermogensfraude}</p>
      <p>Samenlevingsfraude: {results.samenlevingsfraude}</p>
      <p>Adresfraude: {results.adresfraude}</p>
    </div>
  );
};

export const Result = ({ title, description, score }) => {
  const className = score > 1000 ? " high" : "";
  return (
    <div className='Result'>
      <div>
        <div className='result-key'>{title}</div>
        <div className={"result-value" + className}>{score}</div>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
};
