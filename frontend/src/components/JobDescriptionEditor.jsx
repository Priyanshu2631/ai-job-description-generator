export default function JobDescriptionEditor({
  jobDescription,
  updateJobDescription,
  updateListItem,
  addListItem,
  removeListItem,
  saved,
}) {
  // --------------------------------------------------
  // SAFETY CHECK
  // --------------------------------------------------

  if (!jobDescription) {
    return null;
  }

  // --------------------------------------------------
  // SAFE LIST VALUES
  // --------------------------------------------------

  const responsibilities =
    Array.isArray(
      jobDescription.responsibilities
    )
      ? jobDescription.responsibilities
      : [];

  const requiredSkills =
    Array.isArray(
      jobDescription.requiredSkills
    )
      ? jobDescription.requiredSkills
      : [];

  const preferredSkills =
    Array.isArray(
      jobDescription.preferredSkills
    )
      ? jobDescription.preferredSkills
      : [];

  const whatWeOffer =
    Array.isArray(
      jobDescription.whatWeOffer
    )
      ? jobDescription.whatWeOffer
      : [];

  // --------------------------------------------------
  // SAFE STRING VALUES
  // --------------------------------------------------

  const jobTitle =
    jobDescription.jobTitle ??
    "";

  const industry =
    jobDescription.industry ??
    "";

  const experienceLevel =
    jobDescription.experienceLevel ??
    "Entry";

  const aboutTheRole =
    jobDescription.aboutTheRole ??
    "";

  const experience =
    jobDescription.experience ??
    "";

  const companyDescription =
    jobDescription.companyDescription ??
    "";

  const specialRequirements =
    jobDescription.specialRequirements ??
    "";

  return (
    <div className="max-h-[850px] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-7">

      {/* --------------------------------------------------
          HEADER
      -------------------------------------------------- */}

      <div>
        <input
          value={jobTitle}
          onChange={(e) =>
            updateJobDescription(
              "jobTitle",
              e.target.value
            )
          }
          className="w-full border-b border-slate-700 bg-transparent pb-2 text-3xl font-bold outline-none focus:border-purple-500"
        />

        <p className="mt-2 text-sm text-purple-400">
          {industry || "Industry not specified"}{" "}
          •{" "}
          {experienceLevel}
        </p>
      </div>

      {/* --------------------------------------------------
          ABOUT THE ROLE
      -------------------------------------------------- */}

      <div className="mt-8">
        <h4 className="mb-2 text-lg font-semibold">
          About the Role
        </h4>

        <textarea
          value={aboutTheRole}
          onChange={(e) =>
            updateJobDescription(
              "aboutTheRole",
              e.target.value
            )
          }
          rows="5"
          placeholder="Describe the role..."
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 leading-7 text-slate-300 outline-none focus:border-purple-500"
        />
      </div>

      {/* --------------------------------------------------
          RESPONSIBILITIES
      -------------------------------------------------- */}

      <ListEditor
        title="Responsibilities"
        field="responsibilities"
        items={responsibilities}
        addLabel="New responsibility"
        updateListItem={
          updateListItem
        }
        addListItem={
          addListItem
        }
        removeListItem={
          removeListItem
        }
        textarea
      />

      {/* --------------------------------------------------
          REQUIRED SKILLS
      -------------------------------------------------- */}

      <ListEditor
        title="Required Skills"
        field="requiredSkills"
        items={requiredSkills}
        addLabel="New skill"
        updateListItem={
          updateListItem
        }
        addListItem={
          addListItem
        }
        removeListItem={
          removeListItem
        }
      />

      {/* --------------------------------------------------
          PREFERRED SKILLS
      -------------------------------------------------- */}

      <ListEditor
        title="Preferred Skills"
        field="preferredSkills"
        items={preferredSkills}
        addLabel="New skill"
        updateListItem={
          updateListItem
        }
        addListItem={
          addListItem
        }
        removeListItem={
          removeListItem
        }
      />

      {/* --------------------------------------------------
          EXPERIENCE
      -------------------------------------------------- */}

      <div className="mt-8">
        <h4 className="mb-2 text-lg font-semibold">
          Experience
        </h4>

        <textarea
          value={experience}
          onChange={(e) =>
            updateJobDescription(
              "experience",
              e.target.value
            )
          }
          rows="3"
          placeholder="Describe the required experience..."
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-300 outline-none focus:border-purple-500"
        />
      </div>

      {/* --------------------------------------------------
          WHAT WE OFFER
      -------------------------------------------------- */}

      <ListEditor
        title="What We Offer"
        field="whatWeOffer"
        items={whatWeOffer}
        addLabel="New benefit"
        updateListItem={
          updateListItem
        }
        addListItem={
          addListItem
        }
        removeListItem={
          removeListItem
        }
        textarea
      />

      {/* --------------------------------------------------
          COMPANY DESCRIPTION
      -------------------------------------------------- */}

      <div className="mt-8">
        <h4 className="mb-2 text-lg font-semibold">
          About the Company
        </h4>

        <textarea
          value={companyDescription}
          onChange={(e) =>
            updateJobDescription(
              "companyDescription",
              e.target.value
            )
          }
          rows="4"
          placeholder="Describe the company..."
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 leading-7 text-slate-300 outline-none focus:border-purple-500"
        />
      </div>

      {/* --------------------------------------------------
          SPECIAL REQUIREMENTS
      -------------------------------------------------- */}

      <div className="mt-8">
        <h4 className="mb-2 text-lg font-semibold">
          Special Requirements
        </h4>

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
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-300 outline-none focus:border-purple-500"
        />
      </div>

      {/* --------------------------------------------------
          SAVE STATUS
      -------------------------------------------------- */}

      {saved && (
        <div className="mt-6 rounded-lg border border-green-800 bg-green-950/30 px-4 py-3 text-sm text-green-400">
          ✓ Job description saved successfully.
        </div>
      )}
    </div>
  );
}

// ======================================================
// LIST EDITOR
// ======================================================

function ListEditor({
  title,
  field,
  items,
  addLabel,
  updateListItem,
  addListItem,
  removeListItem,
  textarea = false,
}) {
  // Extra safety in case a component accidentally
  // receives something other than an array.
  const safeItems =
    Array.isArray(items)
      ? items
      : [];

  return (
    <div className="mt-8">

      {/* --------------------------------------------------
          TITLE + ADD BUTTON
      -------------------------------------------------- */}

      <div className="mb-3 flex items-center justify-between">

        <h4 className="text-lg font-semibold">
          {title}
        </h4>

        <button
          type="button"
          onClick={() =>
            addListItem(
              field,
              addLabel
            )
          }
          className="text-sm text-purple-400 hover:text-purple-300"
        >
          + Add
        </button>

      </div>

      {/* --------------------------------------------------
          ITEMS
      -------------------------------------------------- */}

      <div
        className={
          textarea
            ? "space-y-3"
            : "space-y-2"
        }
      >

        {safeItems.length === 0 ? (

          <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-500">
            No {title.toLowerCase()} added yet.
          </div>

        ) : (

          safeItems.map(
            (item, index) => (

              <div
                key={`${field}-${index}`}
                className="flex gap-2"
              >

                {/* --------------------------------------------------
                    TEXTAREA ITEM
                -------------------------------------------------- */}

                {textarea ? (

                  <textarea
                    value={
                      item ?? ""
                    }
                    onChange={(e) =>
                      updateListItem(
                        field,
                        index,
                        e.target.value
                      )
                    }
                    rows="2"
                    className="flex-1 resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-slate-300 outline-none focus:border-purple-500"
                  />

                ) : (

                  /* --------------------------------------------------
                     INPUT ITEM
                  -------------------------------------------------- */

                  <input
                    value={
                      item ?? ""
                    }
                    onChange={(e) =>
                      updateListItem(
                        field,
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 outline-none focus:border-purple-500"
                  />

                )}

                {/* --------------------------------------------------
                    DELETE ITEM
                -------------------------------------------------- */}

                <button
                  type="button"
                  onClick={() =>
                    removeListItem(
                      field,
                      index
                    )
                  }
                  className="h-fit rounded-lg px-2 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  title={`Remove ${title.toLowerCase()} item`}
                >
                  🗑
                </button>

              </div>
            )
          )

        )}

      </div>
    </div>
  );
}