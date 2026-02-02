import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

const DOCX_FILE = 'Liste des OSC membres du CCEABT avec logo.docx';
const OUTPUT_DIR = 'public/partners';

if (!fs.existsSync(DOCX_FILE)) {
    console.error(`File not found: ${DOCX_FILE}`);
    process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

try {
    const zip = new AdmZip(DOCX_FILE);
    const zipEntries = zip.getEntries();

    let count = 0;
    zipEntries.forEach((entry) => {
        if (entry.entryName.startsWith('word/media/')) {
            const fileName = path.basename(entry.entryName);
            const targetPath = path.join(OUTPUT_DIR, fileName);

            // Extract the file
            zip.extractEntryTo(entry, OUTPUT_DIR, false, true);

            console.log(`Extracted: ${fileName}`);
            count++;
        }
    });

    console.log(`\nTotal images extracted: ${count}`);

} catch (e) {
    console.error(`Error processing DOCX: ${e.message}`);
}
