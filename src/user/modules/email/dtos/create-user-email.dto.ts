export class CreateUserEmailRequestDto {
  email: string;
  isMain?: boolean;
}

export class CreateUserEmailResponseDto {
  emailId: string;
  emailIdentityId: string;
}
