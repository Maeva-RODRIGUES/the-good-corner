import { InputRegister } from "@/generated/graphql";
import UserRepository from "@/repositories/User.repository";

export default class UserService {
  db: UserRepository;

  constructor() {
    this.db = new UserRepository();
  }
  async listUsers() {
    return this.db.find();
  }

  async findUserByEmail(email: string) {
    return await this.db.findOneBy({ email });
  }

  async createUser({ email, password }: InputRegister) {
    const newUser = this.db.create({ email, password });
    return await this.db.save(newUser);
  }
}
