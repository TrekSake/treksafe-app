import { AppError } from '../../shared/errors/AppError.js';
import type {
  LoginInput,
  RegisterHikerInput,
  RegisterRescuerInput,
} from '../dto/auth.dto.js';
import { PostgresAuthRepository } from '../../infrastructure/repositories/PostgresAuthRepository.js';
import { hashPassword, verifyPassword } from '../../infrastructure/security/password.js';
import { signToken } from '../../infrastructure/security/jwt.js';

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: 'senderista' | 'rescatista';
  };
};

export class AuthService {
  constructor(private readonly repo = new PostgresAuthRepository()) {}

  async registerHiker(input: RegisterHikerInput): Promise<AuthResponse> {
    const existing = await this.repo.findUserByEmail(input.email);
    if (existing) {
      throw new AppError(400, 'El correo electrónico ya está registrado', 'EMAIL_EXISTS');
    }

    const docExists = await this.repo.existsHikerDocument(input.documentId);
    if (docExists) {
      throw new AppError(400, 'El DNI ya está registrado', 'DOCUMENT_EXISTS');
    }

    const passwordHash = await hashPassword(input.password);

    const user = await this.repo.registerHiker({
      email: input.email,
      passwordHash,
      fullName: input.fullName,
      documentId: input.documentId,
      phone: input.phone,
    });

    const token = signToken({ sub: user.id, role: user.role });

    return {
      token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.repo.findUserByEmail(input.email);
    if (!user) {
      throw new AppError(401, 'Credenciales inválidas', 'INVALID_CREDENTIALS');
    }

    const valid = await verifyPassword(input.password, user.password_hash);
    if (!valid) {
      throw new AppError(401, 'Credenciales inválidas', 'INVALID_CREDENTIALS');
    }

    const token = signToken({ sub: user.id, role: user.role });

    return {
      token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async registerRescuer(input: RegisterRescuerInput): Promise<AuthResponse> {
    const credential = await this.repo.findActiveInstitutionalCredential(
      input.institution,
      input.credentialNumber,
      input.fullName,
      input.birthDate,
    );

    if (!credential) {
      throw new AppError(
        403,
        'No se pudo validar la credencial institucional. Verifique institución, número, nombre y fecha de nacimiento.',
        'CREDENTIAL_VALIDATION_FAILED',
      );
    }

    const existing = await this.repo.findUserByEmail(input.email);
    if (existing) {
      throw new AppError(400, 'El correo electrónico ya está registrado', 'EMAIL_EXISTS');
    }

    const passwordHash = await hashPassword(input.password);

    const user = await this.repo.registerRescuer({
      email: input.email,
      passwordHash,
      fullName: input.fullName,
      credentialNumber: input.credentialNumber,
      birthDate: input.birthDate,
    });

    const token = signToken({ sub: user.id, role: user.role });

    return {
      token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
