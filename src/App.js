import { useContext } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';


import AuthContext from './store/auth-context';
// import './App.css';
import { fetchAllAlbums, fetchAlbumById } from './api/api';

import Login from './modals/Login/Login';
import RootLayout from './layouts/RootLayout';
import Albums from "./pages/Albums";
import Error404 from './pages/Error404';
import ErrorGeneric from './pages/ErrorGeneric';
import AlbumDetails from './pages/AlbumDetails';

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
      <Route path="album/:id"
        element={<AlbumDetails />}
        loader={({ params }) => fetchAlbumById(params.id)}
      />

      <Route path="*" element={<Error404 />} />

    </Route >)
);



function App() {
  /*
  Now state and login / logout functionality is managed in auth-context.js
  And we get the context via the AuthContextProvider component which is wrapping <App>
  Login and Home components will get access to it too so we don't need to pass props around.
  App does not deal with auth anymore, it is representational component, as it is meant to be.
  */

  const ctx = useContext(AuthContext)
  console.log(ctx)

  return (
    <>
      <RouterProvider router={appRouter} ctx={ctx} />
    </>
  );
}

export default App;
