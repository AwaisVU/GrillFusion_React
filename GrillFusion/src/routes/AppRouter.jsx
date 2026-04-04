import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Cart from "../pages/cart/Cart";
import OrderConfirmation from "../pages/order/OrderConfirmation";
import OrderManagement from "../pages/order/OrderManagement";
import MenuItemManagement from "../pages/menu/MenuItemManagement";
import { MYROUTES, ROLES } from "../utility/constants";
import MenuItemDetails from "../pages/menu/MenuItemDetails";
import RoleBasedRoute from "./RoleBasedRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={MYROUTES.HOME} element={<Home />} />
      <Route path={MYROUTES.LOGIN} element={<Login />} />
      <Route path={MYROUTES.REGISTER} element={<Register />} />
      <Route path={MYROUTES.FORGOT_PASSWORD} element={<ForgotPassword/>} />
      <Route path={MYROUTES.RESET_PASSWORD} element={<ResetPassword/>}/>

      <Route
        path={MYROUTES.CART}
        element={
          <RoleBasedRoute>
            <Cart />
          </RoleBasedRoute>
        }
      />

      <Route
        path={MYROUTES.ORDER_CONFIRMATION}
        element={<OrderConfirmation />}
      />
      
        <Route path={MYROUTES.ORDER_MANAGEMENT} element={
            <RoleBasedRoute>
            <OrderManagement />
            </RoleBasedRoute>
            } />
      

      <Route
        path={MYROUTES.MENU_ITEM_MANAGEMENT}
        element={
          <RoleBasedRoute allowedRoles={[ROLES.ADMIN]}>
            <MenuItemManagement />
          </RoleBasedRoute>
        }
      />

      <Route
        path={MYROUTES.MENU_ITEM_DETAILS}
        element={<MenuItemDetails />}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
