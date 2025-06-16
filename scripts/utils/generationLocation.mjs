
import { locations} from "../../data/world/locationPresets.mjs"
export function generateLocation() {
  const keys = Object.keys(locations);

  if (keys.length < 2) {
    throw new Error("Not enough locations to generate a pair.");
  }

  const shuffled = [...keys].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}
