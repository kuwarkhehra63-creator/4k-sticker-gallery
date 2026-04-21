import List "mo:core/List";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/sticker";

module {
  public type StickerList = List.List<Types.StickerInternal>;

  public func addSticker(
    stickers : StickerList,
    nextId : Nat,
    name : Text,
    category : Types.StickerCategory,
    description : Text,
    uploaderPrincipal : Principal,
    uploadDate : Types.Timestamp,
    blob : Storage.ExternalBlob,
  ) : Nat {
    let sticker : Types.StickerInternal = {
      id = nextId;
      name;
      category;
      description;
      uploaderPrincipal;
      uploadDate;
      blob;
    };
    stickers.add(sticker);
    nextId;
  };

  public func toPublic(internal : Types.StickerInternal) : Types.Sticker {
    {
      id = internal.id;
      name = internal.name;
      category = internal.category;
      description = internal.description;
      uploaderPrincipal = internal.uploaderPrincipal;
      uploadDate = internal.uploadDate;
      blob = internal.blob;
    };
  };

  public func getStickers(stickers : StickerList) : [Types.Sticker] {
    let publicList = stickers.map<Types.StickerInternal, Types.Sticker>(toPublic);
    let arr = publicList.toArray();
    arr.sort(func(a : Types.Sticker, b : Types.Sticker) : Order.Order {
      Int.compare(b.uploadDate, a.uploadDate)
    });
  };

  public func getStickerById(stickers : StickerList, id : Nat) : ?Types.Sticker {
    switch (stickers.find<Types.StickerInternal>(func(s : Types.StickerInternal) : Bool { s.id == id })) {
      case (?s) ?toPublic(s);
      case null null;
    };
  };

  public func seedSampleStickers(
    stickers : StickerList,
    nextId : Nat,
    sampleBlob : Storage.ExternalBlob,
  ) : Nat {
    let anon = Principal.fromText("2vxsx-fae");
    let now = Time.now();

    ignore addSticker(stickers, nextId, "Abstract Swirl", #Abstract, "A vibrant 4K abstract swirl sticker", anon, now, sampleBlob);
    ignore addSticker(stickers, nextId + 1, "Green Forest", #Nature, "Lush green forest scene in 4K", anon, now - 1_000_000_000, sampleBlob);
    ignore addSticker(stickers, nextId + 2, "Canvas Splash", #Art, "Artistic paint splash in 4K", anon, now - 2_000_000_000, sampleBlob);
    nextId + 3;
  };
};
