import { Client } from '../core/client';

/**
 * Represents a video understanding engine provided by Twelve Labs.
 */
export interface Engine {
  /**
   * The unique identifier of the engine (e.g., `marengo2.5`, `pegasus1`).
   */
  id: string;
  /**
   * The author or creator of the engine (e.g., `Twelve Labs`).
   */
  author: string;
  /**
   * A list of indexing options supported by this engine (e.g., `visual`, `conversation`, `text_in_video`, `logo`).
   */
  allowed_index_options: string[];
  /**
   * Indicates whether the engine is ready for use.
   */
  ready: boolean;
  /**
   * Indicates whether the engine supports fine-tuning.
   */
  finetune: boolean;
}

/**
 * The resource for interacting with the Engines API.
 */
export class EngineResource {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Retrieves a list of all available video understanding engines.
   * @returns A promise that resolves to an array of `Engine` objects.
   * @example
   * ```typescript
   * import { TwelveLabs } from 'twelvelabs-js';
   *
   * const client = new TwelveLabs('YOUR_API_KEY');
   *
   * const engines = await client.engine.list();
   * console.log(engines);
   * ```
   */
  public async list(): Promise<Engine[]> {
    const response = await this.client.get<{ data: Engine[] }>('/engines');
    return response.data;
  }
}
