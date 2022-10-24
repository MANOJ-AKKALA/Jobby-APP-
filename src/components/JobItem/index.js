import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {eachJobDetails} = props

  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobDetails

  return (
    <li>
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="card">
          <div className="comp-jobTitle">
            <div>
              <img
                className="thumbnail"
                src={companyLogoUrl}
                alt="company logo"
              />
            </div>
            <div>
              <h1>{title}</h1>
              <p>{rating}</p>
            </div>
          </div>
          <div className="loc-empType-package">
            <p>{location}</p>
            <p>{employmentType}</p>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />

          <p>Description</p>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
