import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const student = makeStudent()

    inMemoryStudentsRepository.items.push(student)

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
        content: 'test answer comment 1',
        authorId: student.id,
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
        content: 'test answer comment 2',
        authorId: student.id,
      }),
    )

    const result = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toEqual([
      expect.objectContaining({
        content: 'test answer comment 1',
        author: student.name,
      }),
      expect.objectContaining({
        content: 'test answer comment 2',
        author: student.name,
      }),
    ])
  })

  it('should be able to fetch paginated answer comments', async () => {
    const student = makeStudent()

    inMemoryStudentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
          content: `test answer comment ${i}`,
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toHaveLength(2)
    expect(result.value?.comments).toEqual([
      expect.objectContaining({
        content: 'test answer comment 21',
        author: student.name,
      }),
      expect.objectContaining({
        content: 'test answer comment 22',
        author: student.name,
      }),
    ])
  })
})
