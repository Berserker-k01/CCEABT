const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Multer for file uploads (temporary storage)
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx|xls|xlsx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Type de fichier non autorisé. Utilisez PDF, Word ou Excel.'));
        }
    }
});

// Google Drive API Setup
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    },
    scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

// Upload file to Google Drive
async function uploadToGoogleDrive(filePath, fileName, mimeType) {
    try {
        const fileMetadata = {
            name: fileName,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
        };

        const media = {
            mimeType: mimeType,
            body: fs.createReadStream(filePath)
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, webViewLink, webContentLink'
        });

        // Make file accessible to anyone with the link
        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erreur upload Google Drive:', error);
        throw error;
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'CCEABT Backend API is running' });
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Aucun fichier fourni'
            });
        }

        const { partnerName, projectTitle, location, period, beneficiaries, budget, details } = req.body;

        // Validate required fields
        if (!partnerName || !projectTitle) {
            // Clean up uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: 'Données manquantes'
            });
        }

        // Generate a clean filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const cleanFileName = `${partnerName}_${projectTitle}_${timestamp}${path.extname(req.file.originalname)}`;

        // Upload to Google Drive
        const driveFile = await uploadToGoogleDrive(
            req.file.path,
            cleanFileName,
            req.file.mimetype
        );

        // Delete temporary file
        fs.unlinkSync(req.file.path);

        // Return success with Drive link
        res.json({
            success: true,
            message: 'Fichier uploadé avec succès sur Google Drive',
            data: {
                fileId: driveFile.id,
                webViewLink: driveFile.webViewLink,
                fileName: cleanFileName,
                uploadedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Erreur lors de l\'upload:', error);

        // Clean up file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'upload vers Google Drive',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'Fichier trop volumineux (max 50MB)'
            });
        }
    }

    res.status(500).json({
        success: false,
        message: err.message || 'Erreur serveur'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 CCEABT Backend API démarré sur le port ${PORT}`);
    console.log(`📁 Dossier Google Drive: ${process.env.GOOGLE_DRIVE_FOLDER_ID}`);
});
