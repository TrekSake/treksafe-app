import crypto from 'node:crypto';
import { loadEnv } from '../config/env.js';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function deriveKey(): Buffer {
  const { medicalEncryptionKey } = loadEnv();
  if (!medicalEncryptionKey) {
    throw new Error('MEDICAL_ENCRYPTION_KEY no configurada');
  }
  return crypto.scryptSync(medicalEncryptionKey, 'treksafe-medical-v1', 32);
}

export type MedicalPayload = {
  allergies: string;
  conditions: string;
  medications: string;
};

export function encryptMedicalPayload(payload: MedicalPayload): string {
  const key = deriveKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const plaintext = JSON.stringify(payload);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

export function decryptMedicalPayload(ciphertext: string): MedicalPayload {
  const key = deriveKey();
  const data = Buffer.from(ciphertext, 'base64');

  const iv = data.subarray(0, IV_LENGTH);
  const authTag = data.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = data.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
    'utf8',
  );

  return JSON.parse(decrypted) as MedicalPayload;
}
