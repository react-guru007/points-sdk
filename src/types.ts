export interface PointsClientConfig {
  apiKey: string;
  campaignId: string;
}

export interface RegisterApiKey {
  campaignName: string;
  campaignId: string;
  apiKey: string;
}

export interface PointsResponse {
  id: string;
  eventName: string;
  address: string;
  points: number;
  createdAt: string;
  campaign: string;
}
