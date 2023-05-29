import DataObject, { DataObjectType } from "./DataObject";

export type TodoObjectType = Partial<
  DataObjectType & {
    userId: number;
    title: string;
    completed: boolean;
  }
>;

export default class Todo extends DataObject {
  protected _userId?: number;
  protected _title?: string;
  protected _completed?: boolean;

  constructor({ id, userId, title, completed }: TodoObjectType) {
    super({ id });
    this._userId = userId;
    this._title = title;
    this._completed = completed;
  }

  public static PATH = "todos";

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

  get completed(): boolean | undefined {
    return this._completed;
  }

  set completed(completed: boolean | undefined) {
    this._completed = completed;
  }

  public toUnknowObject(): unknown {
    return {
      ...(super.toUnknowObject() as object),
      userId: this._userId,
      title: this._title,
      completed: this._completed,
    };
  }

  override get path(): string {
    return "todos";
  }

  public fromUnknowObject(obj: unknown): void {
    super.fromUnknowObject(obj);
    const objTyped = obj as TodoObjectType;
    this._userId = objTyped.userId;
    this._title = objTyped.title;
    this._completed = objTyped.completed;
  }
}
