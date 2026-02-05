# Tasks Resource

The `task` resource allows you to manage the video indexing process. When you upload a video to an index, a task is created. You can then use this resource to monitor the status of that task.

## 1. Create a Task (Upload Video)

Creates a new task to index a video. You can provide a video via a local file path or a public URL.

### Method
`client.task.create(indexId, pathOrUrl, options?)`

### Parameters
- `indexId` (`string`): The identifier of the index to add the video to.
- `pathOrUrl` (`string` | `Readable`): A local file path, a public URL, or a readable stream of the video file.
- `options` (`object`, optional): Additional parameters like `language`.

### Returns
A `Promise` that resolves to the newly created `Task` object.

### Example (from URL)
```typescript
const task = await client.task.create('INDEX_ID', 'https://example.com/my-video.mp4', {
  language: 'en',
});
console.log(`Task created with ID: ${task.id}`);
```

### Example (from File Path)
```typescript
const task = await client.task.create('INDEX_ID', './path/to/my-video.mp4');
console.log(`Task created with ID: ${task.id}`);
```

## 2. List Tasks

Retrieves a paginated list of all tasks for a specific index.

### Method
`client.task.list(indexId, options?)`

### Parameters
- `indexId` (`string`): The identifier of the index.
- `options` (`object`, optional): Pagination and filtering parameters.

### Returns
A `Promise` that resolves to a paginated response of `Task` objects.

### Example
```typescript
const tasks = await client.task.list('INDEX_ID', { page: 1 });
tasks.data.forEach(task => console.log(`Task ${task.id} status: ${task.status}`));
```

## 3. Retrieve a Task

Gets the current status and details of a specific indexing task.

### Method
`client.task.retrieve(taskId)`

### Parameters
- `taskId` (`string`): The unique identifier of the task.

### Returns
A `Promise` that resolves to the `Task` object.

### Example
```typescript
const task = await client.task.retrieve('TASK_ID');
if (task.status === 'ready') {
  console.log(`Video ${task.video_id} is ready!`);
}
```

## 4. Create Task from External Provider

Creates a task to index a video from an external provider (e.g., YouTube).

### Method
`client.task.createExternal(indexId, url, options?)`

### Parameters
- `indexId` (`string`): The identifier of the index.
- `url` (`string`): The URL of the video from the external provider.
- `options` (`object`, optional): Additional parameters.

### Returns
A `Promise` that resolves to the newly created `Task` object.

### Example
```typescript
const task = await client.task.createExternal('INDEX_ID', 'https://youtube.com/watch?v=...');
console.log(`Task created with ID: ${task.id}`);
```
