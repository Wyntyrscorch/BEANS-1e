Hooks.once("init", () => {
console.log("BEANS | Initializing system");


// Register custom Actor & Item sheets later
});


/* ============================
Durability helpers
============================ */


export const DIE_STEPS = ["d4", "d6", "d8", "d10", "d12"];


export function degradeDie(die) {
const index = DIE_STEPS.indexOf(die);
if (index <= 0) return null; // item breaks
return DIE_STEPS[index - 1];
}


export async function rollDurability(item) {
const die = item.system.durability.die;
const roll = await new Roll(`1${die}`).roll({ async: true });


roll.toMessage({
speaker: ChatMessage.getSpeaker(),
flavor: `${item.name} Durability Check`
});


if (roll.total === 1) {
const newDie = degradeDie(die);
if (!newDie) {
ui.notifications.warn(`${item.name} breaks!`);
await item.update({ "system.durability.broken": true });
} else {
ui.notifications.info(`${item.name} durability degrades to ${newDie}`);
await item.update({ "system.durability.die": newDie });
}
}
}