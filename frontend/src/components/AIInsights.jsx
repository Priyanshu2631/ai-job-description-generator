export default function AIInsights({
  optimization,
  setOptimization,
  handleApplyOptimization,
  analysis,
  handleAnalyze,
  analyzing,
  ats,
}) {
  return (
    <>
      {optimization && (
        <div className="rounded-2xl border border-purple-900/70 bg-slate-900 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold">
                AI JD Optimization
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Review the AI-improved version before applying any changes.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setOptimization(null)
                }
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
              >
                Keep Original
              </button>

              <button
                onClick={
                  handleApplyOptimization
                }
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold hover:bg-purple-500"
              >
                Apply Changes
              </button>
            </div>
          </div>

          {optimization.changesMade?.length > 0 && (
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <h4 className="font-medium text-purple-300">
                Changes Made
              </h4>

              <ul className="mt-3 space-y-2">
                {optimization.changesMade.map(
                  (change, index) => (
                    <li
                      key={index}
                      className="text-sm leading-6 text-slate-300"
                    >
                      ✓ {change}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h4 className="text-lg font-semibold">
              Optimized Version
            </h4>

            <div className="mt-5">
              <h5 className="font-medium text-slate-200">
                About the Role
              </h5>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {
                  optimization.optimizedAboutTheRole
                }
              </p>
            </div>

            <div className="mt-5">
              <h5 className="font-medium text-slate-200">
                Responsibilities
              </h5>

              <ul className="mt-2 space-y-2">
                {optimization.optimizedResponsibilities?.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="text-sm leading-6 text-slate-300"
                    >
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-5">
              <h5 className="font-medium text-slate-200">
                Required Skills
              </h5>

              <div className="mt-2 flex flex-wrap gap-2">
                {optimization.optimizedRequiredSkills?.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-5">
              <h5 className="font-medium text-slate-200">
                Preferred Skills
              </h5>

              <div className="mt-2 flex flex-wrap gap-2">
                {optimization.optimizedPreferredSkills?.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-5">
              <h5 className="font-medium text-slate-200">
                Experience
              </h5>

              <p className="mt-2 text-sm text-slate-300">
                {
                  optimization.optimizedExperience
                }
              </p>
            </div>

            <div className="mt-5">
              <h5 className="font-medium text-slate-200">
                What We Offer
              </h5>

              <ul className="mt-2 space-y-2">
                {optimization.optimizedWhatWeOffer?.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="text-sm leading-6 text-slate-300"
                    >
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-5">
              <h5 className="font-medium text-slate-200">
                About the Company
              </h5>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {
                  optimization.optimizedCompanyDescription
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {analysis && (
        <div className="rounded-2xl border border-cyan-900/70 bg-slate-900 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold">
                AI JD Analysis
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Gemini-based analysis of your saved job description.
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800 disabled:opacity-50"
            >
              {analyzing
                ? "Analyzing..."
                : "↻ Re-analyze"}
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              [
                "ATS Score",
                analysis.atsScore,
              ],
              [
                "Skill Coverage",
                analysis.skillCoverageScore,
              ],
              [
                "Clarity",
                analysis.clarityScore,
              ],
            ].map(
              ([label, score]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-cyan-300">
                    {score}%
                  </p>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(
                            100,
                            score || 0
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              [
                "Missing Information",
                analysis.missingInformation,
                "text-amber-300",
              ],
              [
                "Keyword Suggestions",
                analysis.keywordSuggestions,
                "text-cyan-300",
              ],
              [
                "Improvement Suggestions",
                analysis.improvementSuggestions,
                "text-purple-300",
              ],
              [
                "Potential Issues",
                analysis.potentialIssues,
                "text-red-300",
              ],
            ].map(
              ([
                title,
                items,
                textClass,
              ]) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <h4
                    className={`font-medium ${textClass}`}
                  >
                    {title}
                  </h4>

                  {items?.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {items.map(
                        (
                          item,
                          index
                        ) => (
                          <li
                            key={`${title}-${index}`}
                            className="text-sm leading-6 text-slate-300"
                          >
                            • {item}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-500">
                      Nothing flagged.
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              ATS Optimization
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Keyword coverage based on the role requirements.
            </p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-purple-400">
              {ats.score}%
            </p>

            <p className="text-xs text-slate-500">
              Keyword Match
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-purple-600"
            style={{
              width: `${ats.score}%`,
            }}
          />
        </div>

        {ats.matched.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              Detected Keywords
            </p>

            <div className="flex flex-wrap gap-2">
              {ats.matched.map(
                (keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400"
                  >
                    ✓ {keyword}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
