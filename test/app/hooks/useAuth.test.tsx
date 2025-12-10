import { renderHook } from '@testing-library/react';
import { useAuth } from '@app/hooks/useAuth';
import { AuthContext } from '@app/context/AuthContext';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

describe('useAuth Hook', () => {
  it('debe retornar los valores del contexto', () => {
    const mockContextValue = {
      user: { id: '1', email: 'test@test.com', role: 'student' } as any,
      setUser: () => {},
      loading: false,
      logout: () => Promise.resolve()
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockContextValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toEqual(mockContextValue.user);
  });

  it('debe lanzar error si se usa fuera del AuthProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    try {
      renderHook(() => useAuth());
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe('useAuth must be used within an AuthProvider');
    }
    
    consoleSpy.mockRestore();
  });
});