import {
  createFontRegistry,
  generateSign,
} from '@richardmcquiston01/holiday-sign-generator';
import type {
  GeneratedFile,
  GenerateSignError,
  SignConfig,
} from '@richardmcquiston01/holiday-sign-generator';
import {FONT_OPTIONS, loadFontBuffer} from './fonts.js';
import type {FormState} from './formState.js';

/** Builds the package's SignConfig from the form's raw inputs. */
export function buildSignConfig(form: FormState): SignConfig {
  const trimmedLastName = form.lastName.trim();
  const hasLastName = trimmedLastName.length > 0;
  // The prefix (e.g. "From", "Love,") only makes sense attached to a last
  // name, so it's silently dropped if the last name is blank.
  const nameLine = hasLastName
    ? [form.namePrefix.trim(), trimmedLastName].filter(Boolean).join(' ')
    : '';

  return {
    holiday: form.holiday,
    ...(form.sayingChoice === 'other'
      ? {sayingText: form.customSayingText}
      : {sayingId: form.sayingChoice}),
    ...(hasLastName ? {lastName: nameLine} : {}),
    ...(form.imageChoice !== 'none' ? {imageId: form.imageChoice} : {}),
    font: {
      sayingFont: 'saying',
      ...(hasLastName ? {nameFont: 'name'} : {}),
    },
    shape: form.shape,
    sayingHeight: form.sayingHeight,
    nameHeight: form.nameHeight,
    imageHeight: form.imageHeight,
    margin: form.margin,
    unit: form.unit,
    mounting:
      form.mountingType === 'screw'
        ? {type: 'screw', screwSize: form.screwSize}
        : {type: 'adhesive'},
  };
}

/** Fetches the selected font(s) and runs the full generateSign() pipeline. */
export async function generateSignFiles(
  form: FormState,
): Promise<{ok: true; files: GeneratedFile[]} | {ok: false; message: string}> {
  const sayingFont = FONT_OPTIONS.find(f => f.id === form.sayingFontId);
  if (!sayingFont) {
    return {ok: false, message: `Unknown saying font "${form.sayingFontId}".`};
  }

  const config = buildSignConfig(form);
  const fonts = createFontRegistry();

  const sayingFontBuffer = await loadFontBuffer(sayingFont.fileUrl);
  fonts.register('saying', sayingFontBuffer);

  if (config.lastName) {
    const nameFont = FONT_OPTIONS.find(f => f.id === form.nameFontId);
    if (!nameFont) {
      return {ok: false, message: `Unknown name font "${form.nameFontId}".`};
    }
    const nameFontBuffer = await loadFontBuffer(nameFont.fileUrl);
    fonts.register('name', nameFontBuffer);
  }

  const result = generateSign({config, fonts, format: 'both'});
  if (!result.ok) {
    return {ok: false, message: formatGenerateSignError(result.error)};
  }
  return {ok: true, files: result.value};
}

function formatGenerateSignError(error: GenerateSignError): string {
  switch (error.stage) {
    case 'validation':
      return error.errors.map(e => `${e.field}: ${e.message}`).join('\n');
    case 'content':
      return `${error.error.field}: ${error.error.message}`;
    case 'font':
    case 'layout':
      return error.error.message;
  }
}
