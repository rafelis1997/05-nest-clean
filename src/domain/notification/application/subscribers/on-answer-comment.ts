import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { AnswerCommentEvent } from '@/domain/forum/enterprise/entities/events/answer-comment-event'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnAnswerComment implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendAnswerCommentNotification.bind(this),
      AnswerCommentEvent.name,
    )
  }

  private async sendAnswerCommentNotification({
    answerComment,
    answerId,
  }: AnswerCommentEvent) {
    const answer = await this.answersRepository.findById(answerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Novo comentário em "${answer.excerpt
          .substring(0, 20)
          .concat('...')}"`,
        content: answerComment.content.substring(0, 40).concat('...'),
      })
    }
  }
}
