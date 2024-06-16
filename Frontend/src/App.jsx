import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { ConfigProvider } from "antd";

const router = createBrowserRouter([
  {
    path: "auth",
    errorElement: <ErrorBoundary />,
    children: [
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      {
        path: "register",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/",
    element: <div>Hello</div>,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{}}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
