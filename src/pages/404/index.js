import React from 'react'
import { Link } from 'react-router-dom'

import { SITE_URL } from '../../config'

const Page404 = () => (
  <div className="page-404">
    <h1>Page not found :(</h1>
    <h2>Oops! The page you were looking for doesn't exist</h2>
    <Link to={SITE_URL} className="ant-btn ant-btn-primary fluid">Back to Pokemon List</Link>
  </div>
)

export default Page404