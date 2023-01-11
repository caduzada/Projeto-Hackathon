import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Grupo } from './grupo/entities/grupo.entity';
import { GrupoModule } from './grupo/grupo.module';
import { Projeto } from './projeto/entities/projeto.entity';
import { ProjetoModule } from './projeto/projeto.module';
import { Turma } from './turma/entities/turma.entity';
import { TurmaModule } from './turma/turma.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_projetohackathon',
      entities: [Turma, Grupo, Projeto],
      synchronize: true
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: process.env.DATABASE_URL,
    //   logging: false,
    //   dropSchema: false,
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    TurmaModule, 
    GrupoModule, 
    ProjetoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
