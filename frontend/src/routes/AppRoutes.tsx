import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import RegisterPayment from "../pages/RegisterPayment";
import AuthorizePayments from "../pages/AuthorizePayment";
import Records from "../pages/Records";
import Users from "../pages/Users";

import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/payments/register"
          element={
            <PrivateRoute roles={["ADMIN", "REGISTRO"]}>
              <DashboardLayout>
                <RegisterPayment />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/payments/authorize"
          element={
            <PrivateRoute roles={["ADMIN", "AUTORIZACAO"]}>
              <DashboardLayout>
                <AuthorizePayments />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/records"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Records />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute roles={["ADMIN"]}>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}