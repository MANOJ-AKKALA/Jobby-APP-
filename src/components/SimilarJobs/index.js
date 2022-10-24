import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,

    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <>
      <div className="bgSimilarcard">
        <h1>Similar Jobs</h1>
        <li>
          <img
            className="similar-product-image"
            src={companyLogoUrl}
            alt="website logo"
          />
          <h1 className="similar-product-title">{title}</h1>
          <p>{employmentType}</p>
          <p>{jobDescription}</p>
          <p>{location}</p>
          <p>{rating}</p>
        </li>
      </div>
    </>
  )
}

export default SimilarJobs
