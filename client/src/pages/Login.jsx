import React, { useState } from "react";
import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Users, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      // hd: 'srmist.edu.in'
      hd: "gmail.com",
    });

    try {
      const result = await signInWithPopup(auth, provider);
      // Verify domain on frontend as early check
      //   if (!result.user.email.endsWith("@srmist.edu.in")) {
      if (!result.user.email.endsWith("@gmail.com")) {
        throw new Error("Please use your @srmist.edu.in account.");
      }

      const token = await result.user.getIdToken();

      // Verify with backend
      const response = await api.post(
        "/auth/login",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      dispatch(setCredentials({ user: response.data.user, token }));

      if (response.data.isNewUser) {
        // Navigate to Onboarding
        navigate("/onboarding", { state: { email: response.data.email } });
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to sign in. Please try again.",
      );
      // Logout if frontend validation fails
      await auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Hero Block */}
        <div className="bg-rose-600 p-8 text-center text-white relative overflow-hidden">
          {/* Decorative shape */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-rose-500 opacity-50"></div>

          <div className="relative z-10 flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <img
                src="/logo.png"
                alt="TeamMates Logo"
                className="w-25 h-20 object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">TeamMates Finder</h1>
          <p className="text-rose-100 mb-2">
            Find your perfect match for hackathons and projects at SRMIST.
          </p>
        </div>

        {/* Login Block */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-3 border border-red-100">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 hover:border-rose-600 hover:text-rose-600 hover:shadow-md transition-all duration-300 py-3 px-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>
                {loading ? "Authenticating..." : "Sign in with SRMIST Google"}
              </span>
              {!loading && (
                <ArrowRight
                  size={20}
                  className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300"
                />
              )}
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Designed exclusively for SRMIST students.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
