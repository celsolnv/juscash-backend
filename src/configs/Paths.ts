import { resolve } from 'path';

class Paths {
  static readonly IMAGES = resolve(
    __dirname,
    '..',
    '..',
    'src',
    'static',
    'images'
  );
  static readonly UPLOADS = resolve(__dirname, '..', '..', 'files', 'uploads');
  static readonly TEMPLATES = resolve(
    __dirname,
    '..',
    '..',
    'src',
    'static',
    'templates'
  );
}

export { Paths };
