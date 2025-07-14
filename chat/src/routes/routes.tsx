import {Routes,Route} from "react-router-dom";
import Login from "../features/auth/login";
import Register from "../features/auth/register";
import Chat from "../features/chat/chat";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
}