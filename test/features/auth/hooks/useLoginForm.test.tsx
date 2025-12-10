import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '@features/auth/hooks/useLoginForm';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockSetUser = vi.fn();
vi.mock('@app/hooks/useAuth', () => ({
  useAuth: () => ({
    setUser: mockSetUser
  })
}));

const mockExecute = vi.fn();
vi.mock('@domain/use-cases/auth/LoginUseCase', () => ({
  LoginUseCase: class {
    execute = mockExecute;
  }
}));

vi.mock('@app/di/container', () => ({
  DI: {
    authRepository: {},
    profileRepository: {}
  }
}));

describe('useLoginForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('debe iniciar con estado limpio', () => {
    const { result } = renderHook(() => useLoginForm());
    
    expect(result.current.loading).toBe(false);
    expect(result.current.errorMsg).toBeNull();
    expect(result.current.errors).toEqual({});
  });

  it('debe manejar un login exitoso', async () => {
    const mockUser = { id: '123', role: 'student' };
    mockExecute.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.handleSubmit({ email: 'test@test.com', password: 'password123' });
    });

    expect(mockExecute).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(mockSetUser).toHaveBeenCalledWith(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('debe manejar errores de credenciales', async () => {
    mockExecute.mockRejectedValue(new Error('Invalid login credentials'));

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.handleSubmit({ email: 'fail@test.com', password: 'wrong' });
    });

    expect(mockExecute).toHaveBeenCalled();
    expect(result.current.errorMsg).toBe('INVALID_CREDENTIALS');
    expect(result.current.loading).toBe(false);
  });
});