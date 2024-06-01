# PointsClient SDK

The PointsClient SDK provides a simple interface to interact with the points distribution system for your campaigns. This SDK allows you to distribute points to user addresses, and retrieve points information.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Get API key](#get-api-key)
  - [Initialization](#initialization)
  - [Distribute Points](#distribute-points)
  - [Get Points](#get-points)
- [Types](#types)

## Installation

Install the SDK using npm:

```sh
npm install points-client-sdk
```

## Usage

### Get API key

You can get your API key by calling the Absinthe API(/auth/api-key) with your campaign name and campaign ID.

### Initialization

To use the PointsClient SDK, you need to initialize it with your configuration, including the API key and campaign ID.

```sh
import { PointsClient } from 'points-client-sdk';

const pointsClient = new PointsClient({
  apiKey: 'your-api-key',
  campaignId: 'your-campaign-id',
});
```

### Distribute Points

Distribute points to a specific address for a given event.

```sh
pointsClient.distribute('eventName', {
  address: '0x1234567890abcdef1234567890abcdef12345678',
  points: 100,
})
  .then(() => {
    console.log('Points distributed successfully');
  })
  .catch((error) => {
    console.error('Error distributing points:', error);
  });
```

### Get Points

Retrieve points for a specific address, optionally filtered by event name.

```sh
pointsClient.getPoints('0x1234567890abcdef1234567890abcdef12345678', 'eventName')
  .then((points) => {
    console.log('Points:', points);
  })
  .catch((error) => {
    console.error('Error getting points:', error);
  });
```

## Types

### PointsClientConfig

Configuration object for initializing the PointsClient.

```sh
interface PointsClientConfig {
  apiKey: string;
  campaignId: string;
}
```

### PointsResponse

Response format for points data.

```sh
interface PointsResponse {
  event_name: string;
  address: string;
  points: number;
  timestamp: string;
}
```
