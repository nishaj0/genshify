import {
  allElementKeys,
  travelerElement,
  travelerElements,
} from "genshin-optimizer/consts";
import { MenuItem } from "@mui/material";
import { useContext } from "react";
import { ColorText } from "genshin-optimizer/ui";
import DropdownButton from "../../../../libs/GO-files/Components/DropdownMenu/DropdownButton";
import { CharacterContext } from "../../../../contexts/CharacterContext";
import { stg } from "../../../../libs/GO-files/Data/SheetUtil";
import useCharSelectionCallback from "../../../../libs/GO-files/ReactHooks/useCharSelectionCallback";

export default function TravelerElementSelect() {
  const { character } = useContext(CharacterContext);
  const { key } = character;
  const setCharacter = useCharSelectionCallback();
  if (!key.startsWith("Traveler")) return null;

  const elementKey = allElementKeys.find((e) => key.toLowerCase().includes(e));
  if (!elementKey) return null;

  return (
    <DropdownButton
      color={elementKey}
      title={<strong>{stg(`element.${elementKey}`)}</strong>}
    >
      {travelerElements.map((eleKey) => (
        <MenuItem
          key={eleKey}
          selected={elementKey === eleKey}
          disabled={elementKey === eleKey}
          onClick={() => setCharacter(travelerElement(eleKey))}
        >
          <strong>
            <ColorText color={eleKey}>{stg(`element.${eleKey}`)}</ColorText>
          </strong>
        </MenuItem>
      ))}
    </DropdownButton>
  );
}
