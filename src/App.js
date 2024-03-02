"use client";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, defer } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'

import { fetchAllAlbums, fetchAlbumById, fetchAllOrders, findAlbums } from './api/api';

import RootLayout from './layouts/RootLayout';

import Albums from "./pages/Albums";
import AlbumDetails from './pages/AlbumDetails';
import Error404 from './pages/Error404';
import ErrorGeneric from './pages/ErrorGeneric';
import { SuspenseSpinner } from './UI/SuspenseSpinner';
import { Payment } from './pages/Payment';
import { Orders } from './pages/Orders';
import FoundAlbums from './pages/FoundAlbums';



async function allAlbumsLoader() {
  const allAlbumsPromise = fetchAllAlbums();

  return defer({
    albums: allAlbumsPromise,
  });
}

async function findAlbumsLoader(request) {
  // 2 methods to get the QS
  const search = window.location.search;
  const reqUrl = request.url
  const queryString1 = search.slice(search.indexOf('?') + 1);
  const queryString2 = reqUrl.slice(reqUrl.indexOf('?') + 1);
  console.log(queryString1, queryString2)
  const foundAlbumsPromise = findAlbums(queryString2);

  return defer({
    albums: foundAlbumsPromise,
  });
}


async function albumDetailsLoader(params) {
  const albumId = params.id
  const albumDataPromise = fetchAlbumById(albumId);

  return defer({
    albumData: albumDataPromise,
  });
}

async function allOrdersLoader() {
  const ordersDataPromise = fetchAllOrders();

  return defer({
    allOrdersData: ordersDataPromise,
  });
}


const appRouter = createBrowserRouter(
  createRoutesFromElements(
    // Everything is nested in RootLayout comp
    < Route
      element={< RootLayout />}
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

      <Route path="test" element={<SuspenseSpinner />} />
      <Route path="*" element={<Error404 />} />

    </Route >)
)


function App() {
  return (
    <>
      <ErrorBoundary
        fallbackRender={ErrorGeneric}
        onReset={(details) => {
          // Reset the state of your app so the error doesn't happen again
        }}>
        <RouterProvider router={appRouter} />
      </ErrorBoundary>
    </>
  );
}

export default App;
