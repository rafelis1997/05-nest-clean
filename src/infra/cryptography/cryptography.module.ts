import { Module } from '@nestjs/common'
import { JwrEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwrEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
