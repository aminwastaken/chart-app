import './index.css'

const LoadingScreen = ({ title }) => {
  return (
    <div id="loading-wrapper">
      <div id="loading-text">{title}</div>
      <div id="loading-content"></div>
    </div>
  )
}

export default LoadingScreen
