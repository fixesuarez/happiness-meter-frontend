export class HttpError extends Error {
  readonly name: string;
  readonly status: number;
  readonly body: Record<string, unknown>;

  constructor(error: {
    message: string;
    status: number;
    body: Record<string, unknown>;
  }) {
    super(error.message);
    this.name = "HttpError";
    this.status = error.status;
    this.body = error.body;
  }
}
