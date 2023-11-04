import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function useAuth() {
    return useContext(AuthContext);
}
