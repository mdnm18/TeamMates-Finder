import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initializeFirebase = async () => {
    try {
        const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
        const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf8'));

        if(serviceAccount.project_id === 'YOUR_PROJECT_ID') {
            console.warn('⚠️ WARNING: Using mock Firebase service account. Authentication will fail until real keys are provided.');
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Firebase Admin initialization error:', error.message);
    }
}

initializeFirebase();

export default admin;
