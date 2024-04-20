
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import AuthProvider from './AuthProvider'
import ProtectedRoutes from '@/ProtectedPages/Protected'
import "./custom.styles.css";
import Signup from './pages/Signup'
import Login from './pages/Login'
import Product from './pages/Product'
import Profile from './components/profile/Profile';
import ListItem from './pages/ListItem';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


	
	return (
		
		<BrowserRouter>
		        <ToastContainer />

		{/* Wrap the routes with AuthProvider */}
		<AuthProvider>
		  <Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />

			<Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home/>}/>
              <Route path="/product" element={<Product/>}/>
			  <Route path="/profile" element={<Profile/>}/>
			  <Route path="/list-item" element={<ListItem/>}/>

			</Route>
		  </Routes>
		</AuthProvider>
	  </BrowserRouter>
	);}

export default App
