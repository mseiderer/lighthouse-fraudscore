import { Button } from "./Form";
import { Questions } from "./Questions";
import "./Calculator.css";
import { useState } from "react";
import { score } from "./Scoring";

export const Calculator = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: parseInt(value) });
  };

  const form = Questions.map((item, i) => {
    if (item.component === "question") {
      return (
        <Question
          guidance={item.guidance}
          id={item.id}
          key={i}
          onOptionChange={handleChange}
          options={item.options}
          showScoreImpact={item.showScoreImpact}
          text={item.text}
          title={item.title}
          value={formData[item.id]}
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
      <div className='calculator-form'>{form}</div>
      <ResultsTable formData={formData} />
    </div>
  );
};

export const Question = ({
  guidance,
  id,
  onOptionChange,
  showScoreImpact,
  options,
  text,
  title,
  value,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const className = collapsed ? " collapsed" : "";
  const toggleCollapse = (e) => {
    if (!e.isComposing && (e.keyCode === 32 || e.keyCode === 13)) {
      e.preventDefault();
      setCollapsed(!collapsed);
    }
  };

  const handleChange = (value) => onOptionChange(id, value);

  return (
    <div className={"Question" + className} id={id}>
      <div
        className='question-header'
        tabIndex={0}
        onClick={() => setCollapsed(!collapsed)}
        onKeyDown={toggleCollapse}
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
              checked={parseInt(value) === option.value}
              onChange={handleChange}
              key={i}
              label={option.label}
            />
          ))}
        </fieldset>
        <NavButtons />
      </div>
    </div>
  );
};

export const QuestionOption = ({ label, value, checked, onChange }) => {
  return (
    <div className='QuestionOption'>
      <label>
        <input
          type='radio'
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
        />
        <div>{label}</div>
      </label>
      <ScoreImpactLabel scoreImpact={100} />
    </div>
  );
};

export const NavButtons = (props) => {
  return (
    <div className='NavButtons'>
      <Button no-outline narrow>
        Back
      </Button>
      <Button primary narrow>
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

export const ScoreImpactLabel = (props) => {
  let scoreImpact;
  if (props.scoreImpact >= 0) {
    scoreImpact = "+" + props.scoreImpact;
  } else {
    scoreImpact = "–" + Math.abs(props.scoreImpact);
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

export const ResultsTable = ({ formData }) => {
  const results = score(formData);

  return (
    <div className='ResultsTable'>
      <SectionHeader
        title='Results'
        text='Lorem ipsum here are the results. Everything over 1000 is high and triggers some protocol yolo.'
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
  <div className='Result'>
    <div>
      <div className='result-key'>{title}</div>
      <div className='result-value'>{score}</div>
    </div>
    <div>
      <p>{description}</p>
    </div>
  </div>;
};
