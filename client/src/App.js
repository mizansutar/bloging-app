import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./components/account/Login";
import SignupPage from "./components/account/SignUp";

import DataProvider from "./context/dataProvider";
import Header from "./components/header/header"
import HomePage from "./components/homef/home";
import DetailView from "./components/details/detailsVeiw";
import Create_Post from "./components/create/create_Post";
import UpdateBlog from "./components/details/UpdateBlog";
import About from "./components/navpages/about";
export const PrivateRoute = ({ isauth, ...props }) => {
  return isauth ?
    <>
      <Header />
      <div style={{ marginTop: 4 }}></div>
      <Outlet />

    </>

    : < Navigate replace to="/login" />

}


const App = () => {

  const [isauth, isUserAuth] = useState(false);
  return (
    <>
      <DataProvider>


        <Router>

          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage isUserAuth={isUserAuth} />} />
            <Route path="/" element={<PrivateRoute isauth={isauth} />}>

              <Route path="/" element={<HomePage />} />

            </Route>

            <Route path="/create" element={<PrivateRoute isauth={isauth} />}>

              <Route path="/create" element={<Create_Post />} />

            </Route>


            <Route path="/about" element={<PrivateRoute isauth={isauth} />}>

              <Route path="/about" element={<About/>} />

            </Route>



            {/*the detail*/}

            <Route path="/details/:id" element={<PrivateRoute isauth={isauth} />}>

              <Route path="/details/:id" element={<DetailView />} />

            </Route>

          {/*   update routessss  */}
          <Route path="/update/:id" element={<PrivateRoute isauth={isauth} />}>

<Route path="/update/:id" element={<UpdateBlog />} />

</Route>



          </Routes>
        </Router>

      </DataProvider>
    </>
  );
};

export default App;