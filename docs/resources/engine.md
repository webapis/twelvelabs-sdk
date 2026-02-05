# Engines Resource

The `engine` resource allows you to retrieve information about the available video understanding engines.

## List Engines

Retrieve a list of all available engines, including their capabilities and allowed index options.

### Method

`client.engine.list()`

### Returns

Returns a `Promise` that resolves to an array of `Engine` objects.

### Example

```typescript
import { TwelveLabs } from 'twelvelabs-js';

const client = new TwelveLabs('<YOUR_API_KEY>');

const engines = await client.engine.list();

engines.forEach((engine) => {
  console.log(`Engine: ${engine.id}`);
  console.log(`Allowed Index Options: ${engine.allowed_index_options.join(', ')}`);
});
```

### Response Object: `Engine`

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | The unique identifier of the engine (e.g., `marengo2.5`, `pegasus1`). |
| `author` | `string` | The author or creator of the engine (e.g., `Twelve Labs`). |
| `allowed_index_options` | `string[]` | A list of indexing options supported by this engine (e.g., `visual`, `conversation`, `text_in_video`, `logo`). |
| `ready` | `boolean` | Indicates whether the engine is ready for use. |
| `finetune` | `boolean` | Indicates whether the engine supports fine-tuning. |
