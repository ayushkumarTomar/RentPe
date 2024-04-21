
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import AuthProvider from './AuthProvider'
import ProtectedRoutes from '@/ProtectedPages/Protected'
import "./custom.styles.css";
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProductPage from './pages/Product';
import Profile from './components/profile/Profile';
import ListItem from './pages/ListItem';

import CategoriesScroll from './components/trending/AllProducts';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './pages/NotFound';

import Chat from './pages/Chat';

import SearchProduct from '@/components/trending/SearchProducts';
import WishlistPage from './pages/WishList';
function App() {


	
	return (
		
		<BrowserRouter>
		<ToastContainer />

		{/* Wrap the routes with AuthProvider */}
		<AuthProvider>
		  <Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />

			<Route path="/products" element={<CategoriesScroll />} />

			<Route path="/not-found" element={<NotFoundPage />} />
			<Route path="/productSpec/:productId" element={<ProductPage/>}/>
			<Route path="/search/:productQuery" element={<SearchProduct/>}/>




			<Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home/>}/>
			  <Route path="/profile" element={<Profile/>}/>
			  <Route path="/list-item" element={<ListItem/>}/>
			  <Route path="/chat" element={<Chat/>}/>
			  <Route path="/wishList" element={<WishlistPage/>}/>

			</Route>
		  </Routes>
		</AuthProvider>
	  </BrowserRouter>
	);}

export default App
