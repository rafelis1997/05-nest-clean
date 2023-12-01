import { makeAnswer } from 'test/factories/make-answer'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
        content: 'test question answer 1',
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
        content: 'test question answer 2',
      }),
    )

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answers).toEqual([
      expect.objectContaining({
        content: 'test question answer 1',
      }),
      expect.objectContaining({
        content: 'test question answer 2',
      }),
    ])
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1'),
          content: `test question answer ${i}`,
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.answers).toHaveLength(2)
    expect(result.value?.answers).toEqual([
      expect.objectContaining({
        content: 'test question answer 21',
      }),
      expect.objectContaining({
        content: 'test question answer 22',
      }),
    ])
  })
})
