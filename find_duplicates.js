
const fs = require('fs');
const content = fs.readFileSync('src/context/DataContext.tsx', 'utf8');

// Primitive extraction of initialPartners
const matches = content.match(/const initialPartners: PartnerItem\[\] = \[([\s\S]*?)\];/);
if (!matches) {
    console.log("Could not find initialPartners array");
    process.exit(1);
}

// This is a bit hacky but should work for identifying names
const section = matches[1];
const nameLines = section.match(/"name":\s*"([^"]+)"/g) || [];
const names = nameLines.map(line => line.match(/"name":\s*"([^"]+)"/)[1]);

const counts = {};
names.forEach(name => {
    counts[name] = (counts[name] || 0) + 1;
});

console.log("--- DUPLICATE NAMES ---");
Object.entries(counts).filter(([name, count]) => count > 1).forEach(([name, count]) => {
    console.log(`${name}: ${count} occurrences`);
});

const idLines = section.match(/"id":\s*"([^"]+)"/g) || [];
const ids = idLines.map(line => line.match(/"id":\s*"([^"]+)"/)[1]);
const idCounts = {};
ids.forEach(id => {
    idCounts[id] = (idCounts[id] || 0) + 1;
});

console.log("\n--- DUPLICATE IDs ---");
Object.entries(idCounts).filter(([id, count]) => count > 1).forEach(([id, count]) => {
    console.log(`${id}: ${count} occurrences`);
});
