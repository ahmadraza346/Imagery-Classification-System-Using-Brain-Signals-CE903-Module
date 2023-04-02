const Header = ({ model }) => {
  return (
    <div className='header'>
        <h1 className='modelTitle'>{model.modelName}</h1>
        <div>
            <button style={loadStyle}>Load Data</button>
            <button style={predictStyle}>Predict</button>
            <button style={saveStyle}>Save Predictions</button>
        </div>
    </div>
  )
}

const loadStyle = {
  backgroundColor: '#6FCF97',
  width: '100px',
  height: '50px',
  borderRadius: '15px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
}

const predictStyle = {
  backgroundColor: '#9B51E0',
  width: '100px',
  height: '50px',
  borderRadius: '15px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
}

const saveStyle = {
  backgroundColor: '#F2994A',
  width: '120px',
  height: '50px',
  borderRadius: '15px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
}


Header.defaultProps = {
    modelTitle: 'Model Title',
}

export default Header