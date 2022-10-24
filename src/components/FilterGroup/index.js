import {BsSearch} from 'react-icons/bs'

import './index.css'

const FilterGroup = props => {
  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {changeSalaryRange, activeSalaryRangesId} = props
      const onClickSalaryRange = () => {
        changeSalaryRange(range.salaryRangeId)
      }

      const rangeClassName =
        activeSalaryRangesId === range.salaryRangeId
          ? `and-up active-rating`
          : `and-up`

      console.log(activeSalaryRangesId)
      return (
        <li
          className="rating-item"
          onClick={onClickSalaryRange}
          key={range.salaryRangeId}
        >
          <p className={rangeClassName}>{range.label}</p>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <>
      <h1>Salary Range</h1>
      <ul>{renderSalaryRangeList()}</ul>
    </>
  )

  const renderCategoryList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(category => {
      const {changeJobType, activeEmploymentTypesId} = props
      const onClickChangeCategory = () => {
        changeJobType(category.employmentTypeId)
      }

      const rangeClassName =
        activeEmploymentTypesId === category.employmentTypeId
          ? `and-up active-rating`
          : `and-up`

      return (
        <li
          className="rating-item"
          onClick={onClickChangeCategory}
          key={category.salaryRangeId}
        >
          <p className={rangeClassName}>{category.label}</p>
        </li>
      )
    })
  }

  const renderCategory = () => (
    <>
      <h1>Category</h1>
      <ul>{renderCategoryList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  const {clearFilters} = props

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderSalaryRange()}
      {renderCategory()}

      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FilterGroup
