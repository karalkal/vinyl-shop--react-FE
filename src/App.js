"use client";

import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'

import { fetchAllAlbums, fetchAlbumById } from './api/api';

import RootLayout from './layouts/RootLayout';

// import Albums from "./pages/Albums";
// import AlbumDetails from './pages/AlbumDetails';
import Error404 from './pages/Error404';
import ErrorGeneric from './pages/ErrorGeneric';
import { SuspenseSpinner } from './UI/SuspenseSpinner';
const Albums = lazy(() => import("./pages/Albums"));
const AlbumDetails = lazy(() => import("./pages/AlbumDetails"));


const appRouter = createBrowserRouter(
  createRoutesFromElements(
    // Everything is nested in RootLayout comp
    < Route
      element={< RootLayout />}
      errorElement={< ErrorGeneric />}
    >
      <Route index
        element={<Albums />}
        loader={fetchAllAlbums}
      />
      <Route path="album/:id"
        element={<AlbumDetails />}
        loader={({ params }) => fetchAlbumById(params.id)}
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
        <Suspense fallback={<SuspenseSpinner />}>
          <RouterProvider router={appRouter} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
