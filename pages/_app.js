import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { AuthContextProvider } from './../store/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
