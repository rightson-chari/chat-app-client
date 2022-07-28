import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Avatar from "./Pages/Avatar";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
let user = localStorage.getItem("chat-user");
if (user) {
  user = JSON.parse(user);
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/register"
            element={user ? <Navigate to="/avatar" /> : <Register />}
          ></Route>
          <Route
            element={user ? <Avatar /> : <Navigate to="/register" />}
            path="/avatar"
          ></Route>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/chat"
            element={<Navigate to="/" /> ? <Chat /> : <Navigate to="/login" />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
