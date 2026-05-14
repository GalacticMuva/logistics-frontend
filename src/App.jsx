import { useState, useEffect } from 'react'
import API_BASE_URL from './api'

function App() {
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
 fetch('${API_BASE_URL}/drivers') 
      .then(res => res.json())
      .then(data => setDrivers(data))
      .catch(err => console.error("Connection Error:", err));

  }, [])

  return (

    <div className="App">
      <h1>Logistics Management</h1>
      
      <section>
        <h2>Driver Management</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>License Type</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {drivers.map((driver) => (
        <tr key={driver.id}>
          <td>{driver.name}</td>
          <td>{driver.license_type}</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
      </section>


      <section>
        <h2>Vehicle Management</h2>
        {/* Your Vehicle components will go here */}
      </section>
    </div>
  )
}

export default App