import axios, { isAxiosError } from 'axios';
import { PointsClientConfig, PointsResponse } from './types';

export class PointsClient {
  private apiKey: string;
  private campaignId: string;
  private serverUrl: string;

  /**
   * Initializes the PointsClient with the provided configuration.
   * @param config - The configuration for the PointsClient, including the API key and campaign ID.
   */
  constructor(config: PointsClientConfig) {
    this.apiKey = config.apiKey;
    this.campaignId = config.campaignId;
    this.serverUrl = 'https://absinthe-api.vercel.app';
  }

  /**
   * Distributes points to a specific address for a given event.
   * @param eventName - The name of the event.
   * @param pointsData - The data containing the points and the recipient address.
   * @throws Will throw an error if distributing points fails.
   */
  async distribute(
    eventName: string,
    pointsData: { points: number; address: string },
  ): Promise<void> {
    try {
      const response = await axios.post(
        `${this.serverUrl}/points/distribute`,
        {
          event_name: eventName,
          ...pointsData,
        },
        {
          headers: {
            api_key: this.apiKey,
            campaign_id: this.campaignId,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(`${error.response?.data?.message}`);
      } else {
        throw new Error(`Error distributing points`);
      }
    }
  }

  /**
   * Retrieves the points for a specific address, optionally filtered by event name.
   * @param address - The address to retrieve points for. For xample, "0x1234..."
   * @param eventName - Optional event name to filter the points by.
   * @returns A list of points records for the specified address and event.
   * @throws Will throw an error if retrieving points fails.
   */
  async getPoints(
    address: string,
    eventName?: string,
  ): Promise<PointsResponse[]> {
    try {
      const response = await axios.get(
        `${this.serverUrl}/points?address=${address}${eventName ? `&event_name=${eventName}` : ''}`,
        {
          headers: {
            api_key: this.apiKey,
            campaign_id: this.campaignId,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(`${error.response?.data?.message}`);
      } else {
        throw new Error(`Error getting points`);
      }
    }
  }
}
