const InformationSection = ({ model }) => {
  let accuracy, predictions;
  if (model.accuracy != null){
    accuracy = <div><h2>Accuracy</h2><p>{model.accuracy}</p></div>;
  }else{
    accuracy = <div></div>
  }

  if (model.predictions != null){
    predictions = <div><h2>Predictions</h2><p>{model.predictions}</p></div>;
  }else{
    predictions = <div></div>
  }

  return (
    <div>
        <h1>Description</h1>
        <p>
            {model.description}
        </p>
        <h1>Results and Metrics</h1>
        <p>
            {model.results}
        </p>
        {accuracy}
        {predictions}
    </div>
  )
}

export default InformationSection