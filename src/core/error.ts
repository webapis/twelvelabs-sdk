/**
 * The base class for all SDK-related errors.
 */
export class TwelveLabsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TwelveLabsError';
  }
}

/**
 * Thrown when the Twelve Labs API returns a non-2xx response.
 */
export class APIError extends TwelveLabsError {
  /**
   * The HTTP status code (e.g., 400, 401, 500).
   */
  public readonly code: number;
  /**
   * The raw response body from the API (useful for debugging validation errors).
   */
  public readonly body: any;
  /**
   * The `X-Request-ID` header value (if available) for support tracing.
   */
  public readonly requestId: string | undefined;

  constructor(message: string, code: number, body: any, requestId?: string) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.body = body;
    this.requestId = requestId;
  }
}
