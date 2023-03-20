import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MetricEntity } from './metric.entity';

@Entity()
export class MetricValueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @ManyToOne(() => MetricEntity)
  metric: MetricEntity;

  @Column('timestamp')
  timestamp: Date;
}
