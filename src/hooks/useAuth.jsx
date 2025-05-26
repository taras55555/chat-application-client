import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";

export const useAuth = () => useContext(AuthContext)