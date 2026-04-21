import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface Sticker {
    id: bigint;
    blob: ExternalBlob;
    name: string;
    description: string;
    uploaderPrincipal: Principal;
    category: StickerCategory;
    uploadDate: Timestamp;
}
export enum StickerCategory {
    Art = "Art",
    Tech = "Tech",
    Nature = "Nature",
    Abstract = "Abstract",
    Other = "Other"
}
export interface backendInterface {
    addSticker(name: string, category: StickerCategory, description: string, blob: ExternalBlob): Promise<bigint>;
    getStickerById(id: bigint): Promise<Sticker | null>;
    getStickers(): Promise<Array<Sticker>>;
}
