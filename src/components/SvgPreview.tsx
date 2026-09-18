import {useMemo} from 'react';
import type {GeneratedFile} from '@richardmcquiston01/holiday-sign-generator';

export interface SvgPreviewProps {
  readonly files: readonly GeneratedFile[];
}

function downloadFile(file: GeneratedFile): void {
  const blob = new Blob([file.content], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(url);
}

export function SvgPreview({files}: SvgPreviewProps) {
  const svgFile = useMemo(
    () => files.find(f => f.name.endsWith('.svg')),
    [files],
  );
  const dxfFile = useMemo(
    () => files.find(f => f.name.endsWith('.dxf')),
    [files],
  );

  if (files.length === 0) {
    return (
      <div className="flex h-full min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-700 text-slate-500">
        Your sign preview will appear here.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {svgFile ? (
        <div
          // The generated SVG carries physical width/height attributes
          // (e.g. "10in"), which browsers render at ~96dpi — this override
          // makes it scale down to the container instead of overflowing it.
          // The "sign-preview" class also drives the readability fix for
          // hairline strokes in index.css.
          className="sign-preview [&_svg]:h-auto [&_svg]:w-full rounded-xl border border-slate-700 bg-white p-4"
          // Trusted content: svgFile.content is generated locally by
          // @richardmcquiston01/holiday-sign-generator, never user HTML.
          dangerouslySetInnerHTML={{__html: svgFile.content}}
        />
      ) : null}

      <div className="flex flex-wrap gap-3">
        {svgFile ? (
          <button
            type="button"
            onClick={() => downloadFile(svgFile)}
            className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-500"
          >
            Download SVG
          </button>
        ) : null}
        {dxfFile ? (
          <button
            type="button"
            onClick={() => downloadFile(dxfFile)}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500"
          >
            Download DXF
          </button>
        ) : null}
      </div>
    </div>
  );
}
