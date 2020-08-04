import { IMailProvider } from './../../providers/IMailProvider';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IUsersRepository } from './../../repositories/IUserRepository';
import { User } from '../../entities/User';

export class CreateUserUserCase {
  constructor (
  //adicionado o private no TS não precisa utilizar o this.usersRepository
  private usersRepository: IUsersRepository,
  private mailProvider: IMailProvider,
  //this.usersRepository = usersRepository;
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User altready exists.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'equipe@meuapp.com',
      },
      subject: 'seja bem-vindo à plataforma', 
      body: '<p>Você já pode fazer login em nossa plataforma. </p>'
    })
  }
}