import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';
import { EnvironmentModule } from './environment.module';

describe('EnvironmentService', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  async function getService(): Promise<EnvironmentService> {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentModule],
    }).compile();

    return module.get<EnvironmentService>(EnvironmentService);
  }

  it('should be defined', async () => {
    const service = await getService();
    expect(service).toBeDefined();
  });

  it('should be able to get mysqlUri environment variable', async () => {
    const service = await getService();
    expect(service.mysqlHost).toEqual('localhost');
  });

  it('should be able to get mysqlUri environment variable', async () => {
    const service = await getService();
    expect(service.mysqlPort).toEqual(3306);
  });

  it('should be able to get mysqlUsername environment variable', async () => {
    const service = await getService();
    expect(service.mysqlUsername).toEqual('mysql-username');
  });

  it('should be able to get mysqlPassword environment variable', async () => {
    const service = await getService();
    expect(service.mysqlPassword).toEqual('secret');
  });

  it('should be able to get mysqlDatabase environment variable', async () => {
    const service = await getService();
    expect(service.mysqlDatabase).toEqual('mysql-database');
  });

  it('should be able to get port environment variable', async () => {
    const service = await getService();
    expect(service.port).toEqual(3000);
  });

  it('should be able to check if it is on development', async () => {
    const service = await getService();
    expect(service.isDevelopment).toBeFalsy();
  });

  it('should be able to check if it is on test', async () => {
    const service = await getService();
    expect(service.isTest).toBeTruthy();
  });

  it('should be able to check if it is on production', async () => {
    const service = await getService();
    expect(service.isProduction).toBeFalsy();
  });
});
