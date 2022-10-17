import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'deployments',
})
export class Deployment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  state: string;

  @Column({
    nullable: true,
  })
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

  @Column('simple-json', { nullable: true })
  head_commit: {
    id: string;
    message: string;
    timestamp: Date;
  };

  @Column('simple-json', { nullable: true })
  author: {
    name: string;
    email: string;
    username: string;
  };

  @Column('simple-json', { nullable: true })
  committer: {
    name: string;
    email: string;
    username: string;
  };

  @Column()
  ref: string;
}
