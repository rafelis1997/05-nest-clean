import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { AnswerComment } from '../answer-comment'

export class AnswerCommentEvent implements DomainEvent {
  public ocurredAt: Date
  public answerComment: AnswerComment
  public answerId: UniqueEntityID

  constructor(answerComment: AnswerComment, answerId: UniqueEntityID) {
    this.ocurredAt = new Date()
    this.answerId = answerId
    this.answerComment = answerComment
  }

  getAggregateId(): UniqueEntityID {
    return this.answerComment.id
  }
}
