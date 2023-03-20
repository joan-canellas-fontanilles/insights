import { Test, TestingModule } from '@nestjs/testing';
import { MetricService } from './metric.service';
import { MetricRepositoryService } from '../db/metric-repository.service';
import { MetricEntity } from '../db/metric.entity';
import { MetricDto } from '../dto/metric.dto';
import { MetricAlreadyExists } from '../exceptions/metric-already-exists.exception';
import { MetricDtoMapperService } from '../mappers/metric-dto-mapper.service';
import { MetricNotFoundException } from '../exceptions/metric-not-found.exception';

describe('MetricService', () => {
  let service: MetricService;
  let repository: MetricRepositoryService;

  const createEntity = (id: string, name: string) => {
    const entity = new MetricEntity();
    entity.id = id;
    entity.name = name;
    return entity;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricService,
        MetricDtoMapperService,
        {
          provide: MetricRepositoryService,
          useValue: new MetricRepositoryService(null),
        },
      ],
    }).compile();

    service = module.get<MetricService>(MetricService);
    repository = module.get<MetricRepositoryService>(MetricRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should retrieve the requested metric', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockResolvedValue(
          createEntity('69b215b6-fb75-4600-97c3-f4736510bd8d', 'test')
        );

      const metrics = await service.get('69b215b6-fb75-4600-97c3-f4736510bd8d');

      expect(metrics).toEqual(
        new MetricDto('69b215b6-fb75-4600-97c3-f4736510bd8d', 'test')
      );
    });

    it('should throw a metric not found exception if no metric is found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(() =>
        service.get('69b215b6-fb75-4600-97c3-f4736510bd8d')
      ).rejects.toThrowError(MetricNotFoundException);
    });
  });

  describe('getAll', () => {
    it('should retrieve all the metrics', async () => {
      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValue([
          createEntity('69b215b6-fb75-4600-97c3-f4736510bd8d', 'test'),
          createEntity('603f8acf-72c7-47d2-8126-9906a558f72e', 'test 2'),
        ]);

      const metrics = await service.getAll();

      expect(metrics).toEqual([
        new MetricDto('69b215b6-fb75-4600-97c3-f4736510bd8d', 'test'),
        new MetricDto('603f8acf-72c7-47d2-8126-9906a558f72e', 'test 2'),
      ]);
    });
  });

  describe('create', () => {
    it('should throw a MetricAlreadyExists if a metric is found with the same name', async () => {
      jest.spyOn(repository, 'existsByName').mockResolvedValue(true);

      await expect(() => service.create({ name: 'test' })).rejects.toThrowError(
        MetricAlreadyExists
      );
    });

    it('should returns the new metric on success', async () => {
      jest.spyOn(repository, 'existsByName').mockResolvedValue(false);
      const entity = createEntity(
        '69b215b6-fb75-4600-97c3-f4736510bd8d',
        'test'
      );
      jest.spyOn(repository, 'create').mockResolvedValue(entity);

      const result = await service.create({ name: 'test' });

      expect(result).toEqual(
        new MetricDto('69b215b6-fb75-4600-97c3-f4736510bd8d', 'test')
      );
    });
  });

  describe('update', () => {
    it('should throw a MetricNotFoundException if no metric is not found with that id', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(() =>
        service.update('69b215b6-fb75-4600-97c3-f4736510bd8d', {
          name: 'update',
        })
      ).rejects.toThrowError(MetricNotFoundException);
    });

    it('should returns the new metric on success', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockResolvedValue(
          createEntity('69b215b6-fb75-4600-97c3-f4736510bd8d', 'test')
        );

      jest
        .spyOn(repository, 'update')
        .mockImplementation((entity, name) =>
          Promise.resolve(createEntity(entity.id, name))
        );

      const result = await service.update(
        '69b215b6-fb75-4600-97c3-f4736510bd8d',
        {
          name: 'update',
        }
      );

      expect(result).toEqual(
        new MetricDto('69b215b6-fb75-4600-97c3-f4736510bd8d', 'update')
      );
    });
  });
});
