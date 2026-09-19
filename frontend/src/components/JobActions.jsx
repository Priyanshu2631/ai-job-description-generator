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
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleRegenerate}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
          >
            {regenerating
              ? "Regenerating..."
              : "↻ Regenerate"}
          </button>

          <button
            onClick={handleCopy}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
          >
            {copied
              ? "✓ Copied"
              : "📋 Copy"}
          </button>

          <button
            onClick={handleDownloadPDF}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
          >
            ↓ PDF
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-500"
          >
            {saving
              ? "Saving..."
              : "💾 Save JD"}
          </button>

          <button
            onClick={handleAnalyze}
            disabled={
              analyzing ||
              !jobDescription.id
            }
            className="rounded-lg border border-cyan-700 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50"
          >
            {analyzing
              ? "Analyzing..."
              : "✦ AI Analyze"}
          </button>

          <button
            onClick={handleOptimize}
            disabled={
              optimizing ||
              !jobDescription.id
            }
            className="rounded-lg border border-purple-700 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300 hover:bg-purple-500/20 disabled:opacity-50"
          >
            {optimizing
              ? "Optimizing..."
              : "✦ Optimize with AI"}
          </button>
        </div>
      </div>

      {variations.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold">
            JD Variations
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Choose the version that best fits your hiring needs.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {variations.map(
              (variation, index) => (
                <button
                  key={variation.name}
                  onClick={() =>
                    selectVariation(
                      index
                    )
                  }
                  className={`rounded-xl border p-4 text-left ${
                    selectedVariation ===
                    index
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <p className="font-medium">
                    {variation.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {
                      variation.description
                    }
                  </p>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
