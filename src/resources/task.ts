import { Client } from '../core/client';
import { PaginatedResponse, PaginationOptions } from './index';
import * as fs from 'fs';
import FormData from 'form-data';
import { Readable } from 'stream';

/**
 * The status of an indexing task.
 */
export type TaskStatus = 'pending' | 'processing' | 'ready' | 'failed';

/**
 * Represents a video indexing task.
 * @category Resources.Task
 */
export interface Task {
  /**
   * The unique identifier of the task.
   */
  id: string;
  /**
   * The unique identifier of the video associated with this task.
   */
  video_id: string;
  /**
   * The current status of the task.
   */
  status: TaskStatus;
  /**
   * The date and time the task was created.
   */
  createdAt: string;
  /**
   * The date and time the task was last updated.
   */
  updatedAt: string;
}

/**
 * Options for creating a task.
 * @category Resources.Task
 */
export interface TaskCreateOptions {
  /**
   * The language of the video. If not specified, the language will be detected automatically.
   */
  language?: string;
}

/**
 * The resource for interacting with the Tasks API.
 * @category Resources.Task
 */
export class TaskResource {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Creates a new task to index a video from a URL or a file.
   * @param indexId The identifier of the index to add the video to.
   * @param pathOrUrl A local file path, a public URL, or a readable stream of the video file.
   * @param options Optional parameters for the task.
   * @returns A promise that resolves to the newly created `Task` object.
   * @example (from URL)
   * ```typescript
   * const task = await client.task.create('INDEX_ID', 'https://example.com/my-video.mp4', {
   *   language: 'en',
   * });
   * console.log(`Task created with ID: ${task.id}`);
   * ```
   * @example (from File Path)
   * ```typescript
   * const task = await client.task.create('INDEX_ID', './path/to/my-video.mp4');
   * console.log(`Task created with ID: ${task.id}`);
   * ```
   */
  public async create(
    indexId: string,
    pathOrUrl: string | Readable,
    options?: TaskCreateOptions
  ): Promise<Task> {
    if (typeof pathOrUrl === 'string' && (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://'))) {
      return this.createFromUrl(indexId, pathOrUrl, options);
    } else {
      return this.createFromFile(indexId, pathOrUrl, options);
    }
  }

  private async createFromUrl(
    indexId: string,
    url: string,
    options?: TaskCreateOptions
  ): Promise<Task> {
    const body = {
      index_id: indexId,
      url: url,
      ...options,
    };
    return this.client.post<Task>('/tasks', body);
  }

  private async createFromFile(
    indexId: string,
    pathOrStream: string | Readable,
    options?: TaskCreateOptions
  ): Promise<Task> {
    const form = new FormData();
    form.append('index_id', indexId);
    if (options?.language) {
      form.append('language', options.language);
    }

    const stream = typeof pathOrStream === 'string' ? fs.createReadStream(pathOrStream) : pathOrStream;
    form.append('video_file', stream);

    return this.client.post<Task>('/tasks', form, {
      headers: form.getHeaders(),
    });
  }

  /**
   * Retrieves a paginated list of all tasks for a specific index.
   * @param indexId The identifier of the index.
   * @param options Optional pagination and filtering parameters.
   * @returns A promise that resolves to a paginated response of `Task` objects.
   * @example
   * ```typescript
   * const tasks = await client.task.list('INDEX_ID', { page: 1 });
   * tasks.data.forEach(task => console.log(`Task ${task.id} status: ${task.status}`));
   * ```
   */
  public async list(
    indexId: string,
    options?: PaginationOptions
  ): Promise<PaginatedResponse<Task>> {
    return this.client.get<PaginatedResponse<Task>>(`/tasks`, { ...options, index_id: indexId });
  }

  /**
   * Gets the current status and details of a specific indexing task.
   * @param taskId The unique identifier of the task.
   * @returns A promise that resolves to the `Task` object.
   * @example
   * ```typescript
   * const task = await client.task.retrieve('TASK_ID');
   * if (task.status === 'ready') {
   *   console.log(`Video ${task.video_id} is ready!`);
   * }
   * ```
   */
  public async retrieve(taskId: string): Promise<Task> {
    return this.client.get<Task>(`/tasks/${taskId}`);
  }

  /**
   * Creates a task to index a video from an external provider (e.g., YouTube).
   * @param indexId The identifier of the index.
   * @param url The URL of the video from the external provider.
   * @param options Optional parameters for the task.
   * @returns A promise that resolves to the newly created `Task` object.
   * @example
   * ```typescript
   * const task = await client.task.createExternal('INDEX_ID', 'https://youtube.com/watch?v=...');
   * console.log(`Task created with ID: ${task.id}`);
   * ```
   */
  public async createExternal(
    indexId: string,
    url: string,
    options?: TaskCreateOptions
  ): Promise<Task> {
    const body = {
      index_id: indexId,
      url: url,
      ...options,
    };
    return this.client.post<Task>('/tasks/external-provider', body);
  }
}
