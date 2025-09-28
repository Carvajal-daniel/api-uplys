import * as bcrypt from "bcrypt"

export class BcryptService{
  private saltRound = 10

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRound)
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}