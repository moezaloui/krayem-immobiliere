import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NotFound from "./routes/404/notFound";
import Add from "./routes/add/Add";
import Edit from "./routes/edit/edit";
import { UserProvider } from "./lib/userContext";
import ProtectedRoute from "./lib/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list/properity",
          element: <ListPage />
        },
        {
          path: "/properity/:id",
          element: <SinglePage />
        },
        {
          path: "/edit-post/:id",
          element: (
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          )
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          )
        },
        {
          path: "/edit-profile",
          element: (
            <ProtectedRoute>
              <ProfileUpdatePage />
            </ProtectedRoute>
          )
        },
        {
          path: "/add",
          element: (
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          )
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/*",
          element: <NotFound />
        }
      ]
    }
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
