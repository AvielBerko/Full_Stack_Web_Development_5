import { createContext } from "react";
import User from "../../lib/data/dataObjects/User";

export class AuthContextData {
  public user?: User;
  private _stateSetter?: React.Dispatch<React.SetStateAction<User | undefined>>;
  constructor(
    user?: User,
    stateSetter?: React.Dispatch<React.SetStateAction<User | undefined>>
  ) {
    this.user = user;
    this._stateSetter = stateSetter;
  }

  get clone(): AuthContextData {
    return new AuthContextData(this.user, this._stateSetter);
  }

  public logOut(): void {
    if (!this._stateSetter) return;
    this.user = undefined;
    this._stateSetter(undefined);
  }
}

export const AuthContext = createContext<AuthContextData>(
  new AuthContextData()
);
