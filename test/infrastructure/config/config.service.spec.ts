import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../../src/infrastructure/config/config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPortConfig', () => {
    it('should return the correct port number', async () => {
      expect(await service.getPortConfig()).toBe(process.env.PORT);
    });
  });

  describe('getMongoConfig', () => {
    it('should return the correct MongoDB connection URI and options', async () => {
      const mongoConfig = await service.getMongoConfig();
      expect(mongoConfig.uri).toBe(process.env.MONGO_URI);
      expect(mongoConfig.useNewUrlParser).toBe(true);
      expect(mongoConfig.useUnifiedTopology).toBe(true);
    });
  });

  describe('get', () => {
    it('should return the MONGO_USER value for the MONGO_USER key', async () => {
      expect(service.get('MONGO_USER')).toBe(process.env.MONGO_USER);
    });

    it('should return undefined for a non-existent key', async () => {
      expect(service.get('NON_EXISTENT_ENV_VAR')).toBeUndefined();
    });
  });
});
