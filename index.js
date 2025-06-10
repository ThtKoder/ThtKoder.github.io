const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const app = express();

// Middleware and view setup
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Firebase Admin SDK initialization
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// Home route: render login page
app.get('/', (req, res) => {
  res.render('student');
});

// Google Auth callback: verify token, create student if needed, redirect
app.post('/auth/google/callback', async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    // Reference to student doc by email
    const studentRef = admin.firestore().collection('students').doc(email);
    const doc = await studentRef.get();

    if (!doc.exists) {
      await studentRef.set({ email });
    }

    res.json({ success: true, redirectUrl: `/student?email=${encodeURIComponent(email)}` });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Student page: load student info
app.get('/student', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).send('No email provided');
  const studentRef = admin.firestore().collection('students').doc(email);
  const doc = await studentRef.get();
  if (!doc.exists) return res.status(404).send('Student not found');
  res.render('student', { student: doc.data() });
});

// Middleware to authenticate Firebase ID token
async function authenticateToken(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) return res.status(401).send('No token provided');
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
}

// Example: Update student info (only for logged-in user)
app.post('/student/update', authenticateToken, async (req, res) => {
  const { info } = req.body;
  const userId = req.user.email; // Use email as document ID

  try {
    await admin.firestore().collection('students').doc(userId).set(info, { merge: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));