import { unlinkSync } from 'fs';

const DestroyFileHelperMethod = (path: string) => {
  try {
    unlinkSync(path);
  } catch (error) {
    console.log(error);
  }
};

export { DestroyFileHelperMethod };
