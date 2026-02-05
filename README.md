# Twelve Labs SDK

An enhanced Node.js SDK for the [Twelve Labs API](https://docs.twelvelabs.io/v1.3/api-reference/introduction).

[![Test Status](https://img.shields.io/badge/tests-passing-brightgreen)](./docs/test-report/index.html)

**[View the detailed Test Report](./docs/test-report/index.html)**

## Installation

```bash
npm install twelvelabs-js
```

## Usage

```typescript
import { TwelveLabs } from 'twelvelabs-js';

const client = new TwelveLabs('YOUR_API_KEY');

// Example usage
// const indexes = await client.getIndexes();
```

## Development

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Run tests: `npm test` (This will also generate the test report)
4.  Generate documentation: `npm run docs`
