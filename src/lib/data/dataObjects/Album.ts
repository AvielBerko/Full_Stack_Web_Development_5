import { page as getPage } from "../loders/mainLoader/getLoader";
import DataObject, { DataObjectType } from "./DataObject";
import Photo from "./Photo";

export type AlbumObjectType = Partial<
  DataObjectType & {
    userId: number;
    title: string;
  }
>;

export default class Album extends DataObject {
  protected _userId?: number;
  protected _title?: string;

  constructor({ id, userId, title }: AlbumObjectType) {
    super({ id });
    this._userId = userId;
    this._title = title;
  }

  public static PATH = "albums";

  override get path(): string {
    return Album.PATH;
  }

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

  public toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as object),
      userId: this._userId,
      title: this._title,
    };
  }

  public fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as AlbumObjectType;
    this._userId = objTyped.userId;
    this._title = objTyped.title;
  }

  public async photos(page: number, limit: number = 10): Promise<Photo[]> {
    return getPage(`${this.fullPath}/${Photo.PATH}`, page, limit);
  }
}
