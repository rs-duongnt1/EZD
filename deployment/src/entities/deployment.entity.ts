import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'deployments',
})
export class Deployment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: string;

  @Column()
  state: string;

  @Column()
  url: string;

  @Column({
    nullable: true,
  })
  readyAt: Date;

  @Column({
    nullable: true,
  })
  buildingAt: Date;

  @Column({ default: 'development' })
  target: string;
}
