import { InputType } from 'type-graphql';
import { TextField, UrlField } from '../../common';

@InputType()
export class UserInput {
  @TextField(true)
  name?: string;

  @UrlField(true)
  image?: string;
}
