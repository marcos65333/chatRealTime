
import './App.css'
import { AppRoutes } from './routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <UserContextProvider>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </UserContextProvider>
  );
}

export default App;

