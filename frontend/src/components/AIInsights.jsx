import VersionHistory from "./VersionHistory";

export default function AIInsights({
  jobDescription,
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
      {/* ==================================================
          AI JD OPTIMIZATION
      ================================================== */}

      {optimization && (
        <div className="rounded-2xl border border-purple-900/70 bg-slate-900 p-5">

          <div className="flex flex-wrap items-start justify-between gap-4">

            <div>
              <h3 className="font-semibold">
                AI JD Optimization
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Compare the original and AI-optimized versions before applying changes.
              </p>
            </div>

            <div className="flex gap-2">

              <button
                type="button"
                onClick={() =>
                  setOptimization(null)
                }
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
              >
                Keep Original
              </button>

              <button
                type="button"
                onClick={
                  handleApplyOptimization
                }
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold hover:bg-purple-500"
              >
                Apply Changes
              </button>

            </div>

          </div>


          {/* ==================================================
              CHANGES MADE
          ================================================== */}

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


          {/* ==================================================
              ORIGINAL VS OPTIMIZED
          ================================================== */}

          <div className="mt-5">

            <div className="mb-3 flex items-center justify-between">

              <h4 className="text-lg font-semibold">
                Original vs Optimized
              </h4>

              <span className="text-xs text-slate-500">
                Review before applying
              </span>

            </div>


            <div className="grid gap-4 lg:grid-cols-2">

              {/* ORIGINAL */}

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

                <div className="mb-5 flex items-center justify-between">

                  <h5 className="font-semibold text-slate-200">
                    Original Version
                  </h5>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                    Current
                  </span>

                </div>


                <ComparisonSection
                  title="About the Role"
                >
                  <p>
                    {jobDescription?.aboutTheRole ||
                      "Not provided"}
                  </p>
                </ComparisonSection>


                <ComparisonSection
                  title="Responsibilities"
                >
                  <BulletList
                    items={
                      jobDescription?.responsibilities
                    }
                  />
                </ComparisonSection>


                <ComparisonSection
                  title="Required Skills"
                >
                  <SkillList
                    items={
                      jobDescription?.requiredSkills
                    }
                    purple={false}
                  />
                </ComparisonSection>


                <ComparisonSection
                  title="Preferred Skills"
                >
                  <SkillList
                    items={
                      jobDescription?.preferredSkills
                    }
                  />
                </ComparisonSection>


                <ComparisonSection
                  title="Experience"
                >
                  <p>
                    {jobDescription?.experience ||
                      "Not provided"}
                  </p>
                </ComparisonSection>


                <ComparisonSection
                  title="What We Offer"
                >
                  <BulletList
                    items={
                      jobDescription?.whatWeOffer
                    }
                  />
                </ComparisonSection>


                <ComparisonSection
                  title="About the Company"
                >
                  <p>
                    {jobDescription?.companyDescription ||
                      "Not provided"}
                  </p>
                </ComparisonSection>

              </div>


              {/* OPTIMIZED */}

              <div className="rounded-xl border border-purple-900/60 bg-purple-950/10 p-5">

                <div className="mb-5 flex items-center justify-between">

                  <h5 className="font-semibold text-purple-300">
                    Optimized Version
                  </h5>

                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                    AI Improved
                  </span>

                </div>


                <ComparisonSection
                  title="About the Role"
                >
                  <p>
                    {optimization.optimizedAboutTheRole ||
                      "Not provided"}
                  </p>
                </ComparisonSection>


                <ComparisonSection
                  title="Responsibilities"
                >
                  <BulletList
                    items={
                      optimization.optimizedResponsibilities
                    }
                  />
                </ComparisonSection>


                <ComparisonSection
                  title="Required Skills"
                >
                  <SkillList
                    items={
                      optimization.optimizedRequiredSkills
                    }
                    purple
                  />
                </ComparisonSection>


                <ComparisonSection
                  title="Preferred Skills"
                >
                  <SkillList
                    items={
                      optimization.optimizedPreferredSkills
                    }
                  />
                </ComparisonSection>


                <ComparisonSection
                  title="Experience"
                >
                  <p>
                    {optimization.optimizedExperience ||
                      "Not provided"}
                  </p>
                </ComparisonSection>


                <ComparisonSection
                  title="What We Offer"
                >
                  <BulletList
                    items={
                      optimization.optimizedWhatWeOffer
                    }
                  />
                </ComparisonSection>


                <ComparisonSection
                  title="About the Company"
                >
                  <p>
                    {optimization.optimizedCompanyDescription ||
                      "Not provided"}
                  </p>
                </ComparisonSection>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* ==================================================
          AI ANALYSIS
      ================================================== */}

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
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800 disabled:opacity-50"
            >
              {analyzing
                ? "Analyzing..."
                : "↻ Re-analyze"}
            </button>

          </div>


          {/* SCORES */}

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


          {/* ANALYSIS DETAILS */}

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


      {/* ==================================================
          ATS OPTIMIZATION
      ================================================== */}

      {ats && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          {/* HEADER */}

          <div className="flex flex-wrap items-start justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                ATS Optimization
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Local keyword coverage analysis based on the job description.
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


          {/* OVERALL PROGRESS */}

          <div className="mt-4">

            <div className="flex justify-between text-xs text-slate-500">
              <span>Overall keyword coverage</span>
              <span>{ats.score}%</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-purple-600 transition-all"
                style={{
                  width: `${Math.max(
                    0,
                    Math.min(
                      100,
                      ats.score || 0
                    )
                  )}%`,
                }}
              />

            </div>

          </div>


          {/* COVERAGE BREAKDOWN */}

          <div className="mt-5 grid gap-3 md:grid-cols-3">

            <CoverageCard
              title="Required Skills"
              score={
                ats.requiredCoverage
              }
              matched={
                ats.requiredMatched
              }
              missing={
                ats.requiredMissing
              }
            />

            <CoverageCard
              title="Preferred Skills"
              score={
                ats.preferredCoverage
              }
              matched={
                ats.preferredMatched
              }
              missing={
                ats.preferredMissing
              }
            />

            <CoverageCard
              title="Role Keywords"
              score={
                ats.roleCoverage
              }
              matched={
                ats.roleMatched
              }
              missing={
                ats.roleMissing
              }
            />

          </div>


          {/* DETECTED KEYWORDS */}

          {ats.matched?.length > 0 && (
            <KeywordGroup
              title="Detected Keywords"
              items={ats.matched}
              type="matched"
            />
          )}


          {/* MISSING REQUIRED */}

          {ats.requiredMissing?.length > 0 && (
            <KeywordGroup
              title="Missing Required Skills"
              items={ats.requiredMissing}
              type="missing"
            />
          )}


          {/* MISSING PREFERRED */}

          {ats.preferredMissing?.length > 0 && (
            <KeywordGroup
              title="Missing Preferred Skills"
              items={ats.preferredMissing}
              type="preferred"
            />
          )}


          {/* SUGGESTIONS */}

          {ats.suggestions?.length > 0 && (
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">

              <div className="flex items-center gap-2">

                <span className="text-lg">
                  💡
                </span>

                <h4 className="font-medium text-amber-300">
                  Suggestions
                </h4>

              </div>

              <ul className="mt-3 space-y-2">

                {ats.suggestions.map(
                  (suggestion, index) => (

                    <li
                      key={index}
                      className="text-sm leading-6 text-slate-300"
                    >
                      • {suggestion}
                    </li>

                  )
                )}

              </ul>

            </div>
          )}

        </div>
      )}


      {/* ==================================================
          VERSION HISTORY
      ================================================== */}

      {jobDescription?.id && (
        <VersionHistory
          jobDescription={
            jobDescription
          }
        />
      )}

    </>
  );
}


// ======================================================
// COVERAGE CARD
// ======================================================

function CoverageCard({
  title,
  score,
  matched,
  missing,
}) {
  const safeScore =
    Math.max(
      0,
      Math.min(
        100,
        score || 0
      )
    );

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-sm font-medium text-slate-200">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {matched?.length || 0} matched
            {" · "}
            {missing?.length || 0} missing
          </p>

        </div>

        <span className="text-lg font-bold text-purple-300">
          {safeScore}%
        </span>

      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-purple-500 transition-all"
          style={{
            width: `${safeScore}%`,
          }}
        />

      </div>

    </div>
  );
}


// ======================================================
// KEYWORD GROUP
// ======================================================

function KeywordGroup({
  title,
  items,
  type,
}) {
  if (!items?.length) {
    return null;
  }

  const styles = {
    matched:
      "bg-green-500/10 text-green-400 border-green-500/20",

    missing:
      "bg-red-500/10 text-red-400 border-red-500/20",

    preferred:
      "bg-amber-500/10 text-amber-300 border-amber-500/20",
  };

  return (
    <div className="mt-5">

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <div className="flex flex-wrap gap-2">

        {items.map(
          (keyword) => (

            <span
              key={keyword}
              className={`rounded-full border px-3 py-1 text-xs ${styles[type]}`}
            >
              {type === "matched"
                ? "✓ "
                : type === "missing"
                ? "× "
                : "• "}
              {keyword}
            </span>

          )
        )}

      </div>

    </div>
  );
}


// ======================================================
// COMPARISON SECTION
// ======================================================

function ComparisonSection({
  title,
  children,
}) {
  return (
    <div className="mb-5">

      <h6 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h6>

      <div className="text-sm leading-6 text-slate-300">
        {children}
      </div>

    </div>
  );
}


// ======================================================
// BULLET LIST
// ======================================================

function BulletList({
  items,
}) {
  const safeItems =
    Array.isArray(items)
      ? items
      : [];

  if (
    safeItems.length === 0
  ) {
    return (
      <p className="text-slate-500">
        Not provided
      </p>
    );
  }

  return (
    <ul className="space-y-2">

      {safeItems.map(
        (item, index) => (

          <li
            key={index}
            className="leading-6"
          >
            • {item}
          </li>

        )
      )}

    </ul>
  );
}


// ======================================================
// SKILL LIST
// ======================================================

function SkillList({
  items,
  purple = false,
}) {
  const safeItems =
    Array.isArray(items)
      ? items
      : [];

  if (
    safeItems.length === 0
  ) {
    return (
      <p className="text-slate-500">
        Not provided
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">

      {safeItems.map(
        (skill, index) => (

          <span
            key={index}
            className={
              purple
                ? "rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                : "rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
            }
          >
            {skill}
          </span>

        )
      )}

    </div>
  );
}