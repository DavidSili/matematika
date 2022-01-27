const ProgressIndicator = ({step, numberOfQuestions}) => {
  return (
    <div className="progress-indicator">{step}/{numberOfQuestions}</div>
  )
}

export default ProgressIndicator;