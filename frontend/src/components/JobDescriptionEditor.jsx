export default function JobDescriptionEditor({
  jobDescription,
  updateJobDescription,
  updateListItem,
  addListItem,
  removeListItem,
  saved,
}) {
  if (!jobDescription) {
    return null;
  }

  const responsibilities = Array.isArray(jobDescription.responsibilities)
    ? jobDescription.responsibilities
    : [];

  const requiredSkills = Array.isArray(jobDescription.requiredSkills)
    ? jobDescription.requiredSkills
    : [];

  const preferredSkills = Array.isArray(jobDescription.preferredSkills)
    ? jobDescription.preferredSkills
    : [];

  const whatWeOffer = Array.isArray(jobDescription.whatWeOffer)
    ? jobDescription.whatWeOffer
    : [];

  const jobTitle = jobDescription.jobTitle ?? "";
  const industry = jobDescription.industry ?? "";
  const experienceLevel = jobDescription.experienceLevel ?? "Entry";
  const aboutTheRole = jobDescription.aboutTheRole ?? "";
  const experience = jobDescription.experience ?? "";
  const companyDescription = jobDescription.companyDescription ?? "";
  const specialRequirements = jobDescription.specialRequirements ?? "";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl shadow-black/10">
      {/* Editor Header */}
      <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 px-6 py-5 backdrop-blur-xl sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                Editor
              </span>

              <span className="text-xs text-slate-600">
                Editable draft
              </span>
            </div>

            <input
              value={jobTitle}
              onChange={(e) =>
                updateJobDescription("jobTitle", e.target.value)
              }
              placeholder="Job title"
              className="w-full border-b border-slate-800 bg-transparent pb-2 text-2xl font-bold tracking-tight text-white outline-none transition-colors placeholder:text-slate-700 focus:border-violet-500 sm:text-3xl"
            />

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-violet-300">
                {industry || "Industry not specified"}
              </span>

              <span className="text-slate-700">•</span>

              <span className="text-slate-500">
                {experienceLevel}
              </span>
            </div>
          </div>

          {/* Save Status */}
          <SaveStatus saved={saved} />
        </div>
      </div>

      {/* Editor Content */}
      <div className="max-h-[850px] overflow-y-auto px-6 py-7 sm:px-7">
        <EditorSection
          title="About the Role"
          description="Give candidates a clear overview of the position and its purpose."
        >
          <textarea
            value={aboutTheRole}
            onChange={(e) =>
              updateJobDescription("aboutTheRole", e.target.value)
            }
            rows="5"
            placeholder="Describe the role..."
            className="editor-textarea"
          />
        </EditorSection>

        <ListEditor
          title="Responsibilities"
          description="Define the main responsibilities and day-to-day expectations."
          field="responsibilities"
          items={responsibilities}
          addLabel="New responsibility"
          updateListItem={updateListItem}
          addListItem={addListItem}
          removeListItem={removeListItem}
          textarea
        />

        <ListEditor
          title="Required Skills"
          description="Skills and qualifications candidates should have."
          field="requiredSkills"
          items={requiredSkills}
          addLabel="New skill"
          updateListItem={updateListItem}
          addListItem={addListItem}
          removeListItem={removeListItem}
        />

        <ListEditor
          title="Preferred Skills"
          description="Additional skills that can strengthen a candidate's profile."
          field="preferredSkills"
          items={preferredSkills}
          addLabel="New skill"
          updateListItem={updateListItem}
          addListItem={addListItem}
          removeListItem={removeListItem}
        />

        <EditorSection
          title="Experience"
          description="Describe the experience expected for this position."
        >
          <textarea
            value={experience}
            onChange={(e) =>
              updateJobDescription("experience", e.target.value)
            }
            rows="3"
            placeholder="Describe the required experience..."
            className="editor-textarea"
          />
        </EditorSection>

        <ListEditor
          title="What We Offer"
          description="Highlight benefits, opportunities, or other information provided to candidates."
          field="whatWeOffer"
          items={whatWeOffer}
          addLabel="New benefit"
          updateListItem={updateListItem}
          addListItem={addListItem}
          removeListItem={removeListItem}
          textarea
        />

        <EditorSection
          title="About the Company"
          description="Help candidates understand the organization behind the role."
        >
          <textarea
            value={companyDescription}
            onChange={(e) =>
              updateJobDescription("companyDescription", e.target.value)
            }
            rows="4"
            placeholder="Describe the company..."
            className="editor-textarea"
          />
        </EditorSection>

        <EditorSection
          title="Special Requirements"
          description="Add any additional requirements or expectations."
          last
        >
          <textarea
            value={specialRequirements}
            onChange={(e) =>
              updateJobDescription(
                "specialRequirements",
                e.target.value
              )
            }
            rows="3"
            placeholder="Any additional requirements..."
            className="editor-textarea"
          />
        </EditorSection>

        {/* Save Message */}
        <div className="mt-7">
          {saved ? (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-sm text-emerald-400">
                ✓
              </span>

              <div>
                <p className="text-sm font-medium text-emerald-300">
                  Job description saved
                </p>

                <p className="text-xs text-slate-500">
                  Your latest changes are stored.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-sm text-amber-400">
                !
              </span>

              <div>
                <p className="text-sm font-medium text-amber-300">
                  Unsaved changes
                </p>

                <p className="text-xs text-slate-500">
                  Click "Save JD" above to save your latest changes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .editor-textarea {
          width: 100%;
          resize: vertical;
          border-radius: 0.75rem;
          border: 1px solid rgb(51 65 85);
          background: rgb(15 23 42 / 0.7);
          padding: 0.875rem 1rem;
          color: rgb(203 213 225);
          font-size: 0.875rem;
          line-height: 1.7;
          outline: none;
          transition: all 0.2s;
        }

        .editor-textarea::placeholder {
          color: rgb(71 85 105);
        }

        .editor-textarea:hover {
          border-color: rgb(71 85 105);
        }

        .editor-textarea:focus {
          border-color: rgb(139 92 246);
          box-shadow: 0 0 0 3px rgb(139 92 246 / 0.08);
        }
      `}</style>
    </div>
  );
}

function EditorSection({
  title,
  description,
  children,
  last = false,
}) {
  return (
    <section className={`${last ? "" : "border-b border-slate-800/80 pb-7"} mb-7`}>
      <div className="mb-3">
        <h4 className="text-base font-semibold text-slate-200">
          {title}
        </h4>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function SaveStatus({ saved }) {
  return saved ? (
    <div className="shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
      <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
        Saved
      </div>
    </div>
  ) : (
    <div className="shrink-0 rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2">
      <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        Unsaved
      </div>
    </div>
  );
}

function ListEditor({
  title,
  description,
  field,
  items,
  addLabel,
  updateListItem,
  addListItem,
  removeListItem,
  textarea = false,
}) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section className="mb-7 border-b border-slate-800/80 pb-7">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-slate-200">
            {title}
          </h4>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => addListItem(field, addLabel)}
          className="shrink-0 rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs font-medium text-violet-400 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
        >
          + Add
        </button>
      </div>

      <div className={textarea ? "space-y-3" : "space-y-2"}>
        {safeItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-4 text-center">
            <p className="text-xs text-slate-600">
              No {title.toLowerCase()} added yet.
            </p>

            <button
              type="button"
              onClick={() => addListItem(field, addLabel)}
              className="mt-2 text-xs font-medium text-violet-400 hover:text-violet-300"
            >
              + Add {addLabel.toLowerCase()}
            </button>
          </div>
        ) : (
          safeItems.map((item, index) => (
            <div
              key={`${field}-${index}`}
              className="group flex gap-2"
            >
              {textarea ? (
                <textarea
                  value={item ?? ""}
                  onChange={(e) =>
                    updateListItem(
                      field,
                      index,
                      e.target.value
                    )
                  }
                  rows="2"
                  placeholder={addLabel}
                  className="editor-list-textarea"
                />
              ) : (
                <input
                  value={item ?? ""}
                  onChange={(e) =>
                    updateListItem(
                      field,
                      index,
                      e.target.value
                    )
                  }
                  placeholder={addLabel}
                  className="editor-list-input"
                />
              )}

              <button
                type="button"
                onClick={() =>
                  removeListItem(field, index)
                }
                className="h-fit rounded-lg border border-transparent px-2.5 py-2 text-sm text-slate-600 transition-all hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-400"
                title={`Remove ${title.toLowerCase()} item`}
              >
                🗑
              </button>
            </div>
          ))
        )}
      </div>

      <style>{`
        .editor-list-input,
        .editor-list-textarea {
          flex: 1;
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(51 65 85);
          background: rgb(15 23 42 / 0.7);
          color: rgb(203 213 225);
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }

        .editor-list-input {
          padding: 0.75rem 0.875rem;
        }

        .editor-list-textarea {
          resize: vertical;
          min-height: 64px;
          padding: 0.75rem 0.875rem;
          line-height: 1.6;
        }

        .editor-list-input::placeholder,
        .editor-list-textarea::placeholder {
          color: rgb(71 85 105);
        }

        .editor-list-input:hover,
        .editor-list-textarea:hover {
          border-color: rgb(71 85 105);
        }

        .editor-list-input:focus,
        .editor-list-textarea:focus {
          border-color: rgb(139 92 246);
          box-shadow: 0 0 0 3px rgb(139 92 246 / 0.08);
        }
      `}</style>
    </section>
  );
}