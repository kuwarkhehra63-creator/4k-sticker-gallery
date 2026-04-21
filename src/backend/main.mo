import List "mo:core/List";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "types/sticker";
import StickerLib "lib/sticker";
import StickerMixin "mixins/sticker-api";

actor {
  // State
  let stickers = List.empty<Types.StickerInternal>();
  var seeded : Bool = false;

  // Object storage infrastructure (MUST be included first)
  include MixinObjectStorage();

  // Sticker domain API
  include StickerMixin(stickers);

  // Seed sample stickers on first init
  if (not seeded) {
    let placeholderBlob : Storage.ExternalBlob = "" : Blob;
    ignore StickerLib.seedSampleStickers(stickers, stickers.size(), placeholderBlob);
    seeded := true;
  };
};
