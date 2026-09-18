import type {ReactNode} from 'react';
import {
  getHolidayContent,
  listHolidays,
} from '@richardmcquiston01/holiday-sign-generator';
import type {
  ScrewSize,
  SignShape,
  Unit,
} from '@richardmcquiston01/holiday-sign-generator';
import {FONT_OPTIONS} from '../lib/fonts.js';
import type {FormState} from '../lib/formState.js';
import {withHoliday} from '../lib/formState.js';

const SHAPE_OPTIONS: readonly {value: SignShape; label: string}[] = [
  {value: 'rectangle', label: 'Rectangle'},
  {value: 'square', label: 'Square'},
  {value: 'ellipse', label: 'Ellipse'},
  {value: 'round', label: 'Round'},
];

const UNIT_OPTIONS: readonly {value: Unit; label: string}[] = [
  {value: 'in', label: 'Inches'},
  {value: 'mm', label: 'Millimeters'},
];

const SCREW_SIZE_OPTIONS: readonly ScrewSize[] = [
  'M3',
  'M4',
  'M5',
  '#4-40',
  '#6-32',
  '#8-32',
  '#10-24',
  '1/4-20',
];

export interface SignFormProps {
  readonly form: FormState;
  readonly onChange: (next: FormState) => void;
  readonly onGenerate: () => void;
  readonly isGenerating: boolean;
  readonly errorMessage: string | null;
}

function Field({label, children}: {label: string; children: ReactNode}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-300">
      {label}
      {children}
    </label>
  );
}

const selectClassName =
  'rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none';
const inputClassName = selectClassName;

export function SignForm({
  form,
  onChange,
  onGenerate,
  isGenerating,
  errorMessage,
}: SignFormProps) {
  const holidayContent = getHolidayContent(form.holiday);
  const hasLastName = form.lastName.trim().length > 0;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={event => {
        event.preventDefault();
        onGenerate();
      }}
    >
      <Field label="Holiday">
        <select
          className={selectClassName}
          value={form.holiday}
          onChange={event =>
            onChange(
              withHoliday(form, event.target.value as FormState['holiday']),
            )
          }
        >
          {listHolidays().map(holiday => (
            <option key={holiday} value={holiday}>
              {getHolidayContent(holiday).label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Saying">
        <select
          className={selectClassName}
          value={form.sayingChoice}
          onChange={event =>
            onChange({...form, sayingChoice: event.target.value})
          }
        >
          {holidayContent.sayings.map(saying => (
            <option key={saying.id} value={saying.id}>
              {saying.text}
            </option>
          ))}
          <option value="other">Other (custom text)</option>
        </select>
      </Field>

      {form.sayingChoice === 'other' ? (
        <Field label="Custom saying">
          <input
            className={inputClassName}
            type="text"
            value={form.customSayingText}
            placeholder="Type your own saying"
            onChange={event =>
              onChange({...form, customSayingText: event.target.value})
            }
          />
        </Field>
      ) : null}

      <Field label="Name prefix (optional)">
        <input
          className={inputClassName}
          type="text"
          list="name-prefix-suggestions"
          value={form.namePrefix}
          placeholder="e.g. From, Love,"
          onChange={event =>
            onChange({...form, namePrefix: event.target.value})
          }
        />
        <datalist id="name-prefix-suggestions">
          <option value="From" />
          <option value="Love," />
          <option value="With Love," />
          <option value="The" />
        </datalist>
      </Field>

      <Field label="Last name (optional)">
        <input
          className={inputClassName}
          type="text"
          value={form.lastName}
          placeholder="e.g. The Smiths"
          onChange={event => onChange({...form, lastName: event.target.value})}
        />
      </Field>

      <Field label="Image">
        <select
          className={selectClassName}
          value={form.imageChoice}
          onChange={event =>
            onChange({...form, imageChoice: event.target.value})
          }
        >
          <option value="none">No image</option>
          {holidayContent.images.map(image => (
            <option key={image.id} value={image.id}>
              {image.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Sign shape">
        <select
          className={selectClassName}
          value={form.shape}
          onChange={event =>
            onChange({...form, shape: event.target.value as SignShape})
          }
        >
          {SHAPE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Saying font">
        <select
          className={selectClassName}
          value={form.sayingFontId}
          onChange={event =>
            onChange({...form, sayingFontId: event.target.value})
          }
        >
          {FONT_OPTIONS.map(font => (
            <option key={font.id} value={font.id}>
              {font.label}
            </option>
          ))}
        </select>
      </Field>

      {hasLastName ? (
        <Field label="Last name font">
          <select
            className={selectClassName}
            value={form.nameFontId}
            onChange={event =>
              onChange({...form, nameFontId: event.target.value})
            }
          >
            {FONT_OPTIONS.map(font => (
              <option key={font.id} value={font.id}>
                {font.label}
              </option>
            ))}
          </select>
        </Field>
      ) : null}

      <div className="grid grid-cols-2 gap-4">
        <Field label={`Saying height (${form.unit})`}>
          <input
            className={inputClassName}
            type="number"
            min={0.1}
            step={0.1}
            value={form.sayingHeight}
            onChange={event =>
              onChange({...form, sayingHeight: Number(event.target.value)})
            }
          />
        </Field>

        {hasLastName ? (
          <Field label={`Name height (${form.unit})`}>
            <input
              className={inputClassName}
              type="number"
              min={0.1}
              step={0.1}
              value={form.nameHeight}
              onChange={event =>
                onChange({...form, nameHeight: Number(event.target.value)})
              }
            />
          </Field>
        ) : null}

        {form.imageChoice !== 'none' ? (
          <Field label={`Image height (${form.unit})`}>
            <input
              className={inputClassName}
              type="number"
              min={0.1}
              step={0.1}
              value={form.imageHeight}
              onChange={event =>
                onChange({...form, imageHeight: Number(event.target.value)})
              }
            />
          </Field>
        ) : null}

        <Field label={`Margin (${form.unit})`}>
          <input
            className={inputClassName}
            type="number"
            min={0.05}
            step={0.05}
            value={form.margin}
            onChange={event =>
              onChange({...form, margin: Number(event.target.value)})
            }
          />
        </Field>

        <Field label="Unit">
          <select
            className={selectClassName}
            value={form.unit}
            onChange={event =>
              onChange({...form, unit: event.target.value as Unit})
            }
          >
            {UNIT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Mounting type">
        <select
          className={selectClassName}
          value={form.mountingType}
          onChange={event =>
            onChange({
              ...form,
              mountingType: event.target.value as FormState['mountingType'],
            })
          }
        >
          <option value="screw">Screw</option>
          <option value="adhesive">Adhesive</option>
        </select>
      </Field>

      {form.mountingType === 'screw' ? (
        <Field label="Screw size">
          <select
            className={selectClassName}
            value={form.screwSize}
            onChange={event =>
              onChange({...form, screwSize: event.target.value as ScrewSize})
            }
          >
            {SCREW_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Field>
      ) : null}

      {errorMessage ? (
        <pre className="whitespace-pre-wrap rounded-lg border border-red-800 bg-red-950/50 p-3 text-sm text-red-300">
          {errorMessage}
        </pre>
      ) : null}

      <button
        type="submit"
        disabled={isGenerating}
        className="rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGenerating ? 'Generating…' : 'Generate Sign'}
      </button>
    </form>
  );
}
