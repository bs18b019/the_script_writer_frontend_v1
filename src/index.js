
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from "./store";
import HomePageComponent from "./tabs/HomePageComponent";
// import WriteHelpComponent from "./tabs/WriteHelpComponent";
import ReadHelpComponent from "./tabs/ReadHelpComponent";
import AboutUsComponent from "./tabs/AboutUsComponent";
import ExploreComponent from "./tabs/ExploreComponent";
import ProfileComponent from "./tabs/ProfileComponent";
import PublishComponent from "./tabs/PublishComponent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import FeedsComponent from "./tabs/FeedsComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePageComponent /> },
      {
        path: "write",
        element: <App />,
      },
      {
        path: "read",
        element: <ReadHelpComponent />,
      },
      {
        path: "profile",
        element: <ProfileComponent />,
      },
      {
        path: "profile/:author",
        element: <ProfileComponent />,
      },
      {
        path: "feeds",
        element: <FeedsComponent />,
      },
      {
        path: "about-us",
        element: <AboutUsComponent />,
      },
      {
        path: "publish",
        element: <PublishComponent />,
      },
      {
        path: "explore",
        element: <ExploreComponent />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <Auth0Provider
      domain="dev-vo4f3hlln7i74wzu.us.auth0.com"
      clientId="xZSfUNIM9FYBkbR7PtB6zmh5cqkEO6Ol"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

