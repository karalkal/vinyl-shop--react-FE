"use client";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, defer } from 'react-router-dom';

import { fetchAllAlbums, fetchAlbumById, findAlbums } from './api/api';

import RootLayout from './layouts/RootLayout';

import Albums from "./pages/Albums";
import AlbumDetails from './pages/AlbumDetails';
import Error404 from './pages/Error404';
import ErrorGeneric from './pages/ErrorGeneric';
import { SuspenseSpinner } from './modals/SuspenseSpinner';
import { Payment } from './pages/Payment';
import { Orders } from './pages/Orders';
import FoundAlbums from './pages/FoundAlbums';
import PrivateRoutes from './PrivateRoutes';
import { AdminMenu } from './pages/protected/AdminMenu';
import { Users } from './pages/protected/Users';


async function allAlbumsLoader() {
  const allAlbumsPromise = fetchAllAlbums();

  return defer({ albums: allAlbumsPromise });
}

async function findAlbumsLoader(request) {
  const queryString = request.url.slice(request.url.indexOf('?') + 1);
  const foundAlbumsPromise = findAlbums(queryString);

  return defer({ albums: foundAlbumsPromise });
}


async function albumDetailsLoader(params) {
  const albumId = params.id
  const albumDataPromise = fetchAlbumById(albumId);

  return defer({ albumData: albumDataPromise });
}

/* // cannot get token with useContext as not functional comp
async function verifyUserIsAdminLoader() {
  const isAdminPromise = verifyUserIsAdmin();

  return defer({ isAdmin: isAdminPromise });
}
*/

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    // Everything is nested in RootLayout comp
    < Route
      element={<RootLayout />}
      errorElement={< ErrorGeneric />}
    >
      <Route index
        element={<Albums />}
        loader={allAlbumsLoader}
      />
      <Route path="album/:id"
        element={<AlbumDetails />}
        loader={({ params }) => albumDetailsLoader(params)}
      />
      <Route path="payment" element={<Payment />} />
      <Route path="orders"
        element={<Orders />}
      // loader={({params}) => allOrdersLoader(params)}
      />
      <Route path="search"
        element={<FoundAlbums />}
        loader={({ request }) => findAlbumsLoader(request)}
      />

      <Route
        element={<PrivateRoutes
        // loader={() => verifyUserIsAdminLoader()}
        />}>
        <Route element={<AdminMenu />} path="/admin" exact />
        <Route element={<Users />} path="/users" exact />
      </Route>

      <Route path="test" element={<SuspenseSpinner />} />
      <Route path="*" element={<Error404 />} />

    </Route >)
)


function App() {
  return <RouterProvider router={appRouter} />
}

export default App;
