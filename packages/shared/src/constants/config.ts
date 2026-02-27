// 기본값 — 앱 진입점에서 configure()로 런타임 주입
let _apiBaseUrl = 'http://localhost:8080/api';
let _wsUrl = 'http://localhost:8080';

export function configure(config: { apiBaseUrl?: string; wsUrl?: string }) {
  if (config.apiBaseUrl) _apiBaseUrl = config.apiBaseUrl;
  if (config.wsUrl) _wsUrl = config.wsUrl;
}

export const getApiBaseUrl = () => _apiBaseUrl;
export const getWsUrl = () => _wsUrl;

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INSUFFICIENT_CREDITS: 'INSUFFICIENT_CREDITS',
  TRANSLATION_FAILED: 'TRANSLATION_FAILED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
