import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProfileApiRepository } from '@infra/api/users/ProfileApiRepository';
import { client } from '@infra/api/http/client';

vi.mock('@infra/api/http/client', () => ({
  client: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    getBlob: vi.fn(),
  },
  HttpError: class HttpError extends Error {
    status: number;
    constructor(status: number) { super(); this.status = status; }
  }
}));

vi.mock('@core/utils/fileUtils', () => ({
  compressImage: vi.fn().mockResolvedValue(new Blob(['compressed'])),
  blobToBase64: vi.fn().mockResolvedValue('base64_image_string'),
}));

describe('ProfileApiRepository', () => {
  let repository: ProfileApiRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new ProfileApiRepository();
    
    vi.stubGlobal('FormData', classMockFormData());
    vi.stubGlobal('File', classMockFile());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getPublicProfile', () => {
    it('debe obtener el perfil y procesar el avatar si existe', async () => {
      (client.get as any).mockResolvedValue({
        id: 'u1',
        full_name: 'Juan Perez',
        profile_pic_id: 'avatar-123' 
      });
      (client.getBlob as any).mockResolvedValue(new Blob(['img']));

      const result = await repository.getPublicProfile('u1');

      expect(client.get).toHaveBeenCalledWith('/api/users/profiles/u1');
      expect(client.getBlob).toHaveBeenCalledWith('/api/users/profiles/u1/avatar');
      expect(result?.avatarUrl).toBe('base64_image_string');
      expect(result?.name).toBe('Juan Perez');
    });

    it('debe retornar null si el perfil no existe (404)', async () => {
      const error404 = new Error('Not Found');
      (error404 as any).status = 404;
      (client.get as any).mockRejectedValue(error404);

      const result = await repository.getPublicProfile('ghost-user');

      expect(result).toBeNull(); 
    });
  });

  describe('updateProfile', () => {
    it('debe enviar patch al endpoint correcto', async () => {
      await repository.updateProfile('u1', { bio: 'Nueva bio' });
      
      expect(client.patch).toHaveBeenCalledWith('/api/users/profiles/u1', {
        bio: 'Nueva bio'
      });
    });
  });

  describe('uploadAvatar', () => {
    it('debe enviar la imagen usando FormData', async () => {
      const file = new File(['content'], 'avatar.jpg', { type: 'image/jpeg' });
      await repository.uploadAvatar('u1', file);

      expect(client.post).toHaveBeenCalledTimes(1);
      const [url, body] = (client.post as any).mock.calls[0];
      
      expect(url).toBe('/api/users/profiles/u1/avatar');
      expect(body).toBeInstanceOf(FormData);
    });
  });
});

const classMockFormData = () => class { append = vi.fn(); };
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