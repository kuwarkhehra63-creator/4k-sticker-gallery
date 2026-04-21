import type { backendInterface } from "../backend";
import { ExternalBlob, StickerCategory } from "../backend";

const makeSticker = (
  id: bigint,
  name: string,
  category: StickerCategory,
  description: string,
  imageUrl: string,
) => ({
  id,
  blob: ExternalBlob.fromURL(imageUrl),
  name,
  description,
  uploaderPrincipal: { toText: () => "aaaaa-aa" } as any,
  category,
  uploadDate: BigInt(Date.now()),
});

export const mockBackend: backendInterface = {
  // Object storage internal methods (no-op in mock)
  _immutableObjectStorageBlobsAreLive: async (hashes) =>
    hashes.map(() => true),
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => {},
  _immutableObjectStorageCreateCertificate: async (blobHash) => ({
    method: "mock",
    blob_hash: blobHash,
  }),
  _immutableObjectStorageRefillCashier: async () => ({ success: true }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => {},

  addSticker: async () => BigInt(10),

  getStickerById: async (id: bigint) =>
    makeSticker(
      id,
      "Sample Sticker",
      StickerCategory.Art,
      "A sample sticker",
      "https://placehold.co/400x400/1a1a2e/00bcd4?text=4K",
    ),

  getStickers: async () => [
    makeSticker(
      BigInt(1),
      "Neon Wave",
      StickerCategory.Art,
      "Abstract neon wave art in teal and blue",
      "https://placehold.co/400x400/0d1117/3ecfcf?text=Neon+Wave",
    ),
    makeSticker(
      BigInt(2),
      "Circuit Board",
      StickerCategory.Tech,
      "Green circuit pattern on dark background",
      "https://placehold.co/400x400/0d1117/4caf50?text=Circuit",
    ),
    makeSticker(
      BigInt(3),
      "Forest Spirit",
      StickerCategory.Nature,
      "Mystical forest creature sticker",
      "https://placehold.co/400x400/0d1117/66bb6a?text=Forest",
    ),
    makeSticker(
      BigInt(4),
      "Void Fractal",
      StickerCategory.Abstract,
      "Deep space fractal in purples and teals",
      "https://placehold.co/400x400/0d1117/7c4dff?text=Fractal",
    ),
    makeSticker(
      BigInt(5),
      "Cosmic Dust",
      StickerCategory.Other,
      "Swirling cosmic dust in warm tones",
      "https://placehold.co/400x400/0d1117/ff7043?text=Cosmic",
    ),
    makeSticker(
      BigInt(6),
      "Deep Ocean",
      StickerCategory.Nature,
      "Bioluminescent ocean life",
      "https://placehold.co/400x400/0d1117/29b6f6?text=Ocean",
    ),
  ],
};
