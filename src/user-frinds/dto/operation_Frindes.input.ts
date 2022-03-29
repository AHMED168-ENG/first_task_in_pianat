import { InputType, Int, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class operation_Frindes {
  @Field()
  @IsUUID()
  userId: string;

  @Field()
  @IsUUID()
  frindesId: string;
}
