import { renderHook, act, waitFor } from '@testing-library/react';
import { useSignUpForm } from '@features/auth/hooks/useSignUpForm';
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

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (fn: any) => async () => {
      await fn({
        email: 'test@test.com',
        password: 'pass',
        confirmPassword: 'pass',
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        accountType: 'student'
      });
    },
    trigger: vi.fn().mockResolvedValue(true),
    setValue: vi.fn(),
    watch: vi.fn(),
    setError: vi.fn(),
    formState: { errors: {} },
  }),
  zodResolver: () => vi.fn(),
}));

const mockRegisterExecute = vi.fn();
vi.mock('@domain/use-cases/auth/RegisterUseCase', () => ({
  RegisterUseCase: class {
    execute = mockRegisterExecute;
  }
}));

const mockGetSocialExecute = vi.fn();
vi.mock('@domain/use-cases/auth/GetSocialUserUseCase', () => ({
  GetSocialUserUseCase: class {
    execute = mockGetSocialExecute;
  }
}));

vi.mock('@app/di/container', () => ({
  DI: {
    authRepository: {},
    profileRepository: {}
  }
}));

describe('useSignUpForm Hook', () => {
  const mockOnShowLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe iniciar en el paso 1', () => {
    const { result } = renderHook(() => useSignUpForm(mockOnShowLogin, false));
    expect(result.current.currentStep).toBe(1);
  });

  it('debe avanzar de pasos y registrar al llegar al final', async () => {
    const { result } = renderHook(() => useSignUpForm(mockOnShowLogin, false));

    await act(async () => { await result.current.handleNext(); }); // 1->2
    await act(async () => { await result.current.handleNext(); }); // 2->3
    
    await act(async () => {
      await result.current.handleNext();
    });

    expect(mockRegisterExecute).toHaveBeenCalled();
    expect(result.current.currentStep).toBe(4);
  });

  it('debe manejar errores de "email ya registrado"', async () => {
    mockRegisterExecute.mockRejectedValue(new Error('Email already registered'));

    const { result } = renderHook(() => useSignUpForm(mockOnShowLogin, false));

    await act(async () => { await result.current.handleNext(); });
    await act(async () => { await result.current.handleNext(); });
    
    await act(async () => {
      await result.current.handleNext();
    });

    expect(mockRegisterExecute).toHaveBeenCalled();
    expect(result.current.currentStep).toBe(1);
  });

  it('debe cargar datos sociales si isGoogleFlow es true', async () => {
    const mockSocialUser = { email: 'google@test.com', firstName: 'Google', lastName: 'User' };
    mockGetSocialExecute.mockResolvedValue(mockSocialUser);

    renderHook(() => useSignUpForm(mockOnShowLogin, true));

    await waitFor(() => {
      expect(mockGetSocialExecute).toHaveBeenCalled();
    });
  });
});