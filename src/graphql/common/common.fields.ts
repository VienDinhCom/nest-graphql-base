import { Column } from 'typeorm';
import { Field } from 'type-graphql';
import {
  IsEmail,
  IsUrl,
  IsString,
  IsBoolean,
  Length,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';

interface BasicOptions {
  nullable?: boolean;
  unique?: boolean;
}

interface TextOptions extends BasicOptions {
  minLength?: number;
  maxLength?: number;
}

export function FIDField() {
  return (target: any, propertyKey: string) => {
    Field()(target, propertyKey);
    Column({ unique: true })(target, propertyKey);
    Length(28, 28)(target, propertyKey);
  };
}

export function BooleanField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsBoolean()(target, propertyKey);

    if (nullable) {
      IsOptional()(target, propertyKey);
    }
  };
}

export function TextField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsString()(target, propertyKey);

    if (nullable) {
      IsOptional()(target, propertyKey);
    }
  };
}

export function EmailField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsEmail()(target, propertyKey);

    if (nullable) {
      IsOptional()(target, propertyKey);
    }
  };
}

export function PhoneField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsPhoneNumber(null)(target, propertyKey);

    if (nullable) {
      IsOptional()(target, propertyKey);
    }
  };
}

export function UrlField(nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field({ nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsUrl()(target, propertyKey);

    if (nullable) {
      IsOptional()(target, propertyKey);
    }
  };
}

export function EnumField(Enum: object, nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field(() => [Enum], { nullable })(target, propertyKey);
    Column({ nullable })(target, propertyKey);
    IsEnum(Enum)(target, propertyKey);

    if (nullable) {
      IsOptional()(target, propertyKey);
    }
  };
}

export function EnumArrayField(Enum: object, nullable?: boolean) {
  return (target: any, propertyKey: string) => {
    Field(() => [Enum], { nullable })(target, propertyKey);
    Column('simple-array', { nullable })(target, propertyKey);
    IsEnum(Enum, { each: true })(target, propertyKey);

    if (nullable) {
      IsOptional()(target, propertyKey);
    }
  };
}
