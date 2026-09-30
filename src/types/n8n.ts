export type N8nHostingType = 'cloud' | 'self_hosted';

export interface N8nClientConfig {
  instanceUrl: string;
  apiKey: string;
  webhookEndpoint: string;
  hostingType: N8nHostingType;
  isConnected: boolean;
  lastPingAt?: string;
  pingLatencyMs?: number;
  environmentName?: string;
  autoSyncEnabled?: boolean;
}

export interface MakeClientConfig {
  webhookUrl: string;
  isConnected: boolean;
  lastTriggerAt?: string;
  scenarioName?: string;
}

export interface ZapierClientConfig {
  webhookUrl: string;
  isConnected: boolean;
  lastTriggerAt?: string;
  zapName?: string;
}

export interface N8nTestPayload {
  sourceApp: string;
  eventType: string;
  timestamp: string;
  payload: Record<string, unknown>;
}
