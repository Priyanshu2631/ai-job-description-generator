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
}) {
  return (
    <div className="space-y-8 lg:col-span-1">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
        <div className="mb-7 flex items-center justify-between">
          {[1, 2, 3, 4].map(
            (number) => (
              <div
                key={number}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  step >= number
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {number}
              </div>
            )
          )}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold">
                Role
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Start with the basic role details.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Job Title
              </label>

              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Industry
              </label>

              <input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. FinTech"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Experience Level
              </label>

              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
              >
                <option value="Entry">
                  Entry Level
                </option>

                <option value="Mid">
                  Mid Level
                </option>

                <option value="Senior">
                  Senior Level
                </option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold">
                Requirements
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Define the skills and requirements.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Key Skills
              </label>

              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Java, Spring Boot, React"
                rows="4"
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate skills using commas.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Special Requirements
              </label>

              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                placeholder="e.g. Good communication skills"
                rows="4"
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold">
                Company
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Tell us about the company environment.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Company Culture
              </label>

              <select
                name="companyCulture"
                value={formData.companyCulture}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
              >
                <option value="Startup">
                  Startup
                </option>

                <option value="Corporate">
                  Corporate
                </option>

                <option value="Remote-first">
                  Remote-first
                </option>
              </select>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">
                The generator will tailor the description
                to the selected industry, experience level
                and company culture.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold">
                Review
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Review your inputs before generating.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-500">
                  Role
                </span>

                <p className="font-medium">
                  {formData.jobTitle ||
                    "Not provided"}
                </p>
              </div>

              <div>
                <span className="text-slate-500">
                  Industry
                </span>

                <p className="font-medium">
                  {formData.industry ||
                    "Not provided"}
                </p>
              </div>

              <div>
                <span className="text-slate-500">
                  Experience
                </span>

                <p className="font-medium">
                  {formData.experienceLevel}
                </p>
              </div>

              <div>
                <span className="text-slate-500">
                  Skills
                </span>

                <p className="font-medium">
                  {formData.skills ||
                    "Not provided"}
                </p>
              </div>

              <div>
                <span className="text-slate-500">
                  Culture
                </span>

                <p className="font-medium">
                  {formData.companyCulture}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-7 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={previousStep}
              className="flex-1 rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium hover:bg-slate-800"
            >
              ← Back
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold hover:bg-purple-500"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold hover:bg-purple-500 disabled:opacity-50"
            >
              {loading
                ? "Generating..."
                : "✦ Generate JD"}
            </button>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold">
                Saved Drafts
              </h3>

              <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
                {drafts.length}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-400">
              Continue an existing JD.
            </p>
          </div>

          <button
            onClick={loadDrafts}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
          >
            {loadingDrafts
              ? "Loading..."
              : "↻ Refresh"}
          </button>
        </div>

        {drafts.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
              value={draftSearch}
              onChange={(e) =>
                setDraftSearch(
                  e.target.value
                )
              }
              placeholder="Search by job title or industry..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-purple-500"
            />

            <select
              value={draftIndustry}
              onChange={(e) =>
                setDraftIndustry(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-purple-500"
            >
              {draftIndustries.map(
                (industry) => (
                  <option
                    key={industry}
                    value={industry}
                  >
                    {industry === "All"
                      ? "All industries"
                      : industry}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {loadingDrafts ? (
          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-5 text-center text-sm text-slate-500">
            Loading saved drafts...
          </div>
        ) : drafts.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-slate-700 bg-slate-950 p-6 text-center">
            <p className="font-medium text-slate-300">
              No saved job descriptions yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Generate a JD and save it to see it here.
            </p>
          </div>
        ) : filteredDrafts.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-slate-700 bg-slate-950 p-6 text-center">
            <p className="font-medium text-slate-300">
              No matching drafts
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try a different search term or industry.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {filteredDrafts.map(
              (draft) => (
                <div
                  key={draft.id}
                  className="rounded-lg border border-slate-800 bg-slate-950 p-4 hover:border-purple-500"
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenDraft(
                          draft
                        )
                      }
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">
                          {draft.jobTitle}
                        </span>

                        <span className="text-xs text-slate-500">
                          #{draft.id}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-400">
                        {draft.industry} •{" "}
                        {draft.experienceLevel}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteDraft(
                          draft.id
                        )
                      }
                      className="rounded-lg px-2 py-1 text-sm text-red-400 hover:bg-red-500/10"
                      title="Delete draft"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}
