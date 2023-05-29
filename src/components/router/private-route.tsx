import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "../../hooks/use-session-storage/use-session";
import { UserSerializer } from "../../lib/data/dataObjects/serialization";
import { Nullable } from "../../types/react.types";
import User from "../../lib/data/dataObjects/User";

type PrivateRouteProps = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const navigate = useNavigate();
  const [user, _] = useSession<Nullable<User>>("user", null, UserSerializer);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <>{user && children}</>;
}

export default function makePrivate(
  component: React.ReactNode
): React.ReactNode {
  return <PrivateRoute>{component}</PrivateRoute>;
}
