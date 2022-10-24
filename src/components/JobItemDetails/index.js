import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsDataList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    console.log(match)
    const {params} = match

    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const aboutJob = data.job_details
      console.log(data)
      const updatedData = {
        id: aboutJob.id,
        companyLogoUrl: aboutJob.company_logo_url,
        companyWebsiteUrl: aboutJob.company_website_url,
        employmentType: aboutJob.employment_type,
        jobDescription: aboutJob.job_description,
        location: aboutJob.location,
        packagePerAnnum: aboutJob.package_per_annum,
        rating: aboutJob.rating,
        title: aboutJob.title,
      }
      console.log(updatedData)
      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employmentType,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(similarJobs)
      this.setState({
        jobData: updatedData,
        similarJobsDataList: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <Link to="/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsDataList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobData
    return (
      <div className="bgSimilar">
        <div className="itemDetailsCard">
          <img src={companyLogoUrl} alt="job details company logo" />
          <a href={companyWebsiteUrl}>Visit</a>
          <h1>{employmentType}</h1>
          <p>{jobDescription}</p>
          <h1>{lifeAtCompany}</h1>
          <h1>{location}</h1>
          <p>{packagePerAnnum}</p>
          <h1>{rating}</h1>
          <h1>{skills}</h1>
          <h1>{title}</h1>

          <ul>
            {similarJobsDataList.map(eachJobItem => (
              <SimilarJobs key={eachJobItem.id} jobDetails={eachJobItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
