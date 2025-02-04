import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

const VALID_LANGS = ['en', 'es'] as const;
type LangType = (typeof VALID_LANGS)[number];

@Injectable()
export class LangValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): LangType {
    if (!VALID_LANGS.includes(value as LangType)) {
      return 'en';
    }
    return value as LangType;
  }
}
