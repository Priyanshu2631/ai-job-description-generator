import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const API_URL =
  "http://localhost:8080/api/job-descriptions";

function parseJsonArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function prepareJobDescription(data) {
  return {
    ...data,

    responsibilities:
      parseJsonArray(
        data.responsibilities
      ),

    requiredSkills:
      parseJsonArray(
        data.requiredSkills
      ),

    preferredSkills:
      parseJsonArray(
        data.preferredSkills
      ),

    whatWeOffer:
      parseJsonArray(
        data.whatWeOffer
      ),
  };
}

function App() {

  // --------------------------------------------------
  // FORM
  // --------------------------------------------------

  const [formData, setFormData] =
    useState({
      jobTitle: "",
      industry: "",
      experienceLevel: "Entry",
      skills: "",
      companyCulture: "Startup",
      specialRequirements: "",
    });


  const [step, setStep] =
    useState(1);


  // --------------------------------------------------
  // JOB DESCRIPTION
  // --------------------------------------------------

  const [
    jobDescription,
    setJobDescription,
  ] = useState(null);


  const [
    drafts,
    setDrafts,
  ] = useState([]);


  // --------------------------------------------------
  // UI STATES
  // --------------------------------------------------

  const [loading, setLoading] =
    useState(false);

  const [loadingDrafts, setLoadingDrafts] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [regenerating, setRegenerating] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [saved, setSaved] =
    useState(false);


  // --------------------------------------------------
  // VARIATIONS
  // --------------------------------------------------

  const [
    variations,
    setVariations,
  ] = useState([]);

  const [
    selectedVariation,
    setSelectedVariation,
  ] = useState(null);


  // --------------------------------------------------
  // FORM CHANGE
  // --------------------------------------------------

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    setSaved(false);
  };


  // --------------------------------------------------
  // GENERATE
  // --------------------------------------------------

  const handleGenerate = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);
    setSaved(false);

    try {

      const requestData = {
        jobTitle:
          formData.jobTitle,

        industry:
          formData.industry,

        experienceLevel:
          formData.experienceLevel,

        skills:
          formData.skills
            .split(",")
            .map(
              (skill) =>
                skill.trim()
            )
            .filter(
              (skill) =>
                skill !== ""
            ),

        companyCulture:
          formData.companyCulture,

        specialRequirements:
          formData.specialRequirements,
      };


      const response =
        await axios.post(
          `${API_URL}/generate`,
          requestData
        );


      const generated =
        prepareJobDescription(
          response.data
        );


      const standard =
        generated;


      const concise = {
        ...generated,

        aboutTheRole:
          `We are seeking a ${generated.jobTitle} to contribute to ${generated.industry} projects and deliver high-quality solutions.`,

        responsibilities:
          generated.responsibilities
            .slice(0, 5),

        whatWeOffer:
          generated.whatWeOffer
            .slice(0, 3),
      };


      const impactFocused = {
        ...generated,

        aboutTheRole:
          `Join our ${generated.industry} team as a ${generated.jobTitle} and help build scalable solutions that create measurable business and user impact.`,

        responsibilities:
          generated.responsibilities.map(
            (item) =>
              item.endsWith(".")
                ? item.replace(
                    ".",
                    " with measurable impact."
                  )
                : `${item} with measurable impact.`
          ),
      };


      const generatedVariations = [
        {
          name: "Standard",
          description:
            "Balanced and professional",
          data: standard,
        },

        {
          name: "Concise",
          description:
            "Shorter and direct",
          data: concise,
        },

        {
          name: "Impact-focused",
          description:
            "Emphasizes business impact",
          data: impactFocused,
        },
      ];


      setVariations(
        generatedVariations
      );

      setSelectedVariation(0);

      setJobDescription({
        ...standard,

        industry:
          formData.industry,

        experienceLevel:
          formData.experienceLevel,

        companyCulture:
          formData.companyCulture,

        specialRequirements:
          formData.specialRequirements,
      });


    } catch (error) {

      console.error(
        "Generation error:",
        error
      );

      alert(
        "Could not generate the job description."
      );

    } finally {

      setLoading(false);
    }
  };


  // --------------------------------------------------
  // SELECT VARIATION
  // --------------------------------------------------

  const selectVariation = (
    index
  ) => {

    const variation =
      variations[index];

    if (!variation) {
      return;
    }

    setSelectedVariation(
      index
    );

    setJobDescription({
      ...variation.data,

      id:
        jobDescription?.id,

      industry:
        formData.industry,

      experienceLevel:
        formData.experienceLevel,

      companyCulture:
        formData.companyCulture,

      specialRequirements:
        formData.specialRequirements,
    });

    setSaved(false);
  };


  // --------------------------------------------------
  // UPDATE JD
  // --------------------------------------------------

  const updateJobDescription = (
    field,
    value
  ) => {

    setJobDescription({
      ...jobDescription,
      [field]: value,
    });

    setSaved(false);
  };


  const updateListItem = (
    field,
    index,
    value
  ) => {

    const updated =
      [...jobDescription[field]];

    updated[index] = value;

    updateJobDescription(
      field,
      updated
    );
  };


  const addListItem = (
    field,
    value
  ) => {

    updateJobDescription(
      field,
      [
        ...jobDescription[field],
        value,
      ]
    );
  };


  const removeListItem = (
    field,
    index
  ) => {

    const updated =
      jobDescription[field].filter(
        (_, i) =>
          i !== index
      );

    updateJobDescription(
      field,
      updated
    );
  };


  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  const handleSave = async () => {

    if (!jobDescription) {
      return;
    }

    setSaving(true);
    setSaved(false);

    try {

      const payload = {
        id:
          jobDescription.id,

        jobTitle:
          jobDescription.jobTitle,

        industry:
          jobDescription.industry,

        experienceLevel:
          jobDescription.experienceLevel,

        aboutTheRole:
          jobDescription.aboutTheRole,

        responsibilities:
          JSON.stringify(
            jobDescription.responsibilities
          ),

        requiredSkills:
          JSON.stringify(
            jobDescription.requiredSkills
          ),

        preferredSkills:
          JSON.stringify(
            jobDescription.preferredSkills
          ),

        experience:
          jobDescription.experience,

        whatWeOffer:
          JSON.stringify(
            jobDescription.whatWeOffer
          ),

        companyDescription:
          jobDescription.companyDescription,

        companyCulture:
          jobDescription.companyCulture,

        specialRequirements:
          jobDescription.specialRequirements,
      };


      const response =
        await axios.post(
          `${API_URL}/save-edited`,
          payload
        );


      setJobDescription(
        prepareJobDescription(
          response.data
        )
      );


      setSaved(true);

      await loadDrafts();

    } catch (error) {

      console.error(
        "Save error:",
        error
      );

      alert(
        "Could not save the job description."
      );

    } finally {

      setSaving(false);
    }
  };


  // --------------------------------------------------
  // DRAFTS
  // --------------------------------------------------

  const loadDrafts = async () => {

    setLoadingDrafts(true);

    try {

      const response =
        await axios.get(
          API_URL
        );


      setDrafts(
        response.data.map(
          prepareJobDescription
        )
      );

    } catch (error) {

      console.error(
        "Draft loading error:",
        error
      );

      alert(
        "Could not load saved drafts."
      );

    } finally {

      setLoadingDrafts(false);
    }
  };


  const handleOpenDraft = (
    draft
  ) => {

    const prepared =
      prepareJobDescription(
        draft
      );


    setJobDescription(
      prepared
    );


    setFormData({
      jobTitle:
        prepared.jobTitle || "",

      industry:
        prepared.industry || "",

      experienceLevel:
        prepared.experienceLevel ||
        "Entry",

      skills:
        prepared.requiredSkills.join(
          ", "
        ),

      companyCulture:
        prepared.companyCulture ||
        "Startup",

      specialRequirements:
        prepared.specialRequirements ||
        "",
    });


    setStep(4);

    setSaved(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // --------------------------------------------------
  // REGENERATE
  // --------------------------------------------------

  const handleRegenerate =
    async () => {

      if (!jobDescription) {
        return;
      }

      setRegenerating(true);

      try {

        const requestData = {
          jobTitle:
            jobDescription.jobTitle,

          industry:
            jobDescription.industry,

          experienceLevel:
            jobDescription.experienceLevel,

          skills:
            jobDescription.requiredSkills,

          companyCulture:
            jobDescription.companyCulture,

          specialRequirements:
            jobDescription.specialRequirements,
        };


        const response =
          await axios.post(
            `${API_URL}/generate`,
            requestData
          );


        const generated =
          prepareJobDescription(
            response.data
          );


        setJobDescription({
          ...generated,

          id:
            jobDescription.id,

          industry:
            jobDescription.industry,

          experienceLevel:
            jobDescription.experienceLevel,

          companyCulture:
            jobDescription.companyCulture,

          specialRequirements:
            jobDescription.specialRequirements,
        });


        setSaved(false);

      } catch (error) {

        console.error(
          "Regeneration error:",
          error
        );

        alert(
          "Could not regenerate."
        );

      } finally {

        setRegenerating(false);
      }
    };


  // --------------------------------------------------
  // COPY
  // --------------------------------------------------

  const handleCopy = async () => {

    if (!jobDescription) {
      return;
    }


    const text = `
${jobDescription.jobTitle}

ABOUT THE ROLE
${jobDescription.aboutTheRole}

RESPONSIBILITIES
${jobDescription.responsibilities
  .map(
    (x) => `• ${x}`
  )
  .join("\n")}

REQUIRED SKILLS
${jobDescription.requiredSkills.join(
  ", "
)}

PREFERRED SKILLS
${jobDescription.preferredSkills.join(
  ", "
)}

EXPERIENCE
${jobDescription.experience}

WHAT WE OFFER
${jobDescription.whatWeOffer
  .map(
    (x) => `• ${x}`
  )
  .join("\n")}

ABOUT THE COMPANY
${jobDescription.companyDescription}

SPECIAL REQUIREMENTS
${jobDescription.specialRequirements || "None"}
`.trim();


    try {

      await navigator.clipboard.writeText(
        text
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        2000
      );

    } catch {

      alert(
        "Could not copy the job description."
      );
    }
  };


  // --------------------------------------------------
  // PDF
  // --------------------------------------------------

  const handleDownloadPDF =
    () => {

      if (!jobDescription) {
        return;
      }


      const doc =
        new jsPDF();


      const margin = 20;

      const width =
        doc.internal.pageSize.getWidth();


      let y = 20;


      const addText = (
        text,
        size = 11,
        bold = false
      ) => {

        doc.setFontSize(
          size
        );

        doc.setFont(
          "helvetica",
          bold
            ? "bold"
            : "normal"
        );


        const lines =
          doc.splitTextToSize(
            text,
            width -
              margin * 2
          );


        if (
          y +
            lines.length *
              7 >
          275
        ) {

          doc.addPage();

          y = 20;
        }


        doc.text(
          lines,
          margin,
          y
        );


        y +=
          lines.length * 7 +
          5;
      };


      addText(
        jobDescription.jobTitle,
        20,
        true
      );


      addText(
        `${jobDescription.industry} | ${jobDescription.experience}`,
        10
      );


      addText(
        "ABOUT THE ROLE",
        13,
        true
      );

      addText(
        jobDescription.aboutTheRole
      );


      addText(
        "RESPONSIBILITIES",
        13,
        true
      );


      jobDescription.responsibilities.forEach(
        (item) =>
          addText(
            `• ${item}`
          )
      );


      addText(
        "REQUIRED SKILLS",
        13,
        true
      );

      addText(
        jobDescription.requiredSkills.join(
          ", "
        )
      );


      addText(
        "PREFERRED SKILLS",
        13,
        true
      );

      addText(
        jobDescription.preferredSkills.join(
          ", "
        )
      );


      addText(
        "EXPERIENCE",
        13,
        true
      );

      addText(
        jobDescription.experience
      );


      addText(
        "WHAT WE OFFER",
        13,
        true
      );


      jobDescription.whatWeOffer.forEach(
        (item) =>
          addText(
            `• ${item}`
          )
      );


      addText(
        "ABOUT THE COMPANY",
        13,
        true
      );

      addText(
        jobDescription.companyDescription
      );


      if (
        jobDescription.specialRequirements
      ) {

        addText(
          "SPECIAL REQUIREMENTS",
          13,
          true
        );

        addText(
          jobDescription.specialRequirements
        );
      }


      const fileName =
        `${jobDescription.jobTitle.replace(
          /[^a-z0-9]/gi,
          "_"
        )}_JD.pdf`;


      doc.save(
        fileName
      );
    };


  // --------------------------------------------------
  // ATS ANALYSIS
  // --------------------------------------------------

  const calculateATS =
    () => {

      if (!jobDescription) {
        return {
          score: 0,
          matched: [],
          missing: [],
        };
      }


      const text = `
        ${jobDescription.jobTitle}
        ${jobDescription.aboutTheRole}
        ${jobDescription.responsibilities.join(" ")}
        ${jobDescription.requiredSkills.join(" ")}
        ${jobDescription.preferredSkills.join(" ")}
        ${jobDescription.experience}
        ${jobDescription.companyDescription}
      `.toLowerCase();


      const keywords =
        [
          ...jobDescription.requiredSkills,
          ...jobDescription.preferredSkills,
          jobDescription.industry,
          jobDescription.experienceLevel,
        ];


      const uniqueKeywords =
        [
          ...new Set(
            keywords
              .filter(Boolean)
              .map(
                (x) =>
                  x.toLowerCase()
              )
          ),
        ];


      const matched =
        uniqueKeywords.filter(
          (keyword) =>
            text.includes(keyword)
        );


      const missing =
        uniqueKeywords.filter(
          (keyword) =>
            !text.includes(keyword)
        );


      const score =
        uniqueKeywords.length === 0
          ? 0
          : Math.round(
              (matched.length /
                uniqueKeywords.length) *
                100
            );


      return {
        score,
        matched,
        missing,
      };
    };


  const ats =
    calculateATS();


  // --------------------------------------------------
  // STEP VALIDATION
  // --------------------------------------------------

  const nextStep = () => {

    if (step === 1) {

      if (
        !formData.jobTitle.trim() ||
        !formData.industry.trim()
      ) {

        alert(
          "Please enter the job title and industry."
        );

        return;
      }
    }


    if (step === 2) {

      if (
        !formData.skills.trim()
      ) {

        alert(
          "Please enter at least one key skill."
        );

        return;
      }
    }


    setStep(
      Math.min(
        step + 1,
        4
      )
    );
  };


  const previousStep = () => {

    setStep(
      Math.max(
        step - 1,
        1
      )
    );
  };


  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (

    <div className="min-h-screen bg-slate-950 text-white">


      {/* HEADER */}

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


          {/* LEFT */}

          <div className="space-y-8 lg:col-span-1">


            {/* MULTI STEP FORM */}

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">


              {/* STEP INDICATOR */}

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


              {/* STEP 1 */}

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
                      value={
                        formData.jobTitle
                      }
                      onChange={
                        handleChange
                      }
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
                      value={
                        formData.industry
                      }
                      onChange={
                        handleChange
                      }
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
                      value={
                        formData.experienceLevel
                      }
                      onChange={
                        handleChange
                      }
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


              {/* STEP 2 */}

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
                      value={
                        formData.skills
                      }
                      onChange={
                        handleChange
                      }
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
                      value={
                        formData.specialRequirements
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Good communication skills"
                      rows="4"
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-purple-500"
                    />

                  </div>

                </div>

              )}


              {/* STEP 3 */}

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
                      value={
                        formData.companyCulture
                      }
                      onChange={
                        handleChange
                      }
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
                      The generator will tailor the
                      description to the selected industry,
                      experience level and company culture.
                    </p>

                  </div>

                </div>

              )}


              {/* STEP 4 */}

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


              {/* NAVIGATION */}

              <div className="mt-7 flex gap-3">

                {step > 1 && (

                  <button
                    type="button"
                    onClick={
                      previousStep
                    }
                    className="flex-1 rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium hover:bg-slate-800"
                  >
                    ← Back
                  </button>

                )}


                {step < 4 ? (

                  <button
                    type="button"
                    onClick={
                      nextStep
                    }
                    className="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold hover:bg-purple-500"
                  >
                    Continue →
                  </button>

                ) : (

                  <button
                    type="button"
                    onClick={
                      handleGenerate
                    }
                    disabled={
                      loading
                    }
                    className="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold hover:bg-purple-500 disabled:opacity-50"
                  >
                    {loading
                      ? "Generating..."
                      : "✦ Generate JD"}
                  </button>

                )}

              </div>

            </section>


            {/* SAVED DRAFTS */}

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-7">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-semibold">
                    Saved Drafts
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Continue an existing JD.
                  </p>

                </div>


                <button
                  onClick={
                    loadDrafts
                  }
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
                >
                  {loadingDrafts
                    ? "Loading..."
                    : "↻ Refresh"}
                </button>

              </div>


              {drafts.length > 0 && (

                <div className="mt-5 space-y-3">

                  {drafts.map(
                    (draft) => (

                      <button
                        key={draft.id}
                        onClick={() =>
                          handleOpenDraft(
                            draft
                          )
                        }
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 p-4 text-left hover:border-purple-500"
                      >

                        <div className="flex justify-between">

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

                    )
                  )}

                </div>

              )}

            </section>

          </div>


          {/* RIGHT SIDE */}

          <section className="lg:col-span-2">


            {!jobDescription ? (

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


                {/* ACTIONS */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={
                        handleRegenerate
                      }
                      className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
                    >
                      {regenerating
                        ? "Regenerating..."
                        : "↻ Regenerate"}
                    </button>


                    <button
                      onClick={
                        handleCopy
                      }
                      className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
                    >
                      {copied
                        ? "✓ Copied"
                        : "📋 Copy"}
                    </button>


                    <button
                      onClick={
                        handleDownloadPDF
                      }
                      className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
                    >
                      ↓ PDF
                    </button>


                    <button
                      onClick={
                        handleSave
                      }
                      className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-500"
                    >
                      {saving
                        ? "Saving..."
                        : "💾 Save JD"}
                    </button>

                  </div>

                </div>


                {/* VARIATIONS */}

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
                            key={
                              variation.name
                            }
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


                {/* ATS */}

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


                  {ats.matched.length >
                    0 && (

                    <div className="mt-4">

                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                        Detected Keywords
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {ats.matched.map(
                          (keyword) => (

                            <span
                              key={
                                keyword
                              }
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


                {/* JD */}

                <div className="max-h-[850px] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-7">


                  {/* TITLE */}

                  <input
                    value={
                      jobDescription.jobTitle
                    }
                    onChange={(e) =>
                      updateJobDescription(
                        "jobTitle",
                        e.target.value
                      )
                    }
                    className="w-full border-b border-slate-700 bg-transparent pb-2 text-3xl font-bold outline-none focus:border-purple-500"
                  />


                  <p className="mt-2 text-sm text-purple-400">
                    {jobDescription.industry} •{" "}
                    {jobDescription.experience}
                  </p>


                  {/* ABOUT */}

                  <div className="mt-8">

                    <h4 className="mb-2 text-lg font-semibold">
                      About the Role
                    </h4>

                    <textarea
                      value={
                        jobDescription.aboutTheRole
                      }
                      onChange={(e) =>
                        updateJobDescription(
                          "aboutTheRole",
                          e.target.value
                        )
                      }
                      rows="5"
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 leading-7 text-slate-300 outline-none focus:border-purple-500"
                    />

                  </div>


                  {/* RESPONSIBILITIES */}

                  <div className="mt-8">

                    <div className="mb-3 flex justify-between">

                      <h4 className="text-lg font-semibold">
                        Responsibilities
                      </h4>

                      <button
                        onClick={() =>
                          addListItem(
                            "responsibilities",
                            "New responsibility"
                          )
                        }
                        className="text-sm text-purple-400"
                      >
                        + Add
                      </button>

                    </div>


                    <div className="space-y-3">

                      {jobDescription.responsibilities.map(
                        (item, index) => (

                          <div
                            key={index}
                            className="flex gap-2"
                          >

                            <textarea
                              value={item}
                              onChange={(e) =>
                                updateListItem(
                                  "responsibilities",
                                  index,
                                  e.target.value
                                )
                              }
                              rows="2"
                              className="flex-1 resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-slate-300 outline-none focus:border-purple-500"
                            />

                            <button
                              onClick={() =>
                                removeListItem(
                                  "responsibilities",
                                  index
                                )
                              }
                              className="text-red-400"
                            >
                              🗑
                            </button>

                          </div>

                        )
                      )}

                    </div>

                  </div>


                  {/* REQUIRED SKILLS */}

                  <div className="mt-8">

                    <div className="mb-3 flex justify-between">

                      <h4 className="text-lg font-semibold">
                        Required Skills
                      </h4>

                      <button
                        onClick={() =>
                          addListItem(
                            "requiredSkills",
                            "New skill"
                          )
                        }
                        className="text-sm text-purple-400"
                      >
                        + Add
                      </button>

                    </div>


                    <div className="space-y-2">

                      {jobDescription.requiredSkills.map(
                        (skill, index) => (

                          <div
                            key={index}
                            className="flex gap-2"
                          >

                            <input
                              value={skill}
                              onChange={(e) =>
                                updateListItem(
                                  "requiredSkills",
                                  index,
                                  e.target.value
                                )
                              }
                              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-purple-500"
                            />

                            <button
                              onClick={() =>
                                removeListItem(
                                  "requiredSkills",
                                  index
                                )
                              }
                              className="text-red-400"
                            >
                              🗑
                            </button>

                          </div>

                        )
                      )}

                    </div>

                  </div>


                  {/* PREFERRED */}

                  <div className="mt-8">

                    <div className="mb-3 flex justify-between">

                      <h4 className="text-lg font-semibold">
                        Preferred Skills
                      </h4>

                      <button
                        onClick={() =>
                          addListItem(
                            "preferredSkills",
                            "New skill"
                          )
                        }
                        className="text-sm text-purple-400"
                      >
                        + Add
                      </button>

                    </div>


                    <div className="space-y-2">

                      {jobDescription.preferredSkills.map(
                        (skill, index) => (

                          <div
                            key={index}
                            className="flex gap-2"
                          >

                            <input
                              value={skill}
                              onChange={(e) =>
                                updateListItem(
                                  "preferredSkills",
                                  index,
                                  e.target.value
                                )
                              }
                              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-purple-500"
                            />

                            <button
                              onClick={() =>
                                removeListItem(
                                  "preferredSkills",
                                  index
                                )
                              }
                              className="text-red-400"
                            >
                              🗑
                            </button>

                          </div>

                        )
                      )}

                    </div>

                  </div>


                  {/* EXPERIENCE */}

                  <div className="mt-8">

                    <h4 className="mb-2 text-lg font-semibold">
                      Experience
                    </h4>

                    <textarea
                      value={
                        jobDescription.experience
                      }
                      onChange={(e) =>
                        updateJobDescription(
                          "experience",
                          e.target.value
                        )
                      }
                      rows="2"
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-300 outline-none focus:border-purple-500"
                    />

                  </div>


                  {/* BENEFITS */}

                  <div className="mt-8">

                    <div className="mb-3 flex justify-between">

                      <h4 className="text-lg font-semibold">
                        What We Offer
                      </h4>

                      <button
                        onClick={() =>
                          addListItem(
                            "whatWeOffer",
                            "New benefit"
                          )
                        }
                        className="text-sm text-purple-400"
                      >
                        + Add
                      </button>

                    </div>


                    <div className="space-y-3">

                      {jobDescription.whatWeOffer.map(
                        (item, index) => (

                          <div
                            key={index}
                            className="flex gap-2"
                          >

                            <textarea
                              value={item}
                              onChange={(e) =>
                                updateListItem(
                                  "whatWeOffer",
                                  index,
                                  e.target.value
                                )
                              }
                              rows="2"
                              className="flex-1 resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm outline-none focus:border-purple-500"
                            />

                            <button
                              onClick={() =>
                                removeListItem(
                                  "whatWeOffer",
                                  index
                                )
                              }
                              className="text-red-400"
                            >
                              🗑
                            </button>

                          </div>

                        )
                      )}

                    </div>

                  </div>


                  {/* COMPANY */}

                  <div className="mt-8">

                    <h4 className="mb-2 text-lg font-semibold">
                      About the Company
                    </h4>

                    <textarea
                      value={
                        jobDescription.companyDescription
                      }
                      onChange={(e) =>
                        updateJobDescription(
                          "companyDescription",
                          e.target.value
                        )
                      }
                      rows="4"
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 leading-7 text-slate-300 outline-none focus:border-purple-500"
                    />

                  </div>


                  {/* SPECIAL */}

                  <div className="mt-8">

                    <h4 className="mb-2 text-lg font-semibold">
                      Special Requirements
                    </h4>

                    <textarea
                      value={
                        jobDescription.specialRequirements ||
                        ""
                      }
                      onChange={(e) =>
                        updateJobDescription(
                          "specialRequirements",
                          e.target.value
                        )
                      }
                      rows="3"
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-300 outline-none focus:border-purple-500"
                    />

                  </div>


                  {saved && (

                    <div className="mt-6 rounded-lg border border-green-800 bg-green-950/30 px-4 py-3 text-sm text-green-400">
                      ✓ Job description saved successfully.
                    </div>

                  )}

                </div>

              </div>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}

export default App;