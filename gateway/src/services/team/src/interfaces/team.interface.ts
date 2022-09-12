import { Document } from 'mongoose';

export class ITeam extends Document {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
