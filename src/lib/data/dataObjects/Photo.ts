import DataObject, { DataObjectType } from "./DataObject";

export type PhotoObjectType = Partial<
  DataObjectType & {
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
>;

export default class Photo extends DataObject {
  protected _albumId?: number;
  protected _title?: string;
  protected _url?: string;
  protected _thumbnailUrl?: string;

  constructor({ id, albumId, title, url, thumbnailUrl }: PhotoObjectType) {
    super({ id });
    this._albumId = albumId;
    this._title = title;
    this._url = url;
    this._thumbnailUrl = thumbnailUrl;
  }

  override get path(): string {
    return "photos";
  }

  public static PATH = "photos";

  get albumId(): number | undefined {
    return this._albumId;
  }

  set albumId(albumId: number | undefined) {
    this._albumId = albumId;
  }

  get title(): string | undefined {
    return this._title;
  }

  set title(title: string | undefined) {
    this._title = title;
  }

  get url(): string | undefined {
    return this._url;
  }

  set url(url: string | undefined) {
    this._url = url;
  }

  get thumbnailUrl(): string | undefined {
    return this._thumbnailUrl;
  }

  set thumbnailUrl(thumbnailUrl: string | undefined) {
    this._thumbnailUrl = thumbnailUrl;
  }

  public toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as object),
      albumId: this._albumId,
      title: this._title,
      url: this._url,
      thumbnailUrl: this._thumbnailUrl,
    };
  }

  public fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as PhotoObjectType;
    this._albumId = objTyped.albumId;
    this._title = objTyped.title;
    this._url = objTyped.url;
    this._thumbnailUrl = objTyped.thumbnailUrl;
  }
}
