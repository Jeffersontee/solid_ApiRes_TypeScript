import { CreateUserUserCase } from './CreateUserUseCase';
import { Request, Response } from "express";

export class CreateUserController {
  constructor (
    private CreateUserUserCase: CreateUserUserCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> { 
    const { name, email, password } = request.body;

  try {
    await this.CreateUserUserCase.execute({
      name,
      email,
      password
    })

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error/n'
      })
    }
  }
}