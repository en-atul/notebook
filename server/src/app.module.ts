import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { NotesResolver } from './notes/notes.resolver';
import { NotesService } from './notes/notes.service';
import { NotesModule } from './notes/notes.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            const authToken = connectionParams['Authorization'];
            return {
              req: {
                headers: {
                  authorization: authToken,
                },
              },
            };
          },
        },
      },
    }),
    AuthModule,
    PrismaModule,
    PubSubModule,
    NotesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    NotesResolver,
    NotesService,
  ],
})
export class AppModule {}
