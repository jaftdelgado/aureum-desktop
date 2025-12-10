import { renderHook, act, waitFor } from '@testing-library/react';
import { useLessonsPage } from '@features/lessons/pages/hooks/useLessonsPage'; 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LessonsRepository } from '@infra/api/lessons/LessonsRepository';

vi.mock('@infra/api/lessons/LessonsRepository', () => ({
  LessonsRepository: {
    getAll: vi.fn(),
  },
}));

describe('useLessonsPage Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('debe iniciar cargando las lecciones', () => {
    vi.mocked(LessonsRepository.getAll).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useLessonsPage());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.lessons).toEqual([]);
  });

  it('debe cargar la lista de lecciones exitosamente', async () => {
    const mockLessons = [
      { id: '1', title: 'Intro a Forex', description: 'Básico' },
      { id: '2', title: 'Velas Japonesas', description: 'Intermedio' }
    ];

    vi.mocked(LessonsRepository.getAll).mockResolvedValue(mockLessons as any);

    const { result } = renderHook(() => useLessonsPage());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.lessons).toEqual(mockLessons);
    expect(LessonsRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('debe manejar errores en la carga', async () => {
    const error = new Error('API Error');
    vi.mocked(LessonsRepository.getAll).mockRejectedValue(error);

    const { result } = renderHook(() => useLessonsPage());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.lessons).toEqual([]);
    expect(console.error).toHaveBeenCalledWith("Error cargando lecciones:", error);
  });

  it('debe permitir seleccionar y deseleccionar una lección', async () => {
    // Setup inicial sin datos importantes
    vi.mocked(LessonsRepository.getAll).mockResolvedValue([]);
    const { result } = renderHook(() => useLessonsPage());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const mockLesson = { id: '1', title: 'Video Test' } as any;

    act(() => {
      result.current.setSelectedLesson(mockLesson);
    });

    expect(result.current.selectedLesson).toEqual(mockLesson);

    act(() => {
      result.current.setSelectedLesson(null);
    });

    expect(result.current.selectedLesson).toBeNull();
  });
});