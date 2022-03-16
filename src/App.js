import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import { AdminFormProvider } from './Context/AdminFormContext';
import { ProductsInfoProvider } from './Context/ProductsInfoContext';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/AdminPages/LoginPage';
import setViewportWidth from './Services/setViewportWidth';
import Navbar from './Components/Utils/Navbar';
import ProductsAdminPage from './Pages/AdminPages/ProductsAdminPage';
import AnalyticsAdminPage from './Pages/AdminPages/AnalyticsAdminPage';
import addNewVisit from './Analytics/addNewVisit';
import { useEffect } from 'react';
import ProductPage from './Pages/ProductPage';
import CategoryPage from './Pages/CategoryPage';
import TestPage from './Pages/TestPage';
import { CartContextProvider } from './Context/CartContext';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import AddProductPage from './Pages/AdminPages/AddProductPage';
import EditProductPage from './Pages/AdminPages/EditProductPage';

function App() {
  setViewportWidth();
  useEffect(() => {
    addNewVisit();
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ProductsInfoProvider>
            <CartContextProvider>
              {/* <NavBar /> */}
              <Navbar />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/category/:category" component={CategoryPage} />
                <Route exact path="/category/:category/:productId" component={ProductPage} />
                <Route exact path="/cart" component={CartPage} />
                <Route exact path="/checkout" component={CheckoutPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/test" component={TestPage} />
                <AdminFormProvider>
                  <PrivateRoute exact path="/dashboard/products/add" component={AddProductPage} />
                  <PrivateRoute exact path="/dashboard/products/edit" component={EditProductPage} />
                  <PrivateRoute exact path="/dashboard/products" component={ProductsAdminPage} />
                  <PrivateRoute path="/dashboard/analytics" component={AnalyticsAdminPage} />
                  <PrivateRoute path="/admin" component={ProductsAdminPage} />
                </AdminFormProvider>
              </Switch>
            </CartContextProvider>
          </ProductsInfoProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
