import {useCallback, useState} from 'react';
import type {GeneratedFile} from '@richardmcquiston01/holiday-sign-generator';
import {DonateCard} from './components/DonateCard.js';
import {SignForm} from './components/SignForm.js';
import {SvgPreview} from './components/SvgPreview.js';
import {createDefaultFormState} from './lib/formState.js';
import type {FormState} from './lib/formState.js';
import {generateSignFiles} from './lib/signGeneration.js';

export function App() {
  const [form, setForm] = useState<FormState>(createDefaultFormState);
  const [files, setFiles] = useState<readonly GeneratedFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback((): void => {
    setIsGenerating(true);
    setErrorMessage(null);
    generateSignFiles(form)
      .then(result => {
        if (result.ok) {
          setFiles(result.files);
        } else {
          setFiles([]);
          setErrorMessage(result.message);
        }
      })
      .catch((err: unknown) => {
        setFiles([]);
        setErrorMessage(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setIsGenerating(false));
  }, [form]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Holiday Sign Generator
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-slate-400">
          Design a holiday-themed sign and download laser-ready SVG/DXF cut and
          engrave files — built on{' '}
          <a
            className="text-emerald-400 underline hover:text-emerald-300"
            href="https://github.com/RichardMcQuiston01/makertool-holiday-sign-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            @richardmcquiston01/holiday-sign-generator
          </a>
          .
        </p>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <SignForm
            form={form}
            onChange={setForm}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            errorMessage={errorMessage}
          />
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-200">Preview</h2>
          <SvgPreview files={files} />
        </section>
      </main>

      <DonateCard />
    </div>
  );
}
