import AppListing from '../components/AppListing/AppListing'
import styles from './homepage.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <AppListing />
    </div>
  )
}

export default App
