import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const repository = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const destination = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePost = join(repository, 'POST.json');
const deliveredPost = join(destination, 'POST.json');

mkdirSync(destination, { recursive: true });
try {
  copyFileSync(sourcePost, deliveredPost);
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`Unable to deliver POST.json: ${reason}`);
  process.exitCode = 1;
}
