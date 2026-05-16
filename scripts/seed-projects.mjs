import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const required = ['MONGODB_URI', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing env: ${key}`);
    process.exit(1);
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const ProjectImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    alt: { type: String, default: '' },
  },
  { _id: false },
);

const LocalizedSchema = new mongoose.Schema(
  { az: { type: String, default: '' }, ru: { type: String, default: '' }, en: { type: String, default: '' } },
  { _id: false },
);

const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: LocalizedSchema, required: true },
    titleItalic: { type: LocalizedSchema, default: () => ({ az: '', ru: '', en: '' }) },
    description: { type: LocalizedSchema, default: () => ({ az: '', ru: '', en: '' }) },
    category: { type: String, enum: ['villa', 'apartment', 'restaurant', 'office', 'commercial', 'other'], default: 'villa', index: true },
    status: { type: String, enum: ['completed', 'in_progress', 'planned'], default: 'completed', index: true },
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

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const az = JSON.parse(readFileSync(resolve(root, 'messages/az.json'), 'utf8')).Projects.items;
const ru = JSON.parse(readFileSync(resolve(root, 'messages/ru.json'), 'utf8')).Projects.items;

const SEED = [
  { key: 'gence',      slug: 'gence-villa',      category: 'villa',      featured: true,  img: 'exterier.jpg',        order: 1 },
  { key: 'royalpark',  slug: 'royal-park-villa', category: 'villa',      featured: true,  img: 'royalpark.jfif',      order: 2 },
  { key: 'izmir',      slug: 'izmir-residence',  category: 'apartment',  featured: false, img: 'izmirrezidens.jfif',  order: 3 },
  { key: 'fevvareler', slug: 'fevvareler-restoran', category: 'restaurant', featured: false, img: 'fevvareler.jfif',  order: 4 },
  { key: 'xirdalan',   slug: 'xirdalan-menzil',  category: 'apartment',  featured: false, img: 'xirdalanvilla.jfif',  order: 5 },
  { key: 'yasamal',    slug: 'yasamal-menzil',   category: 'apartment',  featured: false, img: 'yasamavilla.jfif',    order: 6 },
];

async function uploadImage(filePath, publicIdHint) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'ideainshaat/projects',
    public_id: publicIdHint,
    overwrite: true,
    resource_type: 'image',
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

async function main() {
  console.log('→ Connecting to MongoDB…');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✓ Connected');

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const item of SEED) {
    const azI = az[item.key];
    const ruI = ru[item.key];
    if (!azI) {
      console.warn(`⚠ Missing AZ data for ${item.key}, skipping`);
      skipped += 1;
      continue;
    }

    const existing = await Project.findOne({ slug: item.slug });

    console.log(`→ Uploading image for ${item.key}…`);
    const imgPath = resolve(root, 'public/imgs', item.img);
    const cover = await uploadImage(imgPath, item.slug);
    console.log(`  ✓ ${cover.publicId}`);

    const data = {
      slug: item.slug,
      title: { az: azI.title, ru: ruI?.title ?? azI.title, en: '' },
      titleItalic: { az: azI.italic, ru: ruI?.italic ?? azI.italic, en: '' },
      description: { az: '', ru: '', en: '' },
      category: item.category,
      status: 'completed',
      featured: item.featured,
      published: true,
      location: azI.location ?? '',
      size: azI.size ?? '',
      duration: azI.duration ?? '',
      year: azI.year ?? '',
      coverImage: { ...cover, alt: azI.alt ?? '' },
      gallery: [],
      order: item.order,
    };

    if (existing) {
      await Project.updateOne({ _id: existing._id }, { $set: data });
      console.log(`  ↺ Updated: ${item.slug}`);
      updated += 1;
    } else {
      await Project.create(data);
      console.log(`  ✚ Created: ${item.slug}`);
      created += 1;
    }
  }

  console.log(`\n✓ Done. Created: ${created} · Updated: ${updated} · Skipped: ${skipped}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
