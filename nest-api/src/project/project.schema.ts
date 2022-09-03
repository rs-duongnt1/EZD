import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true,
})
export class Project {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  org: string;

  @Prop()
  framework: string;

  @Prop()
  status: string;

  @Prop()
  deletedAt: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
