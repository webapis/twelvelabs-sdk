# Indexes Resource

The `index` resource allows you to create, manage, and retrieve video indexes. An index is a searchable collection of your videos.

## 1. Create an Index

Creates a new video index.

### Method
`client.index.create(name, engines, options?)`

### Parameters
- `name` (`string`): The name of the index.
- `engines` (`EngineOption[]`): An array of engine configurations for the index.
- `options` (`object`, optional): Additional index options.

### Returns
A `Promise` that resolves to the newly created `Index` object.

### Example
```typescript
const newIndex = await client.index.create('my-first-index', [
  {
    name: 'marengo2.5',
    options: ['visual', 'conversation'],
  },
]);
console.log('Created index:', newIndex.id);
```

## 2. List Indexes

Retrieves a paginated list of all your indexes.

### Method
`client.index.list(options?)`

### Parameters
- `options` (`object`, optional): Pagination parameters (`page`, `page_limit`).

### Returns
A `Promise` that resolves to a paginated response containing an array of `Index` objects.

### Example
```typescript
const indexes = await client.index.list({ page: 1 });
indexes.data.forEach(index => console.log(index.name));
```

## 3. Retrieve an Index

Gets the details of a specific index.

### Method
`client.index.retrieve(indexId)`

### Parameters
- `indexId` (`string`): The unique identifier of the index.

### Returns
A `Promise` that resolves to the `Index` object.

### Example
```typescript
const index = await client.index.retrieve('INDEX_ID');
console.log(index.name);
```

## 4. Update an Index

Updates the name of an existing index.

### Method
`client.index.update(indexId, newName)`

### Parameters
- `indexId` (`string`): The unique identifier of the index.
- `newName` (`string`): The new name for the index.

### Returns
A `Promise` that resolves when the operation is complete.

### Example
```typescript
await client.index.update('INDEX_ID', 'my-renamed-index');
```

## 5. Delete an Index

Deletes a specific index and all its associated videos. This action is irreversible.

### Method
`client.index.delete(indexId)`

### Parameters
- `indexId` (`string`): The unique identifier of the index.

### Returns
A `Promise` that resolves when the operation is complete.

### Example
```typescript
await client.index.delete('INDEX_ID');
```
