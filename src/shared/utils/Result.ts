export class Result<T, E> {
  readonly #data: T | null;

  private constructor(
    readonly isSuccess: boolean,
    readonly error: E | null,
    data: T | null,
  ) {
    this.#data = data;
  }

  get data(): T {
    if (!this.isSuccess || this.#data === null) {
      throw new Error('No data present');
    }

    return this.#data;
  }

  get hasData(): boolean {
    return this.isSuccess && this.#data !== null;
  }

  get hasError(): boolean {
    return !this.isSuccess && this.error !== null;
  }

  static ok<V, F>(data: V): Result<V, F> {
    return new Result<V, F>(true, null, data);
  }

  static fail<V, F>(error: F): Result<V, F> {
    return new Result<V, F>(false, error, null);
  }
}
