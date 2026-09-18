/** One selectable demo font: a bundled TTF plus the CSS family used to preview it. */
export interface FontOption {
  readonly id: string;
  readonly label: string;
  readonly fileUrl: string;
  readonly previewFontFamily: string;
}

/**
 * Fonts bundled with this demo (all SIL Open Font License), used both for
 * the dropdown preview and, once fetched, for outline extraction by
 * @richardmcquiston01/holiday-sign-generator.
 */
export const FONT_OPTIONS: readonly FontOption[] = [
  {
    id: 'workSans',
    label: 'Work Sans (bold)',
    fileUrl: '/fonts/WorkSans-Bold.ttf',
    previewFontFamily: 'Work Sans Demo',
  },
  {
    id: 'nothingYouCouldDo',
    label: 'Nothing You Could Do (script)',
    fileUrl: '/fonts/NothingYouCouldDo-Regular.ttf',
    previewFontFamily: 'Nothing You Could Do Demo',
  },
  {
    id: 'youngSerif',
    label: 'Young Serif',
    fileUrl: '/fonts/YoungSerif-Regular.ttf',
    previewFontFamily: 'Young Serif Demo',
  },
  {
    id: 'bigShoulders',
    label: 'Big Shoulders (bold display)',
    fileUrl: '/fonts/BigShoulders-Bold.ttf',
    previewFontFamily: 'Big Shoulders Demo',
  },
  {
    id: 'silkscreen',
    label: 'Silkscreen (pixel)',
    fileUrl: '/fonts/Silkscreen-Regular.ttf',
    previewFontFamily: 'Silkscreen Demo',
  },
];

const fontBufferCache = new Map<string, Promise<ArrayBuffer>>();

/** Fetches (and caches) a bundled font's raw bytes, for registering with createFontRegistry(). */
export function loadFontBuffer(fileUrl: string): Promise<ArrayBuffer> {
  let cached = fontBufferCache.get(fileUrl);
  if (!cached) {
    cached = fetch(fileUrl).then(response => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch font "${fileUrl}": ${response.status}`,
        );
      }
      return response.arrayBuffer();
    });
    fontBufferCache.set(fileUrl, cached);
  }
  return cached;
}
