// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachObject} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachObject

  return (
    <li className="repository-list-item">
      <img src={avatarUrl} alt={name} className="avatar-image-repo" />
      <h1 className="repository-name">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars-image"
        />
        <p className="stars-name">{starsCount} stars</p>
      </div>
      <div className="forks-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="forks-image"
        />
        <p className="forks-name">{forksCount} forks</p>
      </div>
      <div className="issues-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="issues-image"
        />
        <p className="issues-name">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
