import { useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';

export default function HashLoginRouter() {
  const location = useLocation();
  if (location.hash === '#admin#login#vizz') {
    return <Login />;
  }

  return <Home />;
}
