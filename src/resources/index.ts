import { Client } from '../core/client';
import { Engine } from './engine';

/**
 * Configuration for an engine when creating an index.
 */
export interface EngineOption {
  /**
   * The name of the engine to use.
   */
  name: string;
  /**
   * The specific indexing options to enable for this engine.
   */
  options: string[];
}

/**
 * Represents a Twelve Labs video index.
 */
export interface Index {
  /**
   * The unique identifier of the index.
   */
  id: string;
  /**
   * The name of the index.
   */
  name: string;
  /**
   * An array of engines configured for this index.
   */
  engines: Engine[];
  /**
   * The date and time the index was created.
   */
  createdAt: string;
  /**
   * The date and time the index was last updated.
   */
  updatedAt: string;
}

/**
 * Options for paginated requests.
 */
export interface PaginationOptions {
  /**
   * The page number to retrieve.
   * @default 1
   */
  page?: number;
  /**
   * The number of items to retrieve per page.
   * @default 10
   */
  page_limit?: number;
}

/**
 * A generic paginated response from the API.
 */
export interface PaginatedResponse<T> {
  /**
   * The data for the current page.
   */
  data: T[];
  /**
   * Information about the current pagination state.
   */
  page_info: {
    page: number;
    page_limit: number;
    total_pages: number;
    total_items: number;
  };
}

/**
 * The resource for interacting with the Indexes API.
 */
export class IndexResource {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Creates a new video index.
   * @param name The name of the index.
   * @param engines An array of engine configurations for the index.
   * @returns A promise that resolves to the newly created `Index` object.
   * @example
   * ```typescript
   * const newIndex = await client.index.create('my-first-index', [
   *   {
   *     name: 'marengo2.5',
   *     options: ['visual', 'conversation'],
   *   },
   * ]);
   * console.log('Created index:', newIndex.id);
   * ```
   */
  public async create(name: string, engines: EngineOption[]): Promise<Index> {
    return this.client.post<Index>('/indexes', { name, engines });
  }

  /**
   * Retrieves a paginated list of all your indexes.
   * @param options Optional pagination parameters.
   * @returns A promise that resolves to a paginated response of `Index` objects.
   * @example
   * ```typescript
   * const indexes = await client.index.list({ page: 1 });
   * indexes.data.forEach(index => console.log(index.name));
   * ```
   */
  public async list(options?: PaginationOptions): Promise<PaginatedResponse<Index>> {
    return this.client.get<PaginatedResponse<Index>>('/indexes', options);
  }

  /**
   * Gets the details of a specific index.
   * @param indexId The unique identifier of the index.
   * @returns A promise that resolves to the `Index` object.
   * @example
   * ```typescript
   * const index = await client.index.retrieve('INDEX_ID');
   * console.log(index.name);
   * ```
   */
  public async retrieve(indexId: string): Promise<Index> {
    return this.client.get<Index>(`/indexes/${indexId}`);
  }

  /**
   * Updates the name of an existing index.
   * @param indexId The unique identifier of the index.
   * @param newName The new name for the index.
   * @returns A promise that resolves when the operation is complete.
   * @example
   * ```typescript
   * await client.index.update('INDEX_ID', 'my-renamed-index');
   * ```
   */
  public async update(indexId: string, newName: string): Promise<void> {
    await this.client.put(`/indexes/${indexId}`, { name: newName });
  }

  /**
   * Deletes a specific index and all its associated videos. This action is irreversible.
   * @param indexId The unique identifier of the index.
   * @returns A promise that resolves when the operation is complete.
   * @example
   * ```typescript
   * await client.index.delete('INDEX_ID');
   * ```
   */
  public async delete(indexId: string): Promise<void> {
    await this.client.delete(`/indexes/${indexId}`);
  }
}
