import DataObject, { DataObjectType } from "./DataObject";

export type CommentType = Partial<
  DataObjectType & {
    postId: number;
    name: string;
    email: string;
    body: string;
  }
>;

export default class Comment extends DataObject {
  protected _postId?: number;
  protected _name?: string;
  protected _email?: string;
  protected _body?: string;

  constructor({ id, postId, name, email, body }: CommentType) {
    super({ id });
    this._postId = postId;
    this._name = name;
    this._email = email;
    this._body = body;
  }

  public static PATH = "comments";

  override get path(): string {
    return "comments";
  }

  get postId(): number | undefined {
    return this._postId;
  }

  set postId(postId: number | undefined) {
    this._postId = postId;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(name: string | undefined) {
    this._name = name;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(email: string | undefined) {
    this._email = email;
  }

  get body(): string | undefined {
    return this._body;
  }

  set body(body: string | undefined) {
    this._body = body;
  }

  public toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as object),
      postId: this._postId,
      name: this._name,
      email: this._email,
      body: this._body,
    };
  }

  public fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as CommentType;
    this._postId = objTyped.postId;
    this._name = objTyped.name;
    this._email = objTyped.email;
    this._body = objTyped.body;
  }
}
