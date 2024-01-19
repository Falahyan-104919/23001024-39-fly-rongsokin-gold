import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { Layout } from './layout/Layout';
import { Profile } from './pages/Profile';
import ForumMitra from './pages/ForumMitra';
import ForumCustomer from './pages/ForumCustomer';
import { Order } from './pages/Order';
import { Transaction } from './pages/Transaction';
import ProductConfiguration from './pages/ProductConfiguration';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Product from './pages/Product';
import User from './pages/User';
import Mitra from './pages/Mitra';
import Search from './pages/Search';
import { useContext } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import { AuthContext } from './store/AuthProvider';
import { AdminLayout } from './layout/AdminLayout';
import UserConfiguration from './pages/UserConfiguration';
import AdminProductConfiguration from './pages/AdminProductConfiguration';
import AdminForumCustomerConfigurationContainer from './containers/AdminForumCustomerConfigurationContainer';

const queryClient = new QueryClient();

function App() {
  const { user } = useContext(AuthContext);
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="forum_customer" element={<ForumCustomer />} />
          <Route path="forum_mitra" element={<ForumMitra />} />
          <Route path="order/:userId" element={<Order />} />
          <Route path="transaction/:mitraId" element={<Transaction />} />
          <Route
            path="product_configuration/:mitraId"
            element={<ProductConfiguration />}
          />
          <Route path="user/:userId" element={<User />} />
          <Route path="mitra/:mitraId" element={<Mitra />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route
          path="/admin_dashboard"
          element={
            user.role == 'admin' ? (
              <AdminLayout />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="user_configuration" element={<UserConfiguration />} />
          <Route
            path="product_configuration"
            element={<AdminProductConfiguration />}
          />
          <Route
            path="product_type_configuration"
            element={<UserConfiguration />}
          />
          <Route
            path="forum_customer"
            element={<AdminForumCustomerConfigurationContainer />}
          />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
