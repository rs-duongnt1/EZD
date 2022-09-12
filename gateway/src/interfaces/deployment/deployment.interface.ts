export interface IDeployment {
  _id: string;
  projectId: string;
  state: 'QUEUED' | 'READY' | 'BUILDING';
  url: string;
  readyAt: number;
  buildingAt: number;
  createdAt: number;
  updatedAt: number;
}
