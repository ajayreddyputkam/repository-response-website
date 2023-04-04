// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachTab, onClickSelectTab, isActive} = props
  const {id, language} = eachTab

  const selectTabValue = () => {
    onClickSelectTab(id)
  }

  const activeTabStyle = isActive ? 'active-tab' : ''

  return (
    <li className="list-tab-item">
      <button
        type="button"
        className={`tab-button ${activeTabStyle} `}
        onClick={selectTabValue}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
