import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import {TypeormStore} from 'connect-typeorm';
import {getRepository} from 'typeorm';
// import {Db} from 'typeorm-static';
import {SessionEntity} from './typeorm';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'NEST_JS_SESSION_ID',
      secret: 'SDASDAJSDAJSDLAKSJDLAKSJDLAKSDJ',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}
bootstrap();
