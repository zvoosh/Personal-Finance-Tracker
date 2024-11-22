import { Route, Routes } from "react-router";
import "./App.css";
import { ExpenseProvider, RefetchProvider, TableProvider } from "./components";
import ProtectedRoute from "./components/pages/routes/ProtectedRoute";
import ErrorPage from "./components/pages/routes/ErrorPage";
import LoadingPage from "./components/pages/routes/LoadingPage";
import React, { Suspense } from "react";
import Header from "./components/pages/home/Header";

const Home = React.lazy(() => import('./components/pages/home/Home'));
const TrosakHome = React.lazy(() => import('./components/pages/home/TrosakHome'));
const Landing = React.lazy(() => import('./components/pages/landing/Landing'));
const LandingTrosak = React.lazy(() => import('./components/pages/landing/LandingTrosak'));
const Chooser = React.lazy(() => import('./components/pages/chooser/Chooser'));
const RowDetails = React.lazy(() => import('./components/pages/home/RowDetails'));
const TrosakRowDetails = React.lazy(() => import('./components/pages/home/TrosakRowDetails'));
const Login = React.lazy(() => import('./components/pages/auth/Login'));
const Register = React.lazy(() => import('./components/pages/auth/Register'));

function App() {
  return (
    <>
      <div className="contentSpace font-sans" style={{ overflow: "hidden" }}>
        <Header />
        <ExpenseProvider>
          <TableProvider>
            <RefetchProvider>
              <Suspense fallback={<LoadingPage/>}>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/loading" element={<LoadingPage />} />

                  {/* Protected Routes */}
                  <Route
                    path="/home"
                    element={<ProtectedRoute element={<Home />} />}
                  />
                  <Route
                    path="/trosakHome"
                    element={<ProtectedRoute element={<TrosakHome />} />}
                  />
                  <Route
                    path="/landing"
                    element={<ProtectedRoute element={<Landing />} />}
                  />
                  <Route
                    path="/landing/trosak"
                    element={<ProtectedRoute element={<LandingTrosak />} />}
                  />
                  <Route
                    path="/chooser"
                    element={<ProtectedRoute element={<Chooser />} />}
                  />
                  <Route
                    path="/rowDetails/:id"
                    element={<ProtectedRoute element={<RowDetails />} />}
                  />
                  <Route
                    path="/trosakrowDetails/:id"
                    element={<ProtectedRoute element={<TrosakRowDetails />} />}
                  />

                  {/* Catch-all Route for undefined paths */}
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Suspense>
            </RefetchProvider>
          </TableProvider>
        </ExpenseProvider>
      </div>
    </>
  );
}

export default App;
