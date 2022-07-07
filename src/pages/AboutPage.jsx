import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

function AboutPage() {
  return (
    <Card>
      <h1>About This Project</h1>
      <p>This is a React app used to leave feedback for a product or a service.</p>
      <p>Version: 1.0.0</p>

      <p>
        <Link to='/'>
          Back
        </Link>
      </p>
    </Card>
  )
}

export default AboutPage