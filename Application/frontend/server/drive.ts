// Shared helpers for reading the client's public Google Drive folder.

export interface Env {
  GOOGLE_API_KEY: string;
  DRIVE_FOLDER_ID?: string;
}

export const DEFAULT_FOLDER_ID = '15bLYfLYt9CW3fH-_ixaXL5k6Xi2CQkqN';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  description?: string;
  createdTime: string;
  thumbnailLink?: string;
  parents?: string[];
  imageMediaMetadata?: { width?: number; height?: number };
}

export function folderId(env: Env): string {
  return env.DRIVE_FOLDER_ID || DEFAULT_FOLDER_ID;
}

export async function listImages(env: Env): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q: `'${folderId(env)}' in parents and trashed = false and mimeType contains 'image/'`,
      fields: 'nextPageToken, files(id, name, mimeType, description, createdTime, imageMediaMetadata(width, height))',
      orderBy: 'createdTime desc',
      pageSize: '200',
      key: env.GOOGLE_API_KEY,
    });
    if (pageToken) params.set('pageToken', pageToken);

    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);
    if (!res.ok) throw new Error(`Drive list failed: ${res.status} ${await res.text()}`);
    const data = (await res.json()) as { files: DriveFile[]; nextPageToken?: string };
    files.push(...data.files);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

export async function getFile(env: Env, id: string): Promise<DriveFile | null> {
  const params = new URLSearchParams({
    fields: 'id, name, mimeType, parents, thumbnailLink',
    key: env.GOOGLE_API_KEY,
  });
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${id}?${params}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Drive get failed: ${res.status}`);
  return (await res.json()) as DriveFile;
}

// Camera / phone default names make poor captions.
const GENERIC_NAME = /^(img|dsc|dscn|pxl|mvimg|photo|image|whatsapp image|screenshot|untitled)[\s_-]*|^[\d\s_.-]+$/i;

export function captionFor(f: DriveFile): string {
  if (f.description?.trim()) return f.description.trim();
  const base = f.name.replace(/\.[a-z0-9]+$/i, '').trim();
  if (!base || GENERIC_NAME.test(base)) return '';
  return base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
}
