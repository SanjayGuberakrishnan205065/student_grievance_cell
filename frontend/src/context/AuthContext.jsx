import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);
  return (
    <AuthContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        userType: action.userType,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userType: null,
      };
    default:
      return state;
  }
}

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  userType: null,
};
