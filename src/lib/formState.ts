import {getHolidayContent} from '@richardmcquiston01/holiday-sign-generator';
import type {
  Holiday,
  ScrewSize,
  SignShape,
  Unit,
} from '@richardmcquiston01/holiday-sign-generator';

/** All the inputs the sign-builder form collects, before being turned into a SignConfig. */
export interface FormState {
  readonly holiday: Holiday;
  /** A saying id from the holiday's catalog, or `'other'` for custom text. */
  readonly sayingChoice: string;
  readonly customSayingText: string;
  /** Optional text rendered right before the last name, e.g. "From" or "Love,". */
  readonly namePrefix: string;
  readonly lastName: string;
  /** An image id from the holiday's catalog, or `'none'` for no image. */
  readonly imageChoice: string;
  readonly shape: SignShape;
  readonly sayingFontId: string;
  readonly nameFontId: string;
  readonly sayingHeight: number;
  readonly nameHeight: number;
  readonly imageHeight: number;
  readonly margin: number;
  readonly unit: Unit;
  readonly mountingType: 'screw' | 'adhesive';
  readonly screwSize: ScrewSize;
}

const DEFAULT_HOLIDAY: Holiday = 'christmas';

export function createDefaultFormState(): FormState {
  const content = getHolidayContent(DEFAULT_HOLIDAY);
  return {
    holiday: DEFAULT_HOLIDAY,
    sayingChoice: content.sayings[0]?.id ?? 'other',
    customSayingText: '',
    namePrefix: '',
    lastName: '',
    imageChoice: content.images[0]?.id ?? 'none',
    shape: 'rectangle',
    sayingFontId: 'bigShoulders',
    nameFontId: 'workSans',
    sayingHeight: 2,
    nameHeight: 1,
    imageHeight: 3,
    margin: 0.5,
    unit: 'in',
    mountingType: 'screw',
    screwSize: 'M3',
  };
}

/** Resets saying/image selection to the new holiday's own catalog, so a stale id from the previous holiday never lingers. */
export function withHoliday(form: FormState, holiday: Holiday): FormState {
  const content = getHolidayContent(holiday);
  return {
    ...form,
    holiday,
    sayingChoice: content.sayings[0]?.id ?? 'other',
    imageChoice: content.images[0]?.id ?? 'none',
  };
}
