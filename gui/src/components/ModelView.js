import Header from './Header';
import GraphSection from './GraphSection';
import InformationSection from './InformationSection';

const ModelView = ( {model} ) => {
  return (
    <div className='modelView'>
        <div>
          <Header model={model} />
          <div style={viewStyle}>
            <GraphSection model={model}/>
            <InformationSection model={model}/>
          </div>
        </div>
    </div>
  )
}

ModelView.defaultProps = {
  modelTitle: 'Model Title',
}

const viewStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: '25px',
}

export default ModelView