# Core Infrastructure Documentation

This document explains the design and usage of the core infrastructure components for the Twelve Labs SDK. These components provide the foundation for all API interactions.

## 1. Error Handling

The SDK uses custom error classes to provide meaningful feedback when API requests fail. Instead of generic HTTP errors, users will receive structured exceptions containing the API's error message and code.

### Classes

#### `TwelveLabsError`
The base class for all SDK-related errors.
- **Properties**:
  - `message`: A human-readable error description.

#### `APIError`
Thrown when the Twelve Labs API returns a non-2xx response.
- **Extends**: `TwelveLabsError`
- **Properties**:
  - `code`: The HTTP status code (e.g., 400, 401, 500).
  - `message`: The error message returned by the API (or a default status text).
  - `body`: The raw response body from the API (useful for debugging validation errors).
  - `requestId`: The `X-Request-ID` header value (if available) for support tracing.

### Usage Example

```typescript
try {
  await client.index.create({ name: "My Index" });
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error (${error.code}): ${error.message}`);
    console.error("Request ID:", error.requestId);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## 2. HTTP Client Wrapper

The internal HTTP client wraps `axios` to standardize request configuration and response handling. It ensures that every request sent by the SDK adheres to the Twelve Labs API requirements.

### Features

- **Authentication**: Automatically injects the `x-api-key` header into every request.
- **Base URL Management**: Configures the correct API version endpoint (v1.3).
- **Response Interception**:
  - Automatically unwraps the `data` property from Axios responses.
  - Catches Axios errors and converts them into `APIError` instances.
- **JSON Handling**: Sets `Content-Type: application/json` by default.

### Internal Usage

Resources (like `Index`, `Task`) will use this client to make requests without worrying about headers or error parsing.

```typescript
// Inside a resource class
const response = await this.client.get('/engines');
// response is the actual data object, not the full Axios response
```
