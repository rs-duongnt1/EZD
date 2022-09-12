import { Document } from 'mongoose';

export class IProject extends Document {
  name: string;
  slug: string;
  teamId: string;
  gitUri: string;
  org: string;
  framework: string;
  status: string;
  deletedAt: number;
  updatedAt: number;
  createdAt: number;
}
