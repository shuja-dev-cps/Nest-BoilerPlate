import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://add-your-cluster-link.mongodb.net/nest-boilerplate'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:   process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
})
export class AppModule {}
