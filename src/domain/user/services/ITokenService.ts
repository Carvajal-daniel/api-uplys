export interface ITokebService {
  generate(payload: object): string
  verify(token: string): object | null
}