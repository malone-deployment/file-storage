import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './app/file.entity';
import { Module } from '@nestjs/common';
import { FileModule } from './app/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_INSTANCE_UNIX_SOCKET,
      port: parseInt(process.env.POSTGRES_DB_PORT, 10),
      username: process.env.POSTGRES_DB_USER,
      password: process.env.POSTGRES_DB_PASS,
      database: process.env.POSTGRES_DB_NAME,
      entities: [FileEntity],
      synchronize: true, // Set to false in production for safety
    }),
    FileModule,
  ],
})
export class AppModule {}

// @Module({
//   imports: [TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: process.env.POSTGRES_INSTANCE_UNIX_SOCKET,
//     port: parseInt(process.env.POSTGRES_DB_PORT, 10),
//     username: process.env.POSTGRES_DB_USER,
//     password: process.env.POSTGRES_DB_PASS,
//     database: process.env.POSTGRES_DB_NAME,
//     entities: [FileEntity],
//     synchronize: true, // Set to false in production for safety
//   }),],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
