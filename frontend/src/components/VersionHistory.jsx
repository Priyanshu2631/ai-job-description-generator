import { useEffect, useState } from "react";

const API_BASE =
  "http://localhost:8080/api/job-descriptions";

function parseJsonArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return [];
  }

  try {
    const parsed =
      typeof value === "string"
        ? JSON.parse(value)
        : value;

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  if (!value) {
    return "Unknown date";
  }

  try {
    return new Date(value).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  } catch {
    return value;
  }
}

function getChangeTypeStyle(changeType) {
  const value =
    (changeType || "").toLowerCase();

  if (value.includes("created")) {
    return "bg-green-500/10 text-green-400";
  }

  if (value.includes("restored")) {
    return "bg-blue-500/10 text-blue-400";
  }

  if (value.includes("duplicated")) {
    return "bg-purple-500/10 text-purple-400";
  }

  return "bg-slate-800 text-slate-300";
}

export default function VersionHistory({
  jobDescription,
}) {
  const [versions, setVersions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [selectedVersion, setSelectedVersion] =
    useState(null);

  const [restoringVersion, setRestoringVersion] =
    useState(null);

  const [expanded, setExpanded] =
    useState(false);

  useEffect(() => {
    if (!jobDescription?.id) {
      setVersions([]);
      return;
    }

    loadVersions();
  }, [jobDescription?.id]);

  async function loadVersions() {
    if (!jobDescription?.id) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/${jobDescription.id}/versions`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load versions: ${response.status}`
        );
      }

      const data =
        await response.json();

      setVersions(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Version history loading failed:",
        error
      );

      setVersions([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore(version) {
    if (!jobDescription?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Restore Version ${version.versionNumber}?\n\n` +
          "Your current job description will be replaced by this version."
      );

    if (!confirmed) {
      return;
    }

    setRestoringVersion(
      version.id
    );

    try {
      const response = await fetch(
        `${API_BASE}/${jobDescription.id}/versions/${version.id}/restore`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        let message =
          responseText;

        try {
          const errorData =
            JSON.parse(
              responseText
            );

          message =
            errorData.message ||
            errorData.error ||
            responseText;
        } catch {
          // Response was not JSON.
        }

        throw new Error(
          message ||
            `Restore failed with status ${response.status}`
        );
      }

      alert(
        `Version ${version.versionNumber} restored successfully.`
      );

      /*
       * The restored JD needs to refresh the main editor.
       * Reloading here keeps the component independent
       * from the large useJobDescription state manager.
       */
      window.location.reload();
    } catch (error) {
      console.error(
        "Version restore failed:",
        error
      );

      alert(
        `Could not restore the selected version.\n\n${
          error.message ||
          "Unknown error"
        }`
      );
    } finally {
      setRestoringVersion(null);
    }
  }

  function handleView(version) {
    setSelectedVersion(
      version
    );
  }

  function closeViewer() {
    setSelectedVersion(null);
  }

  if (!jobDescription?.id) {
    return null;
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>
            <div className="flex items-center gap-3">

              <h3 className="font-semibold">
                Version History
              </h3>

              {versions.length > 0 && (
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                  {versions.length}{" "}
                  {versions.length === 1
                    ? "version"
                    : "versions"}
                </span>
              )}

            </div>

            <p className="mt-1 text-sm text-slate-400">
              View previous saved versions and
              restore an earlier version.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setExpanded(
                (previous) =>
                  !previous
              )
            }
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            {expanded
              ? "Collapse"
              : "View History"}
          </button>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        {expanded && (
          <div className="mt-5">

            {loading ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">

                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-purple-500" />

                <p className="mt-3 text-sm text-slate-500">
                  Loading version history...
                </p>

              </div>
            ) : versions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950 p-6 text-center">

                <div className="text-2xl">
                  🕘
                </div>

                <p className="mt-2 font-medium text-slate-300">
                  No versions yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Save this job description to
                  start building its version history.
                </p>

              </div>
            ) : (
              <div className="space-y-3">

                {versions.map(
                  (version, index) => (
                    <div
                      key={version.id}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700"
                    >

                      <div className="flex flex-wrap items-start justify-between gap-4">

                        <div className="flex min-w-0 gap-3">

                          {/* VERSION NUMBER */}

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-bold text-purple-300">
                            v
                            {
                              version.versionNumber
                            }
                          </div>


                          {/* VERSION INFO */}

                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                              <h4 className="font-medium text-slate-200">
                                Version{" "}
                                {
                                  version.versionNumber
                                }
                              </h4>

                              {index === 0 && (
                                <span className="rounded-full bg-green-500/10 px-2 py-1 text-[11px] text-green-400">
                                  Latest
                                </span>
                              )}

                              {version.changeType && (
                                <span
                                  className={`rounded-full px-2 py-1 text-[11px] ${getChangeTypeStyle(
                                    version.changeType
                                  )}`}
                                >
                                  {
                                    version.changeType
                                  }
                                </span>
                              )}

                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                              {formatDate(
                                version.createdAt
                              )}
                            </p>

                          </div>

                        </div>


                        {/* ACTIONS */}

                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleView(
                                version
                              )
                            }
                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleRestore(
                                version
                              )
                            }
                            disabled={
                              restoringVersion ===
                              version.id
                            }
                            className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {restoringVersion ===
                            version.id
                              ? "Restoring..."
                              : "Restore"}
                          </button>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>
        )}

      </div>


      {/* ==================================================
          VERSION VIEWER
      ================================================== */}

      {selectedVersion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 p-5">

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="text-lg font-semibold">
                    Version{" "}
                    {
                      selectedVersion.versionNumber
                    }
                  </h3>

                  {selectedVersion.changeType && (
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] ${getChangeTypeStyle(
                        selectedVersion.changeType
                      )}`}
                    >
                      {
                        selectedVersion.changeType
                      }
                    </span>
                  )}

                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {formatDate(
                    selectedVersion.createdAt
                  )}
                </p>

              </div>

              <button
                type="button"
                onClick={closeViewer}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                ✕
              </button>

            </div>


            {/* MODAL CONTENT */}

            <div className="max-h-[calc(90vh-90px)] overflow-y-auto p-5">

              <VersionSection
                title="Job Title"
              >
                <p>
                  {
                    selectedVersion.jobTitle ||
                    "Not provided"
                  }
                </p>
              </VersionSection>


              <VersionSection
                title="About the Role"
              >
                <p>
                  {
                    selectedVersion.aboutTheRole ||
                    "Not provided"
                  }
                </p>
              </VersionSection>


              <VersionSection
                title="Responsibilities"
              >
                <BulletList
                  items={parseJsonArray(
                    selectedVersion.responsibilities
                  )}
                />
              </VersionSection>


              <VersionSection
                title="Required Skills"
              >
                <SkillList
                  items={parseJsonArray(
                    selectedVersion.requiredSkills
                  )}
                />
              </VersionSection>


              <VersionSection
                title="Preferred Skills"
              >
                <SkillList
                  items={parseJsonArray(
                    selectedVersion.preferredSkills
                  )}
                  purple
                />
              </VersionSection>


              <VersionSection
                title="Experience"
              >
                <p>
                  {
                    selectedVersion.experience ||
                    "Not provided"
                  }
                </p>
              </VersionSection>


              <VersionSection
                title="What We Offer"
              >
                <BulletList
                  items={parseJsonArray(
                    selectedVersion.whatWeOffer
                  )}
                />
              </VersionSection>


              <VersionSection
                title="About the Company"
              >
                <p>
                  {
                    selectedVersion.companyDescription ||
                    "Not provided"
                  }
                </p>
              </VersionSection>


              <VersionSection
                title="Company Culture"
              >
                <p>
                  {
                    selectedVersion.companyCulture ||
                    "Not provided"
                  }
                </p>
              </VersionSection>


              <VersionSection
                title="Special Requirements"
              >
                <p>
                  {
                    selectedVersion.specialRequirements ||
                    "None"
                  }
                </p>
              </VersionSection>


              {/* RESTORE */}

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={closeViewer}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleRestore(
                      selectedVersion
                    )
                  }
                  disabled={
                    restoringVersion ===
                    selectedVersion.id
                  }
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500 disabled:opacity-50"
                >
                  {restoringVersion ===
                  selectedVersion.id
                    ? "Restoring..."
                    : `Restore Version ${
                        selectedVersion.versionNumber
                      }`}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}


// ======================================================
// VERSION SECTION
// ======================================================

function VersionSection({
  title,
  children,
}) {
  return (
    <div className="mb-6">

      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h4>

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
  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return (
      <p className="text-slate-500">
        Not provided
      </p>
    );
  }

  return (
    <ul className="space-y-2">

      {items.map(
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
  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return (
      <p className="text-slate-500">
        Not provided
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">

      {items.map(
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