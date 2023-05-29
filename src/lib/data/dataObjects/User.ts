import { getList } from "../loders/mainLoader/getLoader";
import Album from "./Album";
import DataObject, { DataObjectType } from "./DataObject";
import Todo from "./Todo";
import Post from "./Post";

export type Address = Partial<{
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}>;

export type Geo = Partial<{
  lat: string;
  lng: string;
}>;

export type Company = Partial<{
  name: string;
  catchPhrase: string;
  bs: string;
}>;

export type UserObjectType = Partial<
  DataObjectType & {
    name: string;
    username: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
    email: string;
  }
>;

export default class User extends DataObject {
  protected _name?: string;
  protected _username?: string;
  protected _address?: Address;
  protected _phone?: string;
  protected _website?: string;
  protected _company?: Company;
  protected _email?: string;

  constructor({
    id,
    name,
    username,
    address,
    phone,
    website,
    company,
    email,
  }: UserObjectType) {
    super({ id });
    this._name = name;
    this._username = username;
    this._address = address;
    this._phone = phone;
    this._website = website;
    this._company = company;
    this._email = email;
  }

  public static PATH = "users";

  override get path(): string {
    return "users";
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(name: string | undefined) {
    this._name = name;
  }

  get username(): string | undefined {
    return this._username;
  }

  set username(username: string | undefined) {
    this._username = username;
  }

  get address(): Address | undefined {
    return this._address;
  }

  set address(address: Address | undefined) {
    this._address = address;
  }

  get phone(): string | undefined {
    return this._phone;
  }

  set phone(phone: string | undefined) {
    this._phone = phone;
  }

  get website(): string | undefined {
    return this._website;
  }

  set website(website: string | undefined) {
    this._website = website;
  }

  get company(): Company | undefined {
    return this._company;
  }

  set company(company: Company | undefined) {
    this._company = company;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(email: string | undefined) {
    this._email = email;
  }

  public override toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as Object),
      name: this._name,
      username: this._username,
      address: this._address,
      phone: this._phone,
      website: this._website,
      company: this._company,
    };
  }

  public override fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as UserObjectType;
    this._name = objTyped.name;
    this._username = objTyped.username;
    this._address = objTyped.address;
    this._phone = objTyped.phone;
    this._website = objTyped.website;
    this._company = objTyped.company;
  }

  public get albums(): Promise<Album[]> {
    return getList(`${this.fullPath}/${Album.PATH}`).then((albums: any[]) =>
      albums.map((album) => new Album(album))
    );
  }

  public get todos(): Promise<Todo[]> {
    return getList(`${this.fullPath}/${Todo.PATH}`).then((todos: any[]) =>
      todos.map((todo) => new Todo(todo))
    );
  }

  public get posts(): Promise<Post[]> {
    return getList(`${this.fullPath}/${Post.PATH}`).then((posts: any[]) =>
      posts.map((post) => new Post(post))
    );
  }
}
