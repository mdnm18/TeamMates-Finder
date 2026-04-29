import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Download } from 'lucide-react';

const ProfileQRCode = ({ isOpen, onClose, profileUrl }) => {
  const downloadQRCode = () => {
    const svg = document.getElementById("profile-qrcode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "My_TeamMates_Profile.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-4xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center border border-gray-200"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-2 bg-gray-50 rounded-full">
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Scan to Connect</h3>
            <p className="text-gray-500 text-center text-sm mb-6">Let others scan this code to view your TeamMates Finder profile.</p>
            
            <div className="bg-white p-4 rounded-3xl shadow-inner border-2 border-gray-100">
              <QRCodeSVG 
                id="profile-qrcode"
                value={profileUrl || window.location.href} 
                size={200} 
                level={"H"}
                bgColor={"#ffffff"}
                fgColor={"#DC2626"} // Primary red
                imageSettings={{
                  src: "/logo.png",
                  x: undefined,
                  y: undefined,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>
            
            <div className="flex gap-4 mt-8 w-full">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={downloadQRCode}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                <Download size={18} /> Save
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(profileUrl || window.location.href);
                  // toast could be triggered here
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-50 text-primary rounded-xl font-semibold hover:bg-rose-100 transition-colors"
              >
                <Share2 size={18} /> Copy Link
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileQRCode;
