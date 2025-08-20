// models/Student.js
// Comprehensive Mongoose model for a Training & Placement (TNP) portal
// Covers: personal info, academics, skills, certifications, links, experience, projects,
// documents, preferences, applications, and platform flags.
// NOTE: Never store plaintext passwords. Use passwordHash and salt via bcrypt/argon2 at the service layer.

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema, Types } = mongoose;

// ---------- Reusable sub-schemas ----------
const NameSchema = new Schema(
  {
    first: { type: String, trim: true, required: true },
    middle: { type: String, trim: true },
    last: { type: String, trim: true, required: true },
    preferred: { type: String, trim: true },
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true, default: "India" },
    postalCode: { type: String, trim: true },
  },
  { _id: false }
);

const LinkSchema = new Schema(
  {
    label: { type: String, trim: true },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => !v || /^https?:\/\//i.test(v),
        message: "Links must start with http(s)://",
      },
    },
  },
  { _id: false }
);

const CvVersionSchema = new Schema(
  {
    label: { type: String, trim: true, default: "Default" },
    url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => /^https?:\/\//i.test(v),
        message: "CV link must start with http(s)://",
      },
    },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const CertificationSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, trim: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    credentialId: { type: String, trim: true },
    credentialUrl: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => !v || /^https?:\/\//i.test(v),
        message: "Invalid URL",
      },
    },
    description: { type: String, trim: true },
  },
  { _id: true }
);

const SkillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "beginner",
    },
    keywords: [{ type: String, trim: true }],
    years: { type: Number, min: 0 },
  },
  { _id: true }
);

const BacklogDetailSchema = new Schema(
  {
    subject: { type: String, trim: true },
    semester: { type: String, trim: true },
    status: { type: String, enum: ["active", "cleared"], default: "active" },
    notes: { type: String, trim: true },
  },
  { _id: true }
);

const ExperienceSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["internship", "full-time", "part-time", "freelance", "volunteer"],
      default: "internship",
    },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    location: { type: String, trim: true },
    description: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
    achievements: [{ type: String, trim: true }],
  },
  { _id: true }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String, trim: true },
    repoUrl: { type: String, trim: true },
    demoUrl: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
    highlights: [{ type: String, trim: true }],
  },
  { _id: true }
);

const EducationUnitSchema = new Schema(
  {
    level: {
      type: String,
      enum: ["10th", "12th", "Diploma", "UG", "PG", "PhD"],
      required: true,
    },
    boardOrUniversity: { type: String, trim: true },
    institute: { type: String, trim: true },
    yearOfPassing: { type: Number, min: 1900, max: 9999 },
    cgpa: { type: Number, min: 0, max: 10 },
    percentage: { type: Number, min: 0, max: 100 },
    specialization: { type: String, trim: true },
  },
  { _id: true }
);

const EntranceExamSchema = new Schema(
  {
    exam: { type: String, trim: true },
    score: { type: Number },
    percentile: { type: Number, min: 0, max: 100 },
    rank: { type: Number },
    date: { type: Date },
  },
  { _id: true }
);

const ApplicationSchema = new Schema(
  {
    job: { type: Types.ObjectId, ref: "Job", required: true },
    status: {
      type: String,
      enum: [
        "draft",
        "applied",
        "under-review",
        "shortlisted",
        "online-test",
        "gd",
        "technical-interview",
        "hr-interview",
        "offered",
        "accepted",
        "rejected",
        "withdrawn",
      ],
      default: "applied",
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { _id: true }
);

// ---------- Main Student schema ----------
const StudentSchema = new Schema(
  {
    regNo: { type: String, required: true, trim: true, unique: true, index: true },
    rollNo: { type: String, trim: true },

    // Personal
    name: { type: NameSchema, required: true },
    email: {
      college: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /.+@.+\..+/,
        unique: true,
      },
      personal: { type: String, lowercase: true, trim: true, match: /.+@.+\..+/ },
    },
    phone: {
      countryCode: { type: String, default: "+91" },
      number: { type: String, trim: true },
    },
    dob: { type: Date },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer-not-to-say"],
    },
    category: {
      type: String,
      enum: ["GEN", "OBC", "SC", "ST", "EWS", "Other"],
      default: "GEN",
    },
    address: AddressSchema,
    photoUrl: { type: String, trim: true },

    // 🔐 Auth
    passwordHash: { type: String, select: false },
    lastLoginAt: { type: Date },

    // Academics
    course: { type: String, required: true, trim: true },
    dept: { type: String, required: true, trim: true },
    specialization: { type: String, trim: true },
    semester: { type: Number, min: 1, max: 12 },
    graduationYear: { type: Number, min: 1900, max: 9999, index: true },
    cgpa: {
      current: { type: Number, min: 0, max: 10 },
      outOf: { type: Number, default: 10 },
      scale: { type: String, enum: ["10", "4"], default: "10" },
    },
    backlogs: {
      activeCount: { type: Number, default: 0, min: 0 },
      historyCount: { type: Number, default: 0, min: 0 },
      details: [BacklogDetailSchema],
    },

    education: [EducationUnitSchema],
    exams: [EntranceExamSchema],

    skills: [SkillSchema],
    achievements: [
      new Schema(
        {
          title: { type: String, required: true, trim: true },
          issuer: { type: String, trim: true },
          date: { type: Date },
          description: { type: String, trim: true },
        },
        { _id: true }
      ),
    ],

    experiences: [ExperienceSchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],

    links: {
      cvPrimary: {
        type: String,
        trim: true,
        validate: {
          validator: (v) => !v || /^https?:\/\//i.test(v),
          message: "Invalid URL",
        },
      },
      portfolio: { type: String, trim: true },
      github: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      leetcode: { type: String, trim: true },
      hackerrank: { type: String, trim: true },
      website: { type: String, trim: true },
      others: [LinkSchema],
    },
    cvVersions: [CvVersionSchema],
    documents: {
      transcripts: [LinkSchema],
      offerLetters: [LinkSchema],
      otherDocs: [LinkSchema],
    },

    preferences: {
      jobTypes: {
        type: [String],
        default: ["full-time"],
        enum: ["full-time", "internship", "ppo"],
      },
      preferredLocations: [{ type: String, trim: true }],
      remotePreference: {
        type: String,
        enum: ["remote", "hybrid", "onsite", "flexible"],
        default: "flexible",
      },
      expectedCtcLpa: { type: Number, min: 0 },
      minCtcLpa: { type: Number, min: 0 },
      availableFrom: { type: Date },
      openToRelocation: { type: Boolean, default: true },
      noticePeriodDays: { type: Number, min: 0 },
      workAuthorization: { type: [String], default: ["India"] },
    },

    applications: [ApplicationSchema],

    visibility: {
      type: String,
      enum: ["public", "campus", "private"],
      default: "campus",
    },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    consent: {
      dataSharing: { type: Boolean, default: true },
      placementTermsAcceptedAt: { type: Date },
    },

    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.passwordHash;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// ---------- Default Password Hook ----------
StudentSchema.pre("save", async function (next) {
  if (!this.passwordHash) {
    const hashed = await bcrypt.hash("SMIT@123", 10);
    this.passwordHash = hashed;
  }
  next();
});

// ---------- Virtuals ----------
StudentSchema.virtual("fullName").get(function () {
  const n = this.name || {};
  return [n.first, n.middle, n.last].filter(Boolean).join(" ");
});

StudentSchema.virtual("activeBacklogs").get(function () {
  return (this.backlogs?.details || []).filter((b) => b.status === "active").length;
});

// ---------- Indexes ----------
StudentSchema.index({
  "name.first": "text",
  "name.last": "text",
  "skills.name": "text",
  "projects.title": "text",
  "experiences.company": "text",
});
StudentSchema.index({ dept: 1, graduationYear: 1 });
StudentSchema.index({ "cgpa.current": -1 });
StudentSchema.index({ "email.college": 1 }, { unique: true });

// ---------- Application Timestamp Hook ----------
StudentSchema.pre("save", function (next) {
  if (this.isModified("applications")) {
    this.applications = (this.applications || []).map((a) => ({
      ...a.toObject?.() || a,
      updatedAt: new Date(),
    }));
  }
  next();
});

module.exports = mongoose.models.Student || mongoose.model("Student", StudentSchema);
