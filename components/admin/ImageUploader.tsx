'use client';

import { useRef, useState } from 'react';

export interface UploadedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
  alt?: string;
}

interface ImageUploaderProps {
  value: UploadedImage[];
  multiple?: boolean;
  onChange: (images: UploadedImage[]) => void;
  onError?: (message: string) => void;
}

interface SignResponse {
  success: boolean;
  data?: {
    signature: string;
    timestamp: number;
    apiKey: string;
    cloudName: string;
    folder: string;
  };
  error?: string;
}

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
}

async function uploadToCloudinary(file: File): Promise<UploadedImage> {
  const signRes = await fetch('/api/admin/cloudinary-sign', { method: 'POST' });
  const signJson = (await signRes.json()) as SignResponse;
  if (!signJson.success || !signJson.data) {
    throw new Error(signJson.error ?? 'İmza alına bilmədi');
  }

  const { signature, timestamp, apiKey, cloudName, folder } = signJson.data;

  const fd = new FormData();
  fd.append('file', file);
  fd.append('api_key', apiKey);
  fd.append('timestamp', String(timestamp));
  fd.append('signature', signature);
  fd.append('folder', folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: fd,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Yükləmə uğursuz: ${text}`);
  }

  const data = (await res.json()) as CloudinaryUploadResponse;
  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    alt: '',
  };
}

export function ImageUploader({ value, multiple = true, onChange, onError }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  async function handleFiles(files: FileList | File[]) {
    const list = Array.from(files);
    if (list.length === 0) return;
    setBusy(true);
    try {
      const uploaded: UploadedImage[] = [];
      for (const file of list) {
        if (!file.type.startsWith('image/')) continue;
        const result = await uploadToCloudinary(file);
        uploaded.push(result);
        if (!multiple) break;
      }

      if (multiple) {
        onChange([...value, ...uploaded]);
      } else if (uploaded[0]) {
        onChange([uploaded[0]]);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Yükləmə xətası';
      onError?.(message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function removeAt(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div
        className={`adm-uploader ${drag ? 'drag' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <div className="ico">
          {busy ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" strokeDasharray="40 60" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
        </div>
        <div className="t">
          {busy ? 'Yüklənir…' : multiple ? <>Şəkilləri <em>buraya buraxın</em></> : <>Şəkil <em>seçin</em></>}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          hidden
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />
      </div>

      {value.length > 0 && (
        <div className="adm-img-grid">
          {value.map((img, idx) => (
            <div key={img.publicId} className="adm-img-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt ?? ''} />
              <button
                type="button"
                className="rm"
                aria-label="Sil"
                onClick={() => removeAt(idx)}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
