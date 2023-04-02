import './App.css';
import { useState } from 'react'

import Sidebar from './components/Sidebar';
import ModelView from './components/ModelView';

function App() {
  const [model, setModel] = useState(
    {
      id: 0,
      modelName: 'Welcome',
      description: 'Please select a model from the sidebar to get started.',
      results: 'The site will display the results once the model is loaded.',
    }
  )

  return (
    <div className="App">
      <Sidebar model={model} setModel={setModel}/>
      <ModelView model={model}/>
    </div>
  );
}

export default App;

