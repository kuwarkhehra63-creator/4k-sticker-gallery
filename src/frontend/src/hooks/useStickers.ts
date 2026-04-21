import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, createActor } from "../backend";
import type { Sticker, StickerCategory } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useStickers() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Sticker[]>({
    queryKey: ["stickers"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getStickers();
      return result as Sticker[];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useStickerById(id: bigint | null) {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Sticker | null>({
    queryKey: ["sticker", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      const result = await actor.getStickerById(id);
      return result as Sticker | null;
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export interface AddStickerParams {
  name: string;
  category: StickerCategory;
  description: string;
  file: File;
  onProgress?: (pct: number) => void;
}

export function useAddSticker() {
  const { actor, isFetching } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation<bigint, Error, AddStickerParams>({
    mutationFn: async ({ name, category, description, file, onProgress }) => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      const bytes = new Uint8Array(await file.arrayBuffer());
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      return actor.addSticker(name, category, description, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stickers"] });
    },
  });
}
