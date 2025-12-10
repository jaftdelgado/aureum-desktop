import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthApiRepository } from '@infra/external/auth/AuthApiRepository';
import { supabase } from '@infra/external/http/supabase';

vi.mock('@infra/external/http/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
  },
}));

describe('AuthApiRepository', () => {
  let repository: AuthApiRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new AuthApiRepository();
  });

  describe('login', () => {
    it('debe llamar a signInWithPassword y retornar el usuario mapeado', async () => {
      const mockResponse = {
        data: { user: { id: '123', email: 'test@test.com' }, session: { access_token: 'token' } },
        error: null
      };
      (supabase.auth.signInWithPassword as any).mockResolvedValue(mockResponse);

      const result = await repository.login('test@test.com', '123456');

      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: '123456',
      });
      expect(result.id).toBe('123');
    });

    it('debe lanzar error si Supabase falla', async () => {
      (supabase.auth.signInWithPassword as any).mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid login credentials' }
      });

      await expect(repository.login('test@test.com', 'wrong')).rejects.toThrow('Invalid login credentials');
    });
  });

  describe('register', () => {
    it('debe llamar a signUp correctamente', async () => {
      const mockResponse = {
        data: { user: { id: 'new-id', email: 'new@test.com' } },
        error: null
      };
      (supabase.auth.signUp as any).mockResolvedValue(mockResponse);

      const registerData = {
        email: 'new@test.com',
        password: 'pass',
        username: 'user1',
        firstName: 'Juan',
        lastName: 'Perez',
        accountType: 'student' as const,
        isGoogle: false
      };

      await repository.register(registerData);

      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'new@test.com',
        password: 'pass',
      });
    });
  });

  describe('logout', () => {
    it('debe cerrar sesión y limpiar storage', async () => {
      const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        clear: vi.fn(),
        removeItem: vi.fn(),
        length: 0,
        key: vi.fn(),
      };
      vi.stubGlobal('sessionStorage', mockStorage);
      vi.stubGlobal('localStorage', mockStorage);

      (supabase.auth.signOut as any).mockResolvedValue({ error: null });

      await repository.logout();

      expect(supabase.auth.signOut).toHaveBeenCalled();
      expect(mockStorage.clear).toHaveBeenCalled();
    });
  });

  describe('getSession', () => {
    it('debe retornar el usuario si existe sesión', async () => {
      (supabase.auth.getSession as any).mockResolvedValue({
        data: { session: { user: { id: 'session-id', email: 's@s.com' } } },
        error: null
      });

      const user = await repository.getSession();
      expect(user?.id).toBe('session-id');
    });

    it('debe retornar null si no hay sesión', async () => {
      (supabase.auth.getSession as any).mockResolvedValue({
        data: { session: null },
        error: null
      });

      const user = await repository.getSession();
      expect(user).toBeNull();
    });
  });
});