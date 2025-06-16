
import { Material } from "../../items/Material.mjs"
export class CraftingManager {
    static craft(item, materials) {
        materials.forEach(material => material.applyEffect(item));
        return item; // Return the modified item
    }

    static combineMaterials(materials) {
        // Example: Combining two materials into a stronger material
        return new Material({
            name: `Combined ${materials[0].name} & ${materials[1].name}`,
            description: "A refined material from crafting.",
            rarity: "Enhanced",
            effect: "enhance",
            boostValue: materials.reduce((acc, mat) => acc + mat.boostValue, 0)
        });
    }
}