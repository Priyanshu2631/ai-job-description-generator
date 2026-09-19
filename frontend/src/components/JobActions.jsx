export default function JobActions({
  jobDescription,
  variations,
  selectedVariation,
  selectVariation,
  handleRegenerate,
  regenerating,
  handleCopy,
  copied,
  handleDownloadPDF,
  handleSave,
  saving,
  handleAnalyze,
  analyzing,
  handleOptimize,
  optimizing,
}) {
  return (
    <>
      {/* Action Toolbar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-black/10 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Job Description Actions
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                Edit, analyze, optimize, or export your generated JD.
              </p>
            </div>

            <span className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-emerald-400 sm:inline-flex">
              ● Ready
            </span>
          </div>

          <div className="h-px bg-slate-800" />

          <div className="flex flex-wrap gap-2.5">
            {/* Regenerate */}
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={regenerating}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {regenerating ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-600 border-t-slate-300" />
                  Regenerating...
                </span>
              ) : (
                "↻ Regenerate"
              )}
            </button>

            {/* Copy */}
            <button
              type="button"
              onClick={handleCopy}
              className={`rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all ${
                copied
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {copied ? "✓ Copied" : "📋 Copy"}
            </button>

            {/* PDF */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              ↓ PDF
            </button>

            {/* Save */}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/15 transition-all hover:from-violet-500 hover:to-violet-400 hover:shadow-violet-500/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "💾 Save JD"}
            </button>

            <div className="hidden h-10 w-px bg-slate-800 lg:block" />

            {/* AI Analyze */}
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !jobDescription.id}
              className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {analyzing ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-300" />
                  Analyzing...
                </span>
              ) : (
                "✦ AI Analyze"
              )}
            </button>

            {/* AI Optimize */}
            <button
              type="button"
              onClick={handleOptimize}
              disabled={optimizing || !jobDescription.id}
              className="rounded-xl border border-violet-500/30 bg-violet-500/5 px-4 py-2.5 text-sm font-semibold text-violet-300 transition-all hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {optimizing ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-300" />
                  Optimizing...
                </span>
              ) : (
                "✦ Optimize with AI"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* JD Variations */}
      {variations.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-sm text-violet-400">
                  ✦
                </span>

                <h3 className="font-semibold text-slate-200">
                  JD Variations
                </h3>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose the version that best fits your hiring needs.
              </p>
            </div>

            <span className="rounded-full border border-slate-700 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-500">
              {variations.length} versions
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {variations.map((variation, index) => {
              const selected = selectedVariation === index;

              return (
                <button
                  type="button"
                  key={variation.name}
                  onClick={() => selectVariation(index)}
                  className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 ${
                    selected
                      ? "border-violet-500/60 bg-violet-500/10 shadow-lg shadow-violet-500/5"
                      : "border-slate-800 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-950/80"
                  }`}
                >
                  {selected && (
                    <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
                      ✓
                    </div>
                  )}

                  <div className="pr-6">
                    <p
                      className={`font-medium ${
                        selected
                          ? "text-violet-300"
                          : "text-slate-200 group-hover:text-white"
                      }`}
                    >
                      {variation.name}
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-slate-500">
                      {variation.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}