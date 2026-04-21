import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "common";

module {
  public type StickerCategory = CommonTypes.StickerCategory;
  public type Timestamp = CommonTypes.Timestamp;

  // Internal representation (mutable, used inside the canister)
  public type StickerInternal = {
    id : Nat;
    name : Text;
    category : StickerCategory;
    description : Text;
    uploaderPrincipal : Principal;
    uploadDate : Timestamp;
    blob : Storage.ExternalBlob;
  };

  // Shared/public representation (immutable, used in API responses)
  public type Sticker = {
    id : Nat;
    name : Text;
    category : StickerCategory;
    description : Text;
    uploaderPrincipal : Principal;
    uploadDate : Timestamp;
    blob : Storage.ExternalBlob;
  };
};
