import graph from '../images/graph.png';

const GraphSection = ({ model }) => {
  let imageElement
  if (model.imageURL == null){
    imageElement = <img src={graph} alt="Graph" className="graphImage" />
  }else{
    imageElement = <img src={model.imageURL} alt="Graph" className="graphImage" />
  }

  return (
    <div>
        <h1>Graph</h1>
        {imageElement}
    </div>
  )
}

export default GraphSection