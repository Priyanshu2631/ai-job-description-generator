export default function GeneratorPanel({
  formData,
  step,
  handleChange,
  nextStep,
  previousStep,
  handleGenerate,
  loading,
  drafts,
  draftSearch,
  setDraftSearch,
  draftIndustry,
  setDraftIndustry,
  draftIndustries,
  filteredDrafts,
  loadingDrafts,
  loadDrafts,
  handleOpenDraft,
  handleDeleteDraft,
  handleDuplicateDraft,
  duplicating,
}) {
  const steps = [
    { number: 1, label: "Role" },
    { number: 2, label: "Requirements" },
    { number: 3, label: "Company" },
    { number: 4, label: "Review" },
  ];

  return (
    <div className="space-y-6 lg:col-span-1">
      {/* Generator Card */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-black/10">
        {/* Step Header */}
        <div className="border-b border-slate-800 px-6 py-5">
          <div className="flex items-center justify-between">
            {steps.map((item, index) => (
              <div
                key={item.number}
                className="flex flex-1 items-center last:flex-none"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${
                      step >= item.number
                        ? "border-violet-500 bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                        : "border-slate-700 bg-slate-800 text-slate-500"
                    }`}
                  >
                    {step > item.number ? "✓" : item.number}
                  </div>

                  <span
                    className={`mt-2 hidden text-[11px] font-medium sm:block ${
                      step >= item.number
                        ? "text-violet-300"
                        : "text-slate-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 mb-5 h-px flex-1 transition-colors duration-300 ${
                      step > item.number
                        ? "bg-violet-500/70"
                        : "bg-slate-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Step {step} of {steps.length}
            </span>

            <span className="font-medium text-violet-400">
              {steps[step - 1]?.label}
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  Role details
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Start with the basic details of the position you're hiring
                  for.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Job Title
                </label>

                <input
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Industry
                </label>

                <input
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. FinTech"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Experience Level
                </label>

                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                >
                  <option value="Entry">Entry Level</option>
                  <option value="Mid">Mid Level</option>
                  <option value="Senior">Senior Level</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  Requirements
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Define the skills and additional requirements for the role.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Key Skills
                </label>

                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Java, Spring Boot, React"
                  rows="4"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm leading-6 text-white placeholder:text-slate-600 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Separate skills using commas.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Special Requirements
                </label>

                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  placeholder="e.g. Good communication skills"
                  rows="4"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm leading-6 text-white placeholder:text-slate-600 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  Company
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Tell us about the environment you're hiring into.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Company Culture
                </label>

                <select
                  name="companyCulture"
                  value={formData.companyCulture}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                >
                  <option value="Startup">Startup</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Remote-first">Remote-first</option>
                </select>
              </div>

              <div className="rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-violet-400">✦</div>

                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      AI personalization
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      The generator will tailor the description to the
                      selected industry, experience level, and company
                      culture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  Review
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Review your inputs before generating the job description.
                </p>
              </div>

              <div className="grid gap-3">
                <ReviewItem
                  label="Role"
                  value={formData.jobTitle}
                />

                <ReviewItem
                  label="Industry"
                  value={formData.industry}
                />

                <ReviewItem
                  label="Experience"
                  value={formData.experienceLevel}
                />

                <ReviewItem
                  label="Skills"
                  value={formData.skills}
                />

                <ReviewItem
                  label="Culture"
                  value={formData.companyCulture}
                />
              </div>

              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                <div className="flex gap-3">
                  <span className="text-emerald-400">✓</span>

                  <p className="text-xs leading-5 text-slate-400">
                    Everything looks ready. Generate your JD and then refine
                    it using the editor and AI insights.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-7 flex gap-3 border-t border-slate-800 pt-5">
            {step > 1 && (
              <button
                type="button"
                onClick={previousStep}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white"
              >
                ← Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:from-violet-500 hover:to-violet-400 hover:shadow-violet-500/30 active:scale-[0.98]"
              >
                Continue
                <span className="ml-1.5">→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:from-violet-500 hover:to-cyan-400 hover:shadow-violet-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Generating...
                  </span>
                ) : (
                  "✦ Generate JD"
                )}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Saved Drafts */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-black/10">
        <div className="border-b border-slate-800 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold">Saved Drafts</h3>

                <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-300">
                  {drafts.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Continue working on an existing JD.
              </p>
            </div>

            <button
              type="button"
              onClick={loadDrafts}
              disabled={loadingDrafts}
              className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white disabled:opacity-50"
            >
              {loadingDrafts ? "Loading..." : "↻ Refresh"}
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Filters */}
          {drafts.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
                placeholder="Search job titles or industries..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
              />

              <select
                value={draftIndustry}
                onChange={(e) => setDraftIndustry(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
              >
                {draftIndustries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry === "All" ? "All industries" : industry}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Loading */}
          {loadingDrafts ? (
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-6 text-center">
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-violet-500" />

              <p className="mt-3 text-sm text-slate-500">
                Loading saved drafts...
              </p>
            </div>
          ) : drafts.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-500">
                ◇
              </div>

              <p className="mt-3 text-sm font-medium text-slate-300">
                No saved job descriptions yet
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Generate a JD and save it to see it here.
              </p>
            </div>
          ) : filteredDrafts.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 p-6 text-center">
              <p className="text-sm font-medium text-slate-300">
                No matching drafts
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Try a different search term or industry.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-2.5">
              {filteredDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="group rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition-all hover:border-violet-500/30 hover:bg-slate-950"
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenDraft(draft)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-sm text-violet-400">
                          JD
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium text-slate-200">
                              {draft.jobTitle}
                            </span>

                            <span className="shrink-0 text-[10px] text-slate-600">
                              #{draft.id}
                            </span>
                          </div>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {draft.industry} • {draft.experienceLevel}
                          </p>
                        </div>
                      </div>
                    </button>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDuplicateDraft(draft.id)}
                        disabled={duplicating}
                        className="rounded-lg px-2.5 py-2 text-sm text-slate-500 transition hover:bg-violet-500/10 hover:text-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Duplicate draft"
                      >
                        {duplicating ? "..." : "⧉"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteDraft(draft.id)}
                        className="rounded-lg px-2.5 py-2 text-sm text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                        title="Delete draft"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
        {label}
      </span>

      <p
        className={`mt-1 text-sm ${
          value ? "text-slate-200" : "text-slate-600"
        }`}
      >
        {value || "Not provided"}
      </p>
    </div>
  );
}