import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const responseConfirmation = {
  initial: 'INITIAL',
  progressResponse: 'IN_PROGRESS',
  successResponse: 'SUCCESS',
  failureResponse: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    repositoriesList: [],
    responseStatus: responseConfirmation.initial,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    this.setState({responseStatus: responseConfirmation.progressResponse})

    const {activeTab} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      const formattedData = popularRepos.map(eachObject => ({
        name: eachObject.name,
        id: eachObject.id,
        issuesCount: eachObject.issues_count,
        forksCount: eachObject.forks_count,
        starsCount: eachObject.stars_count,
        avatarUrl: eachObject.avatar_url,
      }))
      this.setState({
        repositoriesList: formattedData,
        responseStatus: responseConfirmation.successResponse,
      })
    } else {
      this.setState({
        repositoriesList: [],
        responseStatus: responseConfirmation.failureResponse,
      })
    }
  }

  onClickSelectTab = tabId => {
    this.setState({activeTab: tabId}, this.getRepositoryList)
  }

  renderRepositoryList = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="repository-item-container-list">
        {repositoriesList.map(eachObject => (
          <RepositoryItem eachObject={eachObject} key={eachObject.id} />
        ))}
      </ul>
    )
  }

  renderProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailurePage = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-message">Something Went Wrong</p>
    </div>
  )

  renderingUIByResponse = () => {
    const {responseStatus} = this.state
    switch (responseStatus) {
      case responseConfirmation.successResponse:
        return this.renderRepositoryList()
      case responseConfirmation.progressResponse:
        return this.renderProgress()
      case responseConfirmation.failureResponse:
        return this.renderFailurePage()

      default:
        return null
    }
  }

  render() {
    const {activeTab} = this.state

    return (
      <div className="bg-main-container">
        <div className="main-container">
          <h1 className="popular-heading">Popular</h1>
          <ul className="tabs-list-container">
            {languageFiltersData.map(eachTab => (
              <LanguageFilterItem
                eachTab={eachTab}
                key={eachTab.id}
                onClickSelectTab={this.onClickSelectTab}
                isActive={eachTab.id === activeTab}
              />
            ))}
          </ul>
          {this.renderingUIByResponse()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
