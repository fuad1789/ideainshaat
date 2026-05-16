import mongoose, { Schema, model, models, type InferSchemaType } from 'mongoose';

const ProjectImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    alt: { type: String, default: '' },
  },
  { _id: false },
);

const LocalizedSchema = new Schema(
  {
    az: { type: String, default: '' },
    ru: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: LocalizedSchema, required: true },
    titleItalic: { type: LocalizedSchema, default: () => ({ az: '', ru: '', en: '' }) },
    description: { type: LocalizedSchema, default: () => ({ az: '', ru: '', en: '' }) },
    category: {
      type: String,
      enum: ['villa', 'apartment', 'restaurant', 'office', 'commercial', 'other'],
      default: 'villa',
      index: true,
    },
    status: {
      type: String,
      enum: ['completed', 'in_progress', 'planned'],
      default: 'completed',
      index: true,
    },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
    location: { type: String, default: '' },
    size: { type: String, default: '' },
    duration: { type: String, default: '' },
    year: { type: String, default: '' },
    coverImage: { type: ProjectImageSchema, default: null },
    gallery: { type: [ProjectImageSchema], default: [] },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

ProjectSchema.index({ createdAt: -1 });

export type ProjectImage = InferSchemaType<typeof ProjectImageSchema>;
export type ProjectDoc = InferSchemaType<typeof ProjectSchema> & { _id: mongoose.Types.ObjectId };

export const Project = (models.Project as mongoose.Model<ProjectDoc>) || model<ProjectDoc>('Project', ProjectSchema);
