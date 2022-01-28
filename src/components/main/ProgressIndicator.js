const ProgressIndicator = ({step, numberOfQuestions}) => {
  if (step > 0) {
    return (
      <div className="progress-indicator">{step}/{numberOfQuestions}</div>
    )
  } else {
    return null;
  }
}

export default ProgressIndicator;