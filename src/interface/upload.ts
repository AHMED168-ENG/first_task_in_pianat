import { ReadStream } from 'fs';

export interface FileUploading {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}
