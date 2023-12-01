import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    const student = makeStudent()

    inMemoryStudentsRepository.items.push(student)

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
        content: 'test question comment 1',
        authorId: student.id,
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
        content: 'test question comment 2',
        authorId: student.id,
      }),
    )

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toEqual([
      expect.objectContaining({
        content: 'test question comment 1',
        author: student.name,
      }),
      expect.objectContaining({
        content: 'test question comment 2',
        author: student.name,
      }),
    ])
  })

  it('should be able to fetch paginated question comments', async () => {
    const student = makeStudent()

    inMemoryStudentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
          content: `test question comment ${i}`,
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toHaveLength(2)
    expect(result.value?.comments).toEqual([
      expect.objectContaining({
        content: 'test question comment 21',
        author: student.name,
      }),
      expect.objectContaining({
        content: 'test question comment 22',
        author: student.name,
      }),
    ])
  })
})
