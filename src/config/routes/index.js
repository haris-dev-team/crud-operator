import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Create, CreateVideo, Dashborad, Home, Login, Signup } from "../../pages";
import PrivateRoutes from "../protectedRoutes/private_Routes";
import PublicRoutes from "../protectedRoutes/public_Routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashborad />}>
          <Route path="" element={<Home />} />
          <Route path="createImage" element={<Create />} />
          <Route path="createVideo" element={<CreateVideo />} />
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Route>
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;
