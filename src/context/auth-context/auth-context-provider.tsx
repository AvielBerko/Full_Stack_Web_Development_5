import { AuthContext, AuthContextData } from "./auth-context";
import User from "../../lib/data/dataObjects/User";
import { useState, useEffect } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [data, setData] = useState<AuthContextData>(new AuthContextData());

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) {
      const userToSet = new User({});
      userToSet.fromJSON(userStr);

      setData((prev) => {
        if (!prev) {
          return new AuthContextData(userToSet);
        }
        prev.user = userToSet;
        return prev.clone;
      });
    }
  }, []);

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
