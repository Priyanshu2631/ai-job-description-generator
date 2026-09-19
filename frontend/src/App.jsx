import useJobDescription from "./hooks/useJobDescription";
import GeneratorPanel from "./components/GeneratorPanel";
import JobActions from "./components/JobActions";
import AIInsights from "./components/AIInsights";
import JobDescriptionEditor from "./components/JobDescriptionEditor";

function App() {
  const app = useJobDescription();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-lg font-bold shadow-lg shadow-violet-500/20">
              ✦
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                JD Studio
              </h1>

              <p className="text-xs text-slate-400">
                AI-powered Job Description Generator
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              Employer Workspace
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <span>✦</span>
            AI-assisted hiring
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create a Job Description
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Build a structured, ATS-friendly job description with
            AI-powered generation, analysis, and optimization.
          </p>
        </div>

        {/* Workspace */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Generator */}
          <GeneratorPanel
            formData={app.formData}
            step={app.step}
            handleChange={app.handleChange}
            nextStep={app.nextStep}
            previousStep={app.previousStep}
            handleGenerate={app.handleGenerate}
            loading={app.loading}
            drafts={app.drafts}
            draftSearch={app.draftSearch}
            setDraftSearch={app.setDraftSearch}
            draftIndustry={app.draftIndustry}
            setDraftIndustry={app.setDraftIndustry}
            draftIndustries={app.draftIndustries}
            filteredDrafts={app.filteredDrafts}
            loadingDrafts={app.loadingDrafts}
            loadDrafts={app.loadDrafts}
            handleOpenDraft={app.handleOpenDraft}
            handleDeleteDraft={app.handleDeleteDraft}
            handleDuplicateDraft={app.handleDuplicateDraft}
            duplicating={app.duplicating}
          />

          {/* Output */}
          <section className="lg:col-span-2">
            {!app.jobDescription ? (
              <div className="relative flex min-h-[650px] items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30">
                {/* Decorative glow */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl" />

                <div className="relative px-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-3xl text-violet-300">
                    ✦
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-slate-200">
                    Your generated JD will appear here
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Complete the steps on the left and generate your
                    job description to start editing and optimizing it.
                  </p>

                  <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-3 text-xs text-slate-500">
                    <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5">
                      AI Generation
                    </span>

                    <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5">
                      ATS Analysis
                    </span>

                    <span className="hidden rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 sm:inline">
                      Optimization
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <JobActions
                  jobDescription={app.jobDescription}
                  variations={app.variations}
                  selectedVariation={app.selectedVariation}
                  selectVariation={app.selectVariation}
                  handleRegenerate={app.handleRegenerate}
                  regenerating={app.regenerating}
                  handleCopy={app.handleCopy}
                  copied={app.copied}
                  handleDownloadPDF={app.handleDownloadPDF}
                  handleSave={app.handleSave}
                  saving={app.saving}
                  handleAnalyze={app.handleAnalyze}
                  analyzing={app.analyzing}
                  handleOptimize={app.handleOptimize}
                  optimizing={app.optimizing}
                />

                <AIInsights
                  jobDescription={app.jobDescription}
                  optimization={app.optimization}
                  setOptimization={app.setOptimization}
                  handleApplyOptimization={app.handleApplyOptimization}
                  analysis={app.analysis}
                  handleAnalyze={app.handleAnalyze}
                  analyzing={app.analyzing}
                  ats={app.ats}
                />

                <JobDescriptionEditor
                  jobDescription={app.jobDescription}
                  updateJobDescription={app.updateJobDescription}
                  updateListItem={app.updateListItem}
                  addListItem={app.addListItem}
                  removeListItem={app.removeListItem}
                  saved={app.saved}
                />
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pb-8 pt-4">
        <div className="border-t border-slate-800/70 pt-5 text-center text-xs text-slate-600">
          JD Studio · AI-assisted job description creation
        </div>
      </footer>
    </div>
  );
}

export default App;