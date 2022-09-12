export interface IProject {
  _id: string;
  name: string;
  slug: string;
  gitUri: string;
  org: string;
  framework: string;
  status: string;
  deletedAt: number;
  updatedAt: number;
  createdAt: number;
}
