import List "mo:core/List";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/sticker";
import StickerLib "../lib/sticker";

mixin (
  stickers : List.List<Types.StickerInternal>,
) {
  public shared ({ caller }) func addSticker(
    name : Text,
    category : Types.StickerCategory,
    description : Text,
    blob : Storage.ExternalBlob,
  ) : async Nat {
    let id = stickers.size();
    ignore StickerLib.addSticker(
      stickers,
      id,
      name,
      category,
      description,
      caller,
      Time.now(),
      blob,
    );
    id;
  };

  public query func getStickers() : async [Types.Sticker] {
    StickerLib.getStickers(stickers);
  };

  public query func getStickerById(id : Nat) : async ?Types.Sticker {
    StickerLib.getStickerById(stickers, id);
  };
};
