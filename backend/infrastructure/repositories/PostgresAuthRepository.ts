import { AppError } from '../../shared/errors/AppError.js';
import { getSupabaseAdmin, type DbUser } from '../database/supabase.js';

export type InstitutionalCredential = {
  institution: string;
  credential_number: string;
  full_name: string;
  birth_date: string;
  is_active: boolean;
};

export class PostgresAuthRepository {
  private readonly supabase = getSupabaseAdmin();

  async findUserByEmail(email: string): Promise<DbUser | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('id, email, password_hash, role')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error) throw new AppError(500, `Error al consultar usuario: ${error.message}`);
    return data as DbUser | null;
  }

  async findUserById(userId: string): Promise<DbUser | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('id, email, password_hash, role')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw new AppError(500, `Error al consultar usuario: ${error.message}`);
    return data as DbUser | null;
  }

  async existsHikerDocument(documentId: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('hikers_profile')
      .select('user_id')
      .eq('document_id', documentId)
      .maybeSingle();

    if (error) throw new AppError(500, `Error al consultar DNI: ${error.message}`);
    return data !== null;
  }

  async findActiveInstitutionalCredential(
    institution: string,
    credentialNumber: string,
    fullName: string,
    birthDate: string,
  ): Promise<InstitutionalCredential | null> {
    const { data, error } = await this.supabase
      .from('institutional_rescuer_registry')
      .select('institution, credential_number, full_name, birth_date, is_active')
      .eq('institution', institution)
      .eq('credential_number', credentialNumber)
      .eq('full_name', fullName)
      .eq('birth_date', birthDate)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw new AppError(500, `Error al validar credencial: ${error.message}`);
    return data as InstitutionalCredential | null;
  }

  async registerHiker(data: {
    email: string;
    passwordHash: string;
    fullName: string;
    documentId: string;
    phone: string;
  }): Promise<{ id: string; email: string; role: 'senderista' }> {
    const { data: user, error: userError } = await this.supabase
      .from('users')
      .insert({
        email: data.email.toLowerCase(),
        password_hash: data.passwordHash,
        role: 'senderista',
      })
      .select('id, email, role')
      .single();

    if (userError || !user) {
      throw new AppError(500, userError?.message ?? 'Error al crear usuario');
    }

    const { error: profileError } = await this.supabase.from('hikers_profile').insert({
      user_id: user.id,
      full_name: data.fullName,
      phone: data.phone,
      document_id: data.documentId,
    });

    if (profileError) {
      await this.supabase.from('users').delete().eq('id', user.id);
      throw new AppError(500, profileError.message);
    }

    return user as { id: string; email: string; role: 'senderista' };
  }

  async registerRescuer(data: {
    email: string;
    passwordHash: string;
    fullName: string;
    credentialNumber: string;
    birthDate: string;
  }): Promise<{ id: string; email: string; role: 'rescatista' }> {
    const { data: user, error: userError } = await this.supabase
      .from('users')
      .insert({
        email: data.email.toLowerCase(),
        password_hash: data.passwordHash,
        role: 'rescatista',
      })
      .select('id, email, role')
      .single();

    if (userError || !user) {
      throw new AppError(500, userError?.message ?? 'Error al crear usuario');
    }

    const { error: profileError } = await this.supabase.from('rescuers_profile').insert({
      user_id: user.id,
      credential_number: data.credentialNumber,
      full_name: data.fullName,
      birth_date: data.birthDate,
    });

    if (profileError) {
      await this.supabase.from('users').delete().eq('id', user.id);
      throw new AppError(500, profileError.message);
    }

    return user as { id: string; email: string; role: 'rescatista' };
  }
}
