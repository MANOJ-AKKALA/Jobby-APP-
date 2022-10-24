import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'

import JobItem from '../JobItem'

import FilterGroup from '../FilterGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeSalaryRangesId: '',
    activeEmploymentTypesId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeEmploymentTypesId,
      activeSalaryRangesId,
      searchInput,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypesId}&minimum_package=${activeSalaryRangesId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  clearFilters = () => {
    this.setState(
      {
        activeSalaryRangesId: '',
        activeEmploymentTypesId: '',
        searchInput: '',
      },
      this.getJobs,
    )
  }

  changeSalaryRange = selectedSalary => {
    this.setState({activeSalaryRangesId: selectedSalary}, this.getJobs)
  }

  changeJobType = selectedType => {
    this.setState({activeEmploymentTypesId: selectedType}, this.getJobs)
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInputValue => {
    this.setState({searchInput: searchInputValue})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const {
      activeSalaryRangesId,
      activeEmploymentTypesId,
      searchInput,
    } = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <div className="profileJobsListView">
        <div>
          <div className="profileCard">
            <h1>Akkala Manoj</h1>
            <p>Lead Software Developer and AI-ML expert</p>
          </div>
          <hr />

          <div>
            <FilterGroup
              searchInput={searchInput}
              activeSalaryRangesId={activeSalaryRangesId}
              activeEmploymentTypesId={activeEmploymentTypesId}
              changeSalaryRange={this.changeSalaryRange}
              changeJobType={this.changeJobType}
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
            />
          </div>
        </div>

        <div>
          <ul>
            {jobsList.map(eachJobDetails => (
              <JobItem
                key={eachJobDetails.id}
                eachJobDetails={eachJobDetails}
              />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
    </div>
  )

  renderAllJobsViaSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
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

        <div>
          <div>{this.renderAllJobsViaSwitch()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
