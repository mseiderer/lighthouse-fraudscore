import { Button } from "./Form";
import { Questions } from "./Questions";
import "./Calculator.css";

export const Calculator = () => {
  const form = Questions.map((item) => {
    if (item.component === "question") {
      return <Question id={item.key} {...item} />;
    } else if (item.component === "section") {
      return <SectionHeader {...item} />;
    } else {
      return <div></div>;
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
            <p>Example for high address fraud risk</p>
            <p>Example for high white fraud risk</p>
          </div>
        </div>
        <Button>Start</Button>
      </div>
      <div className='calculator-form'>{form}</div>
    </div>
  );
};

export const Question = (props) => {
  const options = props.options.map((option) => <QuestionOption {...option} />);
  const className = props.collapsed ? " collapsed" : "";

  return (
    <div className={"Question" + className} id={props.id}>
      <div className='question-header' tabIndex={0}>
        <h3>{props.title}</h3>
      </div>
      <div className='question-body'>
        <div>{props.text}</div>
        {props.guidance && <Guidance>{props.guidance}</Guidance>}
        <fieldset>{options}</fieldset>
        <NavButtons />
      </div>
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

export const QuestionOption = (props) => {
  return (
    <div className='QuestionOption'>
      <label>
        <input type='radio' />
        <div>{props.label}</div>
      </label>
      <ScoreImpactLabel scoreImpact={100} />
    </div>
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

export const SectionHeader = (props) => {
  return (
    <div className='SectionHeader'>
      <h2>{props.title}</h2>
      {props.text && (
        <div className='sectionheader-text-container'>
          <p>{props.text}</p>
        </div>
      )}
    </div>
  );
};

export const ResultsTable = () => {
  return <div></div>;
};
