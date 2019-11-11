import { Column } from 'typeorm';
import { Field } from 'type-graphql';
import {
  IsEmail,
  IsUrl,
  IsString,
  IsBoolean,
  MaxLength,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';

export function FIDField() {
  return (target: any, propertyKey: string) => {
    Field()(target, propertyKey);
    Column({ unique: true })(target, propertyKey);
    MaxLength(28)(target, propertyKey);
  };
}

export function BooleanField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsBoolean()(target, propertyKey);
  };
}

export function TextField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsString()(target, propertyKey);
  };
}

export function EmailField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsEmail()(target, propertyKey);
  };
}

export function PhoneField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsPhoneNumber(null)(target, propertyKey);
  };
}

export function ImageField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsUrl()(target, propertyKey);
  };
}

export function EnumArrayField(Enum: object, nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field(() => [Enum], { nullable })(target, propertyKey);
    Column('simple-array', { nullable })(target, propertyKey);
    IsEnum(Enum)(target, propertyKey);
  };
}
