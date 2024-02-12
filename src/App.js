"use client";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'

// import './App.css';
import { fetchAllAlbums, fetchAlbumById, logIn } from './api/api';

import RootLayout from './layouts/RootLayout';
import Albums from "./pages/Albums";
import Error404 from './pages/Error404';
import ErrorGeneric from './pages/ErrorGeneric';
import AlbumDetails from './pages/AlbumDetails';
import { LogIn } from './pages/LogIn';
import { Register } from './pages/Register';

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
