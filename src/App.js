import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import MainLogout from "./pages/MainLogout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import EditProfile from "./pages/EditProfile";
import MainLogin from "./pages/MainLogin";
import MatchBoard from "./pages/MatchBoard";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  return (
    <Routes>
      <Route path="/" element={<MainLogout />} />
      <Route path="/main/login" element={<MainLogin />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/mypage" element={<MyPage />} />
      
      <Route path="/match/board/value" element={<MatchBoard />}/>

      <Route path="/profile" element={<EditProfile />} />
      
    </Routes>
  );
}
export default App;