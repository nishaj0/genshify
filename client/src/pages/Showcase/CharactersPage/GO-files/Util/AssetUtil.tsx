import type { CharacterKey, GenderKey } from "genshin-optimizer/consts";
import { characterAsset } from "genshin-optimizer/assets";
import { portrait } from "genshin-optimizer/silly-wisher";

export function iconAsset(
  cKey: CharacterKey,
  gender: GenderKey,
  silly: boolean
) {
  const sillyAsset = portrait(cKey, gender);
  const genshinAsset = characterAsset(cKey, "icon", gender);
  if (silly && sillyAsset) return sillyAsset;
  return genshinAsset || "";
}
