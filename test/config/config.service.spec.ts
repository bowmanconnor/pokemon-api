import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../src/config/config.service';

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
      expect(mongoConfig.uri).toBe(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?w=majority`);
      expect(mongoConfig.useNewUrlParser).toBe(true);
      expect(mongoConfig.useUnifiedTopology).toBe(true);
      expect(mongoConfig.retryWrites).toBe(true);
    });
  });

  describe('get', () => {
    it('should return the correct value for a given key', async () => {
      expect(service.get('MONGO_USER')).toBe(process.env.MONGO_USER);
    });

    it('should return undefined for a non-existent key', async () => {
      expect(service.get('NON_EXISTENT_ENV_VAR')).toBeUndefined();
    });
  });
});
