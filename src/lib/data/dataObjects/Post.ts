import { getList } from "../loders/mainLoader/getLoader";
import Comment from "./Comment";
import DataObject, { DataObjectType } from "./DataObject";

export type PostType = Partial<
  DataObjectType & {
    userId: number;
    title: string;
    body: string;
  }
>;

export default class Post extends DataObject {
  protected _userId?: number;
  protected _title?: string;
  protected _body?: string;

  constructor({ id, userId, title, body }: PostType) {
    super({ id });
    this._userId = userId;
    this._title = title;
    this._body = body;
  }

    public static PATH = "posts";

  get userId(): number | undefined {
    return this._userId;
  }

  set userId(userId: number | undefined) {
    this._userId = userId;
  }

  get title(): string | undefined {
    return this._title;
  }

  set title(title: string | undefined) {
    this._title = title;
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
      userId: this._userId,
      title: this._title,
      body: this._body,
    };
  }

  override get path(): string {
    return "posts";
  }

  public fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as PostType;
    this._userId = objTyped.userId;
    this._title = objTyped.title;
    this._body = objTyped.body;
  }

  get comments(): Promise<Comment[]> {
    return getList<Comment>(`${this.fullPath}/${Comment.PATH}`);
  }

}
