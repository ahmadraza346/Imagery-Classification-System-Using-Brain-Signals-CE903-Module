const Sidebar = ({ model, setModel }) => {
    return (
   <div className='sidebar'>
       <h1 className='sidebarTitle'>Models</h1>
       <button className='sidebarModel' onClick={() => fetch("http://localhost:4000/modelOne").then(result => result.json()).then(data=>setModel(data))}>
           Model 1
       </button>
       <br/>
       <button className='sidebarModel' onClick={() => fetch("http://localhost:4000/modelTwo").then(result => result.json()).then(data=>setModel(data))}>
           Model 2
       </button>
       <br/>
       <button className='sidebarModel' onClick={() => fetch("http://localhost:4000/modelThree").then(result => result.json()).then(data=>setModel(data))}>
           Model 3
       </button>
   </div>
  )
}

export default Sidebar