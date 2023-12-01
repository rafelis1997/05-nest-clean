import { OnAnswerComment } from '@/domain/notification/application/subscribers/on-answer-comment'
import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosenEvent } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { OnQuestionComment } from '@/domain/notification/application/subscribers/on-question-comment'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosenEvent,
    OnAnswerComment,
    OnQuestionComment,
    SendNotificationUseCase,
    ReadNotificationUseCase,
  ],
})
export class EventsModule {}
