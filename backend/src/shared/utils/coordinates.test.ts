import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeExpeditionRiskLevel,
} from '../../application/services/RescueService.js';
import { parseDecimalCoordinates, validateCoordinateInput } from './coordinates.js';

describe('computeExpeditionRiskLevel', () => {
  const deadline = new Date(Date.now() + 60 * 60_000).toISOString();

  it('returns green when plenty of time remains', () => {
    const result = computeExpeditionRiskLevel('in_progress', deadline);
    assert.equal(result.riskLevel, 'green');
    assert.ok(result.minutesRemaining && result.minutesRemaining > 30);
  });

  it('returns yellow within 30 minutes', () => {
    const soon = new Date(Date.now() + 20 * 60_000).toISOString();
    const result = computeExpeditionRiskLevel('in_progress', soon);
    assert.equal(result.riskLevel, 'yellow');
  });

  it('returns red for alert status', () => {
    const result = computeExpeditionRiskLevel('alert', deadline);
    assert.equal(result.riskLevel, 'red');
  });
});

describe('parseDecimalCoordinates', () => {
  it('accepts valid decimal coordinates', () => {
    const parsed = parseDecimalCoordinates('-9.5300, -77.5300');
    assert.ok(parsed);
    assert.equal(parsed.lat, -9.53);
    assert.equal(parsed.lon, -77.53);
  });

  it('rejects malformed input', () => {
    assert.equal(parseDecimalCoordinates('not-coords'), null);
  });

  it('rejects coordinates outside Peru via validateCoordinateInput', () => {
    assert.ok(validateCoordinateInput('40.7128, -74.0060'));
  });
});
