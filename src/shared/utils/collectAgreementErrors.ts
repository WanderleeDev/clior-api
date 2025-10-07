import {
  AgreementError,
  BaseAgreementRoot,
} from '../domain/vo/abstracts/BaseAbstract.vo';
import { Result } from './Result';

export function collectAgreementErrors(
  results: Result<BaseAgreementRoot, AgreementError[]>[],
): AgreementError[] {
  const errors: AgreementError[] = [];

  for (const result of results) {
    if (!result.isSuccess && Array.isArray(result.error)) {
      errors.push(...result.error);
    }
  }

  return errors;
}
