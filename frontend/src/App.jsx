import useJobDescription from "./hooks/useJobDescription";
import GeneratorPanel from "./components/GeneratorPanel";
import JobActions from "./components/JobActions";
import AIInsights from "./components/AIInsights";
import JobDescriptionEditor from "./components/JobDescriptionEditor";

function App() {
  const app = useJobDescription();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              ✦ JD Studio
            </h1>

            <p className="text-sm text-slate-400">
              AI-powered Job Description Generator
            </p>
          </div>

          <div className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Employer Workspace
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-4xl font-bold">
            Create a Job Description
          </h2>

          <p className="mt-3 text-slate-400">
            Build a structured, ATS-friendly job
            description in a few simple steps.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
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
          />

          <section className="lg:col-span-2">
            {!app.jobDescription ? (
              <div className="flex min-h-[700px] items-center justify-center rounded-2xl border border-dashed border-slate-700">
                <div className="text-center">
                  <div className="text-5xl">
                    ✦
                  </div>

                  <p className="mt-4 font-medium">
                    Your generated JD will appear here
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Complete the steps on the left.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <JobActions
                  jobDescription={app.jobDescription}
                  variations={app.variations}
                  selectedVariation={
                    app.selectedVariation
                  }
                  selectVariation={
                    app.selectVariation
                  }
                  handleRegenerate={
                    app.handleRegenerate
                  }
                  regenerating={
                    app.regenerating
                  }
                  handleCopy={app.handleCopy}
                  copied={app.copied}
                  handleDownloadPDF={
                    app.handleDownloadPDF
                  }
                  handleSave={app.handleSave}
                  saving={app.saving}
                  handleAnalyze={
                    app.handleAnalyze
                  }
                  analyzing={app.analyzing}
                  handleOptimize={
                    app.handleOptimize
                  }
                  optimizing={app.optimizing}
                />

                <AIInsights
                  optimization={app.optimization}
                  setOptimization={
                    app.setOptimization
                  }
                  handleApplyOptimization={
                    app.handleApplyOptimization
                  }
                  analysis={app.analysis}
                  handleAnalyze={
                    app.handleAnalyze
                  }
                  analyzing={app.analyzing}
                  ats={app.ats}
                />

                <JobDescriptionEditor
                  jobDescription={
                    app.jobDescription
                  }
                  updateJobDescription={
                    app.updateJobDescription
                  }
                  updateListItem={
                    app.updateListItem
                  }
                  addListItem={
                    app.addListItem
                  }
                  removeListItem={
                    app.removeListItem
                  }
                  saved={app.saved}
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
