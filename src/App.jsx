import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import UsersTable from "./components/UsersTable";
import EditUserModal from "./components/EditUserModal";

// Protected rote component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthScreen />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersTable />
              {/* <EditUserModal /> */} {/* Uncomment this line to use the EditUserModal component. I tried creating a seperate editusermodal component */} I 
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
