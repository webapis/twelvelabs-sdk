import axios, { AxiosInstance } from 'axios';

export class TwelveLabs {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: 'https://api.twelvelabs.io/v1.3',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  // Placeholder for future methods
  public async getIndexes(): Promise<any> {
      // Implementation to come
      return Promise.resolve([]);
  }
}
