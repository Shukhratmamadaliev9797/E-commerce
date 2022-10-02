import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PublicLayout from "./components/public/PublicLayout";
import Home from "./pages/public/Home";
import Products from "./pages/admin/Products";
import DashLogin from "./components/general/DashLogin";
import "./style/style.scss";
import Costumers from "./pages/admin/Costumers";
import Orders from "./pages/admin/Orders";
import Sellers from "./pages/admin/Sellers";
import Setting from "./pages/admin/Setting";
import AdminRoute from "./components/admin/AdminRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="products"
            element={
              <AdminRoute>
                <Products />
              </AdminRoute>
            }
          />
          <Route
            path="costumers"
            element={
              <AdminRoute>
                <Costumers />
              </AdminRoute>
            }
          />
          <Route
            path="orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />
          <Route
            path="sellers"
            element={
              <AdminRoute>
                <Sellers />
              </AdminRoute>
            }
          />
          <Route
            path="setting"
            element={
              <AdminRoute>
                <Setting />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
      <Routes>
        <Route path="/admin/login" element={<DashLogin />} />
      </Routes>
    </div>
  );
}

export default App;
