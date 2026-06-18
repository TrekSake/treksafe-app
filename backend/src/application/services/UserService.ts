import type { CreateContactInput, UpsertMedicalInfoInput } from '../dto/user.dto.js';
import type { DataRevocationInput } from '../dto/privacy.dto.js';
import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';

export class UserService {
  constructor(private readonly repo = new UserRepository()) {}

  async upsertMedicalInfo(hikerId: string, input: UpsertMedicalInfoInput) {
    await this.repo.assertHiker(hikerId);

    const encrypted = this.repo.encryptPayload({
      allergies: input.allergies,
      conditions: input.conditions,
      medications: input.medications,
    });

    await this.repo.upsertMedicalInfo(hikerId, input.bloodType, encrypted);

    return {
      bloodType: input.bloodType,
      allergies: input.allergies,
      conditions: input.conditions,
      medications: input.medications,
      consentSigned: true,
    };
  }

  async getMedicalInfo(hikerId: string) {
    await this.repo.assertHiker(hikerId);
    const info = await this.repo.getMedicalInfo(hikerId);
    if (!info) return null;

    return {
      bloodType: info.bloodType,
      allergies: info.payload.allergies,
      conditions: info.payload.conditions,
      medications: info.payload.medications,
      consentSigned: info.consentSigned,
    };
  }

  async listContacts(hikerId: string) {
    await this.repo.assertHiker(hikerId);
    return this.repo.listContacts(hikerId);
  }

  async createContact(hikerId: string, input: CreateContactInput) {
    await this.repo.assertHiker(hikerId);
    return this.repo.createContact(hikerId, {
      fullName: input.fullName,
      relationship: input.relationship,
      phone: input.phone,
      email: input.email,
    });
  }

  async deleteContact(hikerId: string, contactId: string) {
    await this.repo.assertHiker(hikerId);
    await this.repo.deleteContact(hikerId, contactId);
  }

  async revokePersonalData(hikerId: string, input: DataRevocationInput) {
    await this.repo.assertHiker(hikerId);

    if (input.action === 'delete_personal') {
      const result = await this.repo.deletePersonalData(hikerId);
      return {
        message: 'Datos personales eliminados según solicitud ARCO',
        action: input.action,
        ...result,
      };
    }

    const result = await this.repo.anonymizeRouteHistory(hikerId);
    return {
      message: 'Historial de rutas anonimizado correctamente',
      action: input.action,
      ...result,
    };
  }
}
