export type SystemMode = 'auto' | 'manual';

export type IrrigationMethod = 'Drip' | 'Sprinkler';

export interface ReceiverNode {
  id: string;
  channel: 1 | 2;
  index: 1 | 2 | 3 | 4;
  code: string; // 'R1', 'R2', etc.
  name: string;
  crop: string;
  method: IrrigationMethod;
  active: boolean;
  moisture: number; // % VWC
  targetMoisture: number;
  flowRateLpm: number;
  rssi: number; // dBm e.g. -74
  battery: number; // %
  parcel: string; // 'A1', 'A2', etc.
  sector: string; // 'Field A - 1.0 Acre'
  acreage: number;
  frequency: string; // '433.92 MHz' or '433.42 MHz'
  lastWateredTime?: string;
  wateringMinutesToday: number;
}

export interface SystemTelemetry {
  soilMoistureAvg: number;
  temperatureC: number;
  tempPeakC: number;
  humidityRh: number;
  rainStatus: 'Dry' | 'Raining' | 'Drizzle';
  rainAmountMm: number;
  solarBatteryPct: number;
  solarCurrentAmps: number;
  solarPanelVoltage: number;
  pumpStatus: 'Running' | 'Standby' | 'Fault';
  pumpPressureBar: number;
  pumpModel: string;
  wirelessConnectedCount: number;
  wirelessTotalCount: number;
  gatewayOnline: boolean;
  lastSyncTime: string;
}

export interface FarmAlert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  resolved: boolean;
}

export interface AutomationConfig {
  autoTriggerMoisture: number; // default 35
  autoCutoffMoisture: number; // default 55
  rainLockoutEnabled: boolean;
  rainThresholdMm: number; // 0.2
  morningPulseTime: string; // '06:00'
  eveningPulseTime: string; // '17:30'
  pulseDurationMinutes: number; // 15
}
