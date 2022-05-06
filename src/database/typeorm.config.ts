// Check typeORM documentation for more information.
const config = {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/*.entity.ts'],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/database/migrations',
  },
  seeds: ['src/database/seeds/*.seed{.ts,.js}'],
  factories: ['src/database/factories/*.factory{.ts,.js}'],
};

export = config;
