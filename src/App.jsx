import { useState, useEffect } from 'react'
import API_BASE_URL from './api'

function App() {
  const [drivers, setDrivers] = useState([])
  const [routes, setRoutes] = useState([])
  const [name, setName] = useState('') // Day 1 state
  const [newPackage, setNewPackage] = useState({ description: '', route_id: '' })

  // 1. GET ALL DATA
  const refreshData = () => {
    fetch(`${API_BASE_URL}/drivers`).then(res => res.json()).then(data => setDrivers(data))
    fetch(`${API_BASE_URL}/routes`).then(res => res.json()).then(data => setRoutes(data))
  }

  useEffect(() => { refreshData() }, [])

  // 2. ADD DRIVER
  const handleAddDriver = (e) => {
    e.preventDefault()
    fetch(`${API_BASE_URL}/drivers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, license_type: 'Class A' })
    }).then(() => {
      setName('')
      refreshData()
    })
  }

  // 3. ADD PACKAGE 
  const handleAddPackage = (e) => {
    e.preventDefault()
    fetch(`${API_BASE_URL}/packages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPackage)
    }).then(() => alert("Package Assigned!"))
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Logistics Management</h1>

      {/* DRIVER SECTION */}
      <h2>Drivers</h2>
      <form onSubmit={handleAddDriver}>
        <input placeholder="Driver Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Add Driver</button>
      </form>
      <ul>{drivers.map(d => <li key={d.id}>{d.name}</li>)}</ul>

      <hr />

      {/* ROUTES SECTION */}
      <h2>Active Routes</h2>
      <ul>{routes.map(r => <li key={r.id}>Route {r.id}: {r.zone}</li>)}</ul>

      <hr />

      {/* PACKAGE SECTION */}
      <h2>Assign Package to Route</h2>
      <form onSubmit={handleAddPackage}>
        <input 
          placeholder="Package Description" 
          onChange={(e) => setNewPackage({...newPackage, description: e.target.value})} 
        />
        <select onChange={(e) => setNewPackage({...newPackage, route_id: e.target.value})}>
          <option value="">Select a Route</option>
          {routes.map(r => (
            <option key={r.id} value={r.id}>Route {r.id} ({r.zone})</option>
          ))}
        </select>
        <button type="submit">Save Package</button>
      </form>
    </div>
  )
}

export default App