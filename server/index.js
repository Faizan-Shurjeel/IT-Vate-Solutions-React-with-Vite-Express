import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS for your Vite app
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Ensure upload directory exists
const uploadsDir = path.join(__dirname, '../payment-screenshots');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const userId = req.body.userId || 'unknown';
        const fileExtension = path.extname(file.originalname);
        const fileName = `payment_${userId}_${timestamp}${fileExtension}`;
        cb(null, fileName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (JPEG, PNG, GIF) are allowed!'), false);
        }
    }
});

// Upload endpoint
app.post('/api/upload-payment-screenshot', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                error: 'No file uploaded' 
            });
        }

        console.log('File uploaded:', req.file.filename);

        // Create metadata file
        const metadata = {
            originalName: req.file.originalname,
            fileName: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype,
            userId: req.body.userId,
            userEmail: req.body.userEmail,
            packageDetails: req.body.packageDetails ? JSON.parse(req.body.packageDetails) : null,
            uploadedAt: new Date().toISOString(),
            filePath: req.file.path
        };

        const metadataPath = path.join(uploadsDir, `${req.file.filename}.json`);
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

        res.json({
            success: true,
            fileName: req.file.filename,
            message: 'File uploaded successfully',
            fileSize: req.file.size,
            originalName: req.file.originalname
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Upload failed', 
            details: error.message 
        });
    }
});

// Get all uploaded files (for admin)
app.get('/api/payment-screenshots', (req, res) => {
    try {
        const files = fs.readdirSync(uploadsDir)
            .filter(file => file.endsWith('.json'))
            .map(metaFile => {
                const metaPath = path.join(uploadsDir, metaFile);
                const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
                return metadata;
            })
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

        res.json({
            success: true,
            files,
            count: files.length
        });
    } catch (error) {
        console.error('Error reading files:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to read files' 
        });
    }
});

// Serve uploaded files
app.get('/api/payment-screenshots/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(uploadsDir, filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ 
                success: false,
                error: 'File not found' 
            });
        }

        res.sendFile(filePath);
    } catch (error) {
        console.error('Error serving file:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to serve file' 
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'Server is running',
        timestamp: new Date().toISOString(),
        uploadsDir: uploadsDir
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File too large. Maximum size is 10MB'
            });
        }
    }
    
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
});

export default app;
