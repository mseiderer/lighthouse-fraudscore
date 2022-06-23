import { Button } from "./Form";
import { Questions } from "./Questions";
import "./Calculator.css";
import { useState } from "react";
import { score } from "./Scoring";
import { Scores } from "./Scores";

export const Calculator = () => {
  const [expanded, setExpanded] = useState();
  const [formData, setFormData] = useState({});
  // Score used to calculate impact
  // eslint-disable-next-line no-unused-vars
  const [selectedScore, setSelectedScore] = useState();
  const handleSelectionChange = (id) => {
    if (id === selectedScore) {
      setSelectedScore();
    } else {
      setSelectedScore(id);
    }
  };
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
      return (
        <SectionHeader
          key={i}
          id={item.id}
          title={item.title}
          text={item.text}
        />
      );
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
        <Button onClick={() => navigate("arbeidsuren")}>Start</Button>
      </div>
      <div className='calculator-form'>
        {/* <Question
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
        /> */}
        {form}
      </div>
      <ResultsTable
        results={results}
        selected={selectedScore}
        onSelectionChange={handleSelectionChange}
      />
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
        <div className='marker'></div>
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
      <Button no_outline narrow onClick={() => navigate(prev)}>
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

export const SectionHeader = ({ title, text, id }) => {
  return (
    <div className='SectionHeader' id={id}>
      <h2>{title}</h2>
      {text && (
        <div className='sectionheader-text-container'>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export const ResultsTable = ({ results, onSelectionChange, selected }) => {
  return (
    <div className='ResultsTable'>
      {Scores.map((score) => (
        <Result
          title={score.title}
          id={score.id}
          key={score.id}
          description={score.description}
          score={results[score.id]}
          selected={score.id === selected}
          onSelect={() => onSelectionChange(score.id)}
        ></Result>
      ))}
    </div>
  );
};

export const Result = ({ title, description, score, onSelect, selected }) => {
  const className = score > 1000 ? " high" : "";
  const [expanded, setExpanded] = useState(false);

  const toggleCollapse = () => setExpanded(!expanded);
  const handleKeyDown = (e) => {
    if (!e.isComposing && (e.keyCode === 32 || e.keyCode === 13)) {
      e.preventDefault();
      toggleCollapse();
    }
  };

  return (
    <div className={"Result" + (expanded ? "" : " collapsed")}>
      <div
        className='result-header'
        tabIndex={0}
        onClick={toggleCollapse}
        onKeyDown={handleKeyDown}
      >
        <div className='marker'></div>
        <h3>{title}</h3>
        <div className={"result-value" + className}>{score}</div>
      </div>
      <div className='result-body'>
        <div className='result-text-container'>{description}</div>
        <div className='select-container'>
          {selected ? (
            <Button narrow secondary onClick={onSelect}>
              Deselect
            </Button>
          ) : (
            <Button narrow onClick={onSelect}>
              Select
            </Button>
          )}
          <div className='info-label'>
            Select this scoring algorithm and see how your answers influence the
            score.
          </div>
        </div>
      </div>
    </div>
  );
};
