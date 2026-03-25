export class CreateUserDto {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly phone: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { id, name, phone } = object;

    if (!id) return ['id is required'];
    if (!name) return ['name is required'];
    if (!phone) return ['phone is required'];

    if (typeof id === 'number' && id <= 0) {
      return ['id must be a positive number'];
    }
    if (typeof name !== 'string' || name.trim() === '') {
      return ['name must be a non-empty string'];
    }
    if (typeof phone !== 'string' || phone.trim() === '') {
      return ['phone must be a non-empty string'];
    }

    return ['', new CreateUserDto(id as number, name, phone)];
  }
}
