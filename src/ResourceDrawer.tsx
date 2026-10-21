// src/ResourceDrawer.tsx
import { useState } from 'react';
import { FolderKanban, Video, BookOpen, ExternalLink, X } from 'lucide-react';

export default function ResourceDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button fixed at top right of the viewport */}
      <div className="fixed top-3 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg cursor-pointer transition-all"
        >
          <FolderKanban className="w-4 h-4 text-emerald-400" /> My Files & Tutorials
        </button>
      </div>

      {/* Slide-Over Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex justify-end bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 text-slate-100 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderKanban className="w-4 h-4 text-emerald-400" /> My Files & Tutorials
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Free external study resources & quick links</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Recommended Video Tutorials */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-3.5 h-3.5" /> Recommended Video Tutorials
                </h3>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-white">AZ-900 Azure Fundamentals Full Course</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">2.5 Hrs</span>
                  </div>
                  <p className="text-xs text-slate-400">Complete, beginner-friendly crash course video tutorial.</p>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 rounded-lg transition-all mt-2 cursor-pointer"
                  >
                    Watch on YouTube <ExternalLink className="w-3 h-3 inline ml-1" />
                  </a>
                </div>
              </div>

              {/* Official Study Links */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" /> Official Study Links
                </h3>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-white">Official Microsoft AZ-900 Study Guide</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium">Microsoft</span>
                  </div>
                  <p className="text-xs text-slate-400">Check exactly what is on the exam from Microsoft Learn.</p>
                  <a
                    href="https://learn.microsoft.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold py-2 rounded-lg transition-all mt-2 cursor-pointer"
                  >
                    Open Study Guide <ExternalLink className="w-3 h-3 inline ml-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 text-center">
              <p className="text-[11px] text-slate-500">CloudClarity AI Workspace Storage Active</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}