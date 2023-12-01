import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { QuestionComment } from '../question-comment'

export class QuestionCommentEvent implements DomainEvent {
  public ocurredAt: Date
  public questionComment: QuestionComment
  public questionId: UniqueEntityID

  constructor(questionComment: QuestionComment, questionId: UniqueEntityID) {
    this.ocurredAt = new Date()
    this.questionId = questionId
    this.questionComment = questionComment
  }

  getAggregateId(): UniqueEntityID {
    return this.questionComment.id
  }
}
