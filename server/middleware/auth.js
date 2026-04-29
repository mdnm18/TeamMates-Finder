import admin from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    // Ensure Admin is configured
    if (!admin.apps.length) {
      return res
        .status(500)
        .json({
          error: "Server configuration error. Firebase Admin not initialized.",
        });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email } = decodedToken;

    // SRMIST Domain check
    // if (!email || !email.endsWith('@srmist.edu.in')) {
    if (!email || !email.endsWith("gmail.com")) {
      return res
        .status(403)
        .json({ error: "Forbidden: Valid @srmist.edu.in email required." });
    }

    // Attach verified info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
