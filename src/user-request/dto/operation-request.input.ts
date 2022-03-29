import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsUUID } from 'class-validator';

@InputType()
export class operation_request_input {
  @Field()
  @IsUUID()
  from: string;

  @Field()
  @IsUUID()
  to: string;
}
