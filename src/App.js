// import './App.css';
import { fetchAllAlbums } from './api/api';

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import Albums from "./pages/Albums";
import Error404 from './pages/Error404';
import ErrorGeneric from './pages/ErrorGeneric';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      // path="/"
      element={<RootLayout />}
      errorElement={<ErrorGeneric />} >

      {/* Everything is nested in RootLayout comp */}
      {/* <Route index element={<Home />} /> */}

      <Route path="albums"
        element={<Albums />}
        loader={fetchAllAlbums}
      />

      <Route path="*" element={<Error404 />} />

    </Route >)
);



function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
