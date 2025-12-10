import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TeamsApiRepository } from '@infra/api/teams/TeamsApiRepository';
import { client } from '@infra/api/http/client';

vi.mock('@infra/api/http/client', () => ({
  client: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('@core/utils/fileUtils', () => ({
  compressImage: vi.fn().mockResolvedValue(new Blob(['compressed'])),
}));

vi.mock('@infra/api/users/ProfileApiRepository', () => {
  return {
    ProfileApiRepository: class {
      getPublicProfile = vi.fn();
    }
  };
});

describe('TeamsApiRepository', () => {
  let repository: TeamsApiRepository;
  let mockProfileRepo: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.stubGlobal('FormData', classMockFormData());
    vi.stubGlobal('File', classMockFile());

    repository = new TeamsApiRepository();
    
    mockProfileRepo = { getPublicProfile: vi.fn() };
    
    (repository as any).profileRepo = mockProfileRepo;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('createTeam', () => {
    it('debe enviar datos y archivo como FormData', async () => {
      const file = new File(['img'], 'cover.jpg', { type: 'image/jpeg' });
      const data = { 
        name: 'Curso 1', 
        description: 'Desc', 
        professorId: 'prof-1', 
        image: file 
      };

      await repository.createTeam(data);

      expect(client.post).toHaveBeenCalledWith('/api/courses', expect.any(FormData));
    });
  });

  describe('getTeamStudents', () => {
    it('debe obtener membresías y enriquecerlas con perfiles', async () => {
      (client.get as any).mockResolvedValue([
        { userid: 'student-1' },
        { userid: 'student-2' }
      ]);

      mockProfileRepo.getPublicProfile
        .mockResolvedValueOnce({ id: 'student-1', name: 'Ana' }) 
        .mockResolvedValueOnce({ id: 'student-2', name: 'Beto' }); 

      const result = await repository.getTeamStudents('team-A');

      expect(client.get).toHaveBeenCalledWith('/api/courses/team-A/students');
      expect(mockProfileRepo.getPublicProfile).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Ana');
    });

    it('debe ignorar estudiantes cuyo perfil no se encuentra (resiliencia)', async () => {
      (client.get as any).mockResolvedValue([
        { userid: 'valid-user' },
        { userid: 'ghost-user' }
      ]);

      mockProfileRepo.getPublicProfile
        .mockResolvedValueOnce({ id: 'valid-user', name: 'Ana' })
        .mockResolvedValueOnce(null); 

      const result = await repository.getTeamStudents('team-B');

      expect(result).toHaveLength(1); 
      expect(result[0].id).toBe('valid-user');
    });
  });
  
  describe('joinTeam', () => {
    it('debe llamar al endpoint de unirse', async () => {
      (client.post as any).mockResolvedValue(true);
      await repository.joinTeam('CODE', 'user-1');
      
      expect(client.post).toHaveBeenCalledWith('/api/memberships/join', {
        access_code: 'CODE',
        user_id: 'user-1'
      });
    });
  });
});

const classMockFormData = () => class { 
  append = vi.fn(); 
};

const classMockFile = () => class { 
  parts: any[];
  name: string;
  options: any;

  constructor(parts: any[], name: string, options: any) {
    this.parts = parts;
    this.name = name;
    this.options = options;
  } 
};