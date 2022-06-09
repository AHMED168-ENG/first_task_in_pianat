import { Stream } from 'stream';

export interface Uploading {
  filename: string;
  mimtype: string;
  encoding: string;
  createReadStream: () => Stream;
}
