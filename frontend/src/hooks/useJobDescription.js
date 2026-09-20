import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const API_URL =
  "http://localhost:8080/api/job-descriptions";

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function parseJsonArray(value) {
  if (Array.isArray(value)) {
    return value.filter(
      (item) =>
        item !== null &&
        item !== undefined
    );
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
      ? parsed.filter(
          (item) =>
            item !== null &&
            item !== undefined
        )
      : [];
  } catch (error) {
    console.error(
      "Could not parse JD list field:",
      value,
      error
    );

    return [];
  }
}


function prepareJobDescription(data) {
  if (!data) {
    return {
      id: null,
      jobTitle: "",
      industry: "",
      experienceLevel: "Entry",
      aboutTheRole: "",
      responsibilities: [],
      requiredSkills: [],
      preferredSkills: [],
      experience: "",
      whatWeOffer: [],
      companyDescription: "",
      companyCulture: "Startup",
      specialRequirements: "",
    };
  }

  return {
    ...data,

    id:
      data.id ?? null,

    jobTitle:
      data.jobTitle ?? "",

    industry:
      data.industry ?? "",

    experienceLevel:
      data.experienceLevel ?? "Entry",

    aboutTheRole:
      data.aboutTheRole ?? "",

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

    experience:
      data.experience ?? "",

    whatWeOffer:
      parseJsonArray(
        data.whatWeOffer
      ),

    companyDescription:
      data.companyDescription ?? "",

    companyCulture:
      data.companyCulture ??
      "Startup",

    specialRequirements:
      data.specialRequirements ??
      "",
  };
}


// --------------------------------------------------
// ERROR MESSAGE HELPER
// --------------------------------------------------

function getServerErrorMessage(
  error,
  fallback
) {
  const data =
    error?.response?.data;

  if (
    data &&
    typeof data === "object" &&
    data.message
  ) {
    return data.message;
  }

  if (
    data &&
    typeof data === "object" &&
    data.error
  ) {
    return data.error;
  }

  if (
    typeof data === "string" &&
    data.trim()
  ) {
    return data;
  }

  return (
    error?.message ||
    fallback
  );
}


// --------------------------------------------------
// ATS HELPERS
// --------------------------------------------------

function normalizeKeyword(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s+#.-]/g, "")
    .replace(/\s+/g, " ");
}


function tokenize(value) {
  return (
    normalizeKeyword(value).match(
      /[a-z0-9+#.-]+/g
    ) ?? []
  );
}


function uniqueKeywords(items) {
  return [
    ...new Set(
      items
        .map(normalizeKeyword)
        .filter(Boolean)
    ),
  ];
}


function keywordExists(
  text,
  keyword
) {
  const textTokens =
    tokenize(text);

  const keywordTokens =
    tokenize(keyword);

  if (
    !textTokens.length ||
    !keywordTokens.length
  ) {
    return false;
  }

  for (
    let i = 0;
    i <=
      textTokens.length -
        keywordTokens.length;
    i++
  ) {
    let matches = true;

    for (
      let j = 0;
      j < keywordTokens.length;
      j++
    ) {
      if (
        textTokens[i + j] !==
        keywordTokens[j]
      ) {
        matches = false;
        break;
      }
    }

    if (matches) {
      return true;
    }
  }

  return false;
}


// --------------------------------------------------
// HOOK
// --------------------------------------------------

export default function useJobDescription() {

  // --------------------------------------------------
  // FORM STATE
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
  // JOB DESCRIPTION STATE
  // --------------------------------------------------

  const [
    jobDescription,
    setJobDescription,
  ] = useState(null);


  // --------------------------------------------------
  // DRAFT STATE
  // --------------------------------------------------

  const [
    drafts,
    setDrafts,
  ] = useState([]);

  const [
    draftSearch,
    setDraftSearch,
  ] = useState("");

  const [
    draftIndustry,
    setDraftIndustry,
  ] = useState("All");


  // --------------------------------------------------
  // LOADING / ACTION STATE
  // --------------------------------------------------

  const [loading, setLoading] =
    useState(false);

  const [
    loadingDrafts,
    setLoadingDrafts,
  ] = useState(false);

  const [saving, setSaving] =
    useState(false);

  const [
    regenerating,
    setRegenerating,
  ] = useState(false);

  const [copied, setCopied] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [
    duplicating,
    setDuplicating,
  ] = useState(false);


  // --------------------------------------------------
  // AI ANALYSIS
  // --------------------------------------------------

  const [analysis, setAnalysis] =
    useState(null);

  const [
    analyzing,
    setAnalyzing,
  ] = useState(false);


  // --------------------------------------------------
  // AI OPTIMIZATION
  // --------------------------------------------------

  const [
    optimizing,
    setOptimizing,
  ] = useState(false);

  const [
    optimization,
    setOptimization,
  ] = useState(null);


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
    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setSaved(false);
  };


  // --------------------------------------------------
  // GENERATE WITH AI
  // --------------------------------------------------

  const handleGenerate =
    async (e) => {

      e.preventDefault();

      setLoading(true);
      setSaved(false);
      setAnalysis(null);
      setOptimization(null);

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

        /*
         * IMPORTANT:
         * Use the Gemini-backed endpoint.
         */
        const response =
          await axios.post(
            `${API_URL}/generate-ai`,
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
            generated.aboutTheRole,

          responsibilities:
            generated.responsibilities.slice(
              0,
              5
            ),

          whatWeOffer:
            generated.whatWeOffer.slice(
              0,
              3
            ),
        };

        const impactFocused = {
          ...generated,

          aboutTheRole:
            generated.aboutTheRole,

          responsibilities:
            generated.responsibilities.map(
              (item) =>
                item
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
            name:
              "Impact-focused",
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
          "AI generation error:",
          error
        );

        console.error(
          "Generation status:",
          error.response?.status
        );

        console.error(
          "Generation response:",
          error.response?.data
        );

        const serverMessage =
          getServerErrorMessage(
            error,
            "Could not generate the job description."
          );

        alert(
          `Could not generate the job description.\n\n${serverMessage}`
        );

      } finally {

        setLoading(false);
      }
    };


  // --------------------------------------------------
  // SELECT VARIATION
  // --------------------------------------------------

  const selectVariation =
    (index) => {

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
      setAnalysis(null);
      setOptimization(null);
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
    setAnalysis(null);
    setOptimization(null);
  };


  const updateListItem = (
    field,
    index,
    value
  ) => {

    const currentList =
      Array.isArray(
        jobDescription?.[field]
      )
        ? jobDescription[field]
        : [];

    const updated =
      [...currentList];

    updated[index] =
      value;

    updateJobDescription(
      field,
      updated
    );
  };


  const addListItem = (
    field,
    value
  ) => {

    const currentList =
      Array.isArray(
        jobDescription?.[field]
      )
        ? jobDescription[field]
        : [];

    updateJobDescription(
      field,
      [
        ...currentList,
        value,
      ]
    );
  };


  const removeListItem = (
    field,
    index
  ) => {

    const currentList =
      Array.isArray(
        jobDescription?.[field]
      )
        ? jobDescription[field]
        : [];

    const updated =
      currentList.filter(
        (_, i) =>
          i !== index
      );

    updateJobDescription(
      field,
      updated
    );
  };


  // --------------------------------------------------
  // LOAD DRAFTS
  // --------------------------------------------------

  const loadDrafts =
    async () => {

      setLoadingDrafts(true);

      try {

        const response =
          await axios.get(
            API_URL
          );

        const preparedDrafts =
          Array.isArray(
            response.data
          )
            ? response.data.map(
                prepareJobDescription
              )
            : [];

        setDrafts(
          preparedDrafts
        );

      } catch (error) {

        console.error(
          "Draft loading error:",
          error
        );

        alert(
          getServerErrorMessage(
            error,
            "Could not load saved drafts."
          )
        );

      } finally {

        setLoadingDrafts(false);
      }
    };


  // --------------------------------------------------
  // OPEN EXISTING DRAFT
  // --------------------------------------------------

  const handleOpenDraft = (
    draft
  ) => {

    try {

      const prepared =
        prepareJobDescription(
          draft
        );

      setJobDescription(
        prepared
      );

      setFormData({
        jobTitle:
          prepared.jobTitle,

        industry:
          prepared.industry,

        experienceLevel:
          prepared.experienceLevel,

        skills:
          prepared.requiredSkills.join(
            ", "
          ),

        companyCulture:
          prepared.companyCulture,

        specialRequirements:
          prepared.specialRequirements,
      });

      setStep(4);

      setSaved(false);
      setAnalysis(null);
      setOptimization(null);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error) {

      console.error(
        "Open draft error:",
        error
      );

      alert(
        "Could not open this saved job description. Check the browser console for details."
      );
    }
  };


  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  const handleSave =
    async () => {

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
              Array.isArray(
                jobDescription.responsibilities
              )
                ? jobDescription.responsibilities
                : []
            ),

          requiredSkills:
            JSON.stringify(
              Array.isArray(
                jobDescription.requiredSkills
              )
                ? jobDescription.requiredSkills
                : []
            ),

          preferredSkills:
            JSON.stringify(
              Array.isArray(
                jobDescription.preferredSkills
              )
                ? jobDescription.preferredSkills
                : []
            ),

          experience:
            jobDescription.experience,

          whatWeOffer:
            JSON.stringify(
              Array.isArray(
                jobDescription.whatWeOffer
              )
                ? jobDescription.whatWeOffer
                : []
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
          getServerErrorMessage(
            error,
            "Could not save the job description."
          )
        );

      } finally {

        setSaving(false);
      }
    };


  // --------------------------------------------------
  // DELETE DRAFT
  // --------------------------------------------------

  const handleDeleteDraft =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this job description?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await axios.delete(
          `${API_URL}/${id}`
        );

        setDrafts(
          (currentDrafts) =>
            currentDrafts.filter(
              (draft) =>
                draft.id !== id
            )
        );

        if (
          jobDescription?.id ===
          id
        ) {

          setJobDescription(null);
          setSaved(false);
          setAnalysis(null);
          setOptimization(null);
          setStep(1);
        }

      } catch (error) {

        console.error(
          "Delete error:",
          error
        );

        alert(
          getServerErrorMessage(
            error,
            "Could not delete the job description."
          )
        );
      }
    };


  // --------------------------------------------------
  // DUPLICATE DRAFT
  // --------------------------------------------------

  const handleDuplicateDraft =
    async (id) => {

      if (!id) {
        return;
      }

      const confirmed =
        window.confirm(
          "Create a duplicate of this job description?"
        );

      if (!confirmed) {
        return;
      }

      setDuplicating(true);

      try {

        const response =
          await axios.post(
            `${API_URL}/${id}/duplicate`
          );

        const duplicated =
          prepareJobDescription(
            response.data
          );

        setJobDescription(
          duplicated
        );

        setFormData({
          jobTitle:
            duplicated.jobTitle,

          industry:
            duplicated.industry,

          experienceLevel:
            duplicated.experienceLevel,

          skills:
            duplicated.requiredSkills.join(
              ", "
            ),

          companyCulture:
            duplicated.companyCulture,

          specialRequirements:
            duplicated.specialRequirements,
        });

        setStep(4);

        setSaved(false);
        setAnalysis(null);
        setOptimization(null);

        await loadDrafts();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      } catch (error) {

        console.error(
          "Duplicate error:",
          error
        );

        alert(
          getServerErrorMessage(
            error,
            "Could not duplicate the job description."
          )
        );

      } finally {

        setDuplicating(false);
      }
    };


  // --------------------------------------------------
  // REGENERATE WITH AI
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
            Array.isArray(
              jobDescription.requiredSkills
            )
              ? jobDescription.requiredSkills
              : [],

          companyCulture:
            jobDescription.companyCulture,

          specialRequirements:
            jobDescription.specialRequirements,
        };

        /*
         * IMPORTANT:
         * Regeneration also uses Gemini.
         */
        const response =
          await axios.post(
            `${API_URL}/generate-ai`,
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
        setAnalysis(null);
        setOptimization(null);

      } catch (error) {

        console.error(
          "AI regeneration error:",
          error
        );

        console.error(
          "Regeneration status:",
          error.response?.status
        );

        console.error(
          "Regeneration response:",
          error.response?.data
        );

        const serverMessage =
          getServerErrorMessage(
            error,
            "Could not regenerate the job description."
          );

        alert(
          `Could not regenerate the job description.\n\n${serverMessage}`
        );

      } finally {

        setRegenerating(false);
      }
    };


  // --------------------------------------------------
  // AI ANALYSIS
  // --------------------------------------------------

  const handleAnalyze =
    async () => {

      if (!jobDescription?.id) {

        alert(
          "Save the job description before analyzing it."
        );

        return;
      }

      setAnalyzing(true);

      try {

        const response =
          await axios.post(
            `${API_URL}/${jobDescription.id}/analyze`
          );

        setAnalysis(
          response.data
        );

      } catch (error) {

        console.error(
          "Analysis error:",
          error
        );

        console.error(
          "Analysis status:",
          error.response?.status
        );

        console.error(
          "Analysis response:",
          error.response?.data
        );

        const serverMessage =
          getServerErrorMessage(
            error,
            "Could not analyze the job description."
          );

        alert(
          `Could not analyze the job description.\n\n${serverMessage}`
        );

      } finally {

        setAnalyzing(false);
      }
    };


  // --------------------------------------------------
  // AI OPTIMIZATION
  // --------------------------------------------------

  const handleOptimize =
    async () => {

      if (!jobDescription?.id) {

        alert(
          "Save the job description before optimizing it."
        );

        return;
      }

      setOptimizing(true);
      setOptimization(null);

      try {

        const response =
          await axios.post(
            `${API_URL}/${jobDescription.id}/optimize`
          );

        setOptimization(
          response.data
        );

      } catch (error) {

        console.error(
          "Optimization error:",
          error
        );

        console.error(
          "Optimization status:",
          error.response?.status
        );

        console.error(
          "Optimization response:",
          error.response?.data
        );

        const serverMessage =
          getServerErrorMessage(
            error,
            "Could not optimize the job description."
          );

        alert(
          `Could not optimize the job description.\n\n${serverMessage}`
        );

      } finally {

        setOptimizing(false);
      }
    };


  // --------------------------------------------------
  // APPLY AI OPTIMIZATION
  // --------------------------------------------------

  const handleApplyOptimization =
    () => {

      if (
        !optimization ||
        !jobDescription
      ) {
        return;
      }

      setJobDescription({
        ...jobDescription,

        aboutTheRole:
          optimization.optimizedAboutTheRole ??
          jobDescription.aboutTheRole,

        responsibilities:
          Array.isArray(
            optimization.optimizedResponsibilities
          )
            ? optimization.optimizedResponsibilities
            : jobDescription.responsibilities,

        requiredSkills:
          Array.isArray(
            optimization.optimizedRequiredSkills
          )
            ? optimization.optimizedRequiredSkills
            : jobDescription.requiredSkills,

        preferredSkills:
          Array.isArray(
            optimization.optimizedPreferredSkills
          )
            ? optimization.optimizedPreferredSkills
            : jobDescription.preferredSkills,

        experience:
          optimization.optimizedExperience ??
          jobDescription.experience,

        whatWeOffer:
          Array.isArray(
            optimization.optimizedWhatWeOffer
          )
            ? optimization.optimizedWhatWeOffer
            : jobDescription.whatWeOffer,

        companyDescription:
          optimization.optimizedCompanyDescription ??
          jobDescription.companyDescription,
      });

      setOptimization(null);
      setAnalysis(null);
      setSaved(false);
    };


  // --------------------------------------------------
  // COPY
  // --------------------------------------------------

  const handleCopy =
    async () => {

      if (!jobDescription) {
        return;
      }

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

      const text = `
${jobDescription.jobTitle}

ABOUT THE ROLE
${jobDescription.aboutTheRole}

RESPONSIBILITIES
${responsibilities
  .map(
    (item) =>
      `• ${item}`
  )
  .join("\n")}

REQUIRED SKILLS
${requiredSkills.join(", ")}

PREFERRED SKILLS
${preferredSkills.join(", ")}

EXPERIENCE
${jobDescription.experience}

WHAT WE OFFER
${whatWeOffer
  .map(
    (item) =>
      `• ${item}`
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
          () =>
            setCopied(false),
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

      const doc =
        new jsPDF();

      const margin = 20;

      const width =
        doc.internal.pageSize
          .getWidth();

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

        const safeText =
          String(
            text ?? ""
          );

        const lines =
          doc.splitTextToSize(
            safeText,
            width -
              margin * 2
          );

        if (
          y +
            lines.length * 7 >
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

      responsibilities.forEach(
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
        requiredSkills.join(
          ", "
        )
      );

      addText(
        "PREFERRED SKILLS",
        13,
        true
      );

      addText(
        preferredSkills.join(
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

      whatWeOffer.forEach(
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
        `${(
          jobDescription.jobTitle ||
          "job_description"
        ).replace(
          /[^a-z0-9]/gi,
          "_"
        )}_JD.pdf`;

      doc.save(
        fileName
      );
    };


  // --------------------------------------------------
  // ATS
  // --------------------------------------------------

  const calculateATS =
    () => {

      if (!jobDescription) {
        return {
          score: 0,
          requiredCoverage: 0,
          preferredCoverage: 0,
          roleCoverage: 0,
          matched: [],
          missing: [],
          requiredMatched: [],
          requiredMissing: [],
          preferredMatched: [],
          preferredMissing: [],
          roleMatched: [],
          roleMissing: [],
          suggestions: [],
        };
      }

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

      /*
       * Do not include skill lists themselves
       * in searchable text.
       *
       * Otherwise every skill would automatically
       * be detected as present.
       */
      const searchableText = `
        ${jobDescription.jobTitle || ""}
        ${jobDescription.aboutTheRole || ""}
        ${responsibilities.join(" ")}
        ${jobDescription.experience || ""}
        ${jobDescription.whatWeOffer?.join(" ") || ""}
        ${jobDescription.companyDescription || ""}
        ${jobDescription.companyCulture || ""}
        ${jobDescription.specialRequirements || ""}
      `;

      // --------------------------------------------------
      // REQUIRED SKILLS
      // --------------------------------------------------

      const uniqueRequired =
        uniqueKeywords(
          requiredSkills
        );

      const requiredMatched =
        uniqueRequired.filter(
          (keyword) =>
            keywordExists(
              searchableText,
              keyword
            )
        );

      const requiredMissing =
        uniqueRequired.filter(
          (keyword) =>
            !keywordExists(
              searchableText,
              keyword
            )
        );

      const requiredCoverage =
        uniqueRequired.length === 0
          ? 100
          : Math.round(
              (
                requiredMatched.length /
                uniqueRequired.length
              ) *
              100
            );


      // --------------------------------------------------
      // PREFERRED SKILLS
      // --------------------------------------------------

      const uniquePreferred =
        uniqueKeywords(
          preferredSkills
        );

      const preferredMatched =
        uniquePreferred.filter(
          (keyword) =>
            keywordExists(
              searchableText,
              keyword
            )
        );

      const preferredMissing =
        uniquePreferred.filter(
          (keyword) =>
            !keywordExists(
              searchableText,
              keyword
            )
        );

      const preferredCoverage =
        uniquePreferred.length === 0
          ? 100
          : Math.round(
              (
                preferredMatched.length /
                uniquePreferred.length
              ) *
              100
            );


      // --------------------------------------------------
      // ROLE KEYWORDS
      // --------------------------------------------------

      const roleKeywords =
        uniqueKeywords([
          jobDescription.industry,
          jobDescription.experienceLevel,
          jobDescription.jobTitle,
        ]);

      const roleMatched =
        roleKeywords.filter(
          (keyword) =>
            keywordExists(
              searchableText,
              keyword
            )
        );

      const roleMissing =
        roleKeywords.filter(
          (keyword) =>
            !keywordExists(
              searchableText,
              keyword
            )
        );

      const roleCoverage =
        roleKeywords.length === 0
          ? 100
          : Math.round(
              (
                roleMatched.length /
                roleKeywords.length
              ) *
              100
            );


      // --------------------------------------------------
      // OVERALL SCORE
      // --------------------------------------------------

      const score =
        Math.round(
          requiredCoverage * 0.6 +
          preferredCoverage * 0.2 +
          roleCoverage * 0.2
        );


      // --------------------------------------------------
      // MATCHED / MISSING
      // --------------------------------------------------

      const matched =
        uniqueKeywords([
          ...requiredMatched,
          ...preferredMatched,
          ...roleMatched,
        ]);

      const missing =
        uniqueKeywords([
          ...requiredMissing,
          ...preferredMissing,
          ...roleMissing,
        ]);


      // --------------------------------------------------
      // SUGGESTIONS
      // --------------------------------------------------

      const suggestions = [];

      if (
        requiredMissing.length > 0
      ) {

        suggestions.push(
          `Consider mentioning ${requiredMissing
            .slice(0, 3)
            .join(", ")} naturally in the role description or responsibilities if relevant.`
        );
      }

      if (
        preferredMissing.length > 0
      ) {

        suggestions.push(
          `Consider adding relevant preferred skills such as ${preferredMissing
            .slice(0, 3)
            .join(", ")} where appropriate.`
        );
      }

      if (
        roleMissing.length > 0
      ) {

        suggestions.push(
          `Consider making the role context clearer by naturally mentioning ${roleMissing
            .slice(0, 3)
            .join(", ")} where relevant.`
        );
      }

      if (
        responsibilities.length < 3
      ) {

        suggestions.push(
          "Add more specific responsibilities to improve role clarity and keyword coverage."
        );
      }

      if (
        !jobDescription.aboutTheRole ||
        jobDescription.aboutTheRole
          .trim()
          .length < 80
      ) {

        suggestions.push(
          "Expand the About the Role section to clearly explain the purpose and scope of the position."
        );
      }

      if (
        !jobDescription.experience ||
        jobDescription.experience
          .trim()
          .length < 20
      ) {

        suggestions.push(
          "Provide clearer experience requirements for better candidate targeting."
        );
      }

      if (
        !jobDescription.companyDescription ||
        jobDescription.companyDescription
          .trim()
          .length < 30
      ) {

        suggestions.push(
          "Add a concise company description to provide context for candidates."
        );
      }

      if (
        suggestions.length === 0
      ) {

        suggestions.push(
          "The job description has good keyword coverage and structure."
        );
      }

      return {
        score,

        requiredCoverage,

        preferredCoverage,

        roleCoverage,

        matched,

        missing,

        requiredMatched,

        requiredMissing,

        preferredMatched,

        preferredMissing,

        roleMatched,

        roleMissing,

        suggestions,
      };
    };


  const ats =
    calculateATS();


  // --------------------------------------------------
  // STEP NAVIGATION
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
  // FILTERED DRAFTS
  // --------------------------------------------------

  const filteredDrafts =
    drafts.filter(
      (draft) => {

        const search =
          draftSearch
            .trim()
            .toLowerCase();

        const matchesSearch =
          !search ||
          (draft.jobTitle || "")
            .toLowerCase()
            .includes(search) ||
          (draft.industry || "")
            .toLowerCase()
            .includes(search);

        const matchesIndustry =
          draftIndustry ===
            "All" ||
          draft.industry ===
            draftIndustry;

        return (
          matchesSearch &&
          matchesIndustry
        );
      }
    );


  const draftIndustries = [
    "All",

    ...Array.from(
      new Set(
        drafts
          .map(
            (draft) =>
              draft.industry
          )
          .filter(Boolean)
      )
    ),
  ];


  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return {

    formData,

    step,

    jobDescription,

    drafts,

    draftSearch,

    draftIndustry,

    loading,

    loadingDrafts,

    saving,

    regenerating,

    duplicating,

    copied,

    saved,

    analysis,

    analyzing,

    optimizing,

    optimization,

    variations,

    selectedVariation,

    ats,

    filteredDrafts,

    draftIndustries,

    setDraftSearch,

    setDraftIndustry,

    setOptimization,

    handleChange,

    handleGenerate,

    selectVariation,

    updateJobDescription,

    updateListItem,

    addListItem,

    removeListItem,

    handleSave,

    handleDeleteDraft,

    handleDuplicateDraft,

    loadDrafts,

    handleOpenDraft,

    handleRegenerate,

    handleAnalyze,

    handleOptimize,

    handleApplyOptimization,

    handleCopy,

    handleDownloadPDF,

    nextStep,

    previousStep,
  };
}