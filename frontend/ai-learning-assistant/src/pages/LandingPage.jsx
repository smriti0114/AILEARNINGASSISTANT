import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BrainCircuit, FileText, LayoutDashboard, ArrowRight, LogIn, UserPlus, Zap, CheckCircle2 } from 'lucide-react';
import ThemeToggle from '../components/common/ThemeToggle';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-page bg-dotted text-body font-sans overflow-x-hidden selection:bg-primary/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-navy" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                AI Learning Assistant
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-muted hover:text-navy transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-muted hover:text-navy transition-colors">How It Works</a>
              <div className="flex items-center gap-4 ml-4 border-l border-border-subtle pl-8">
                <ThemeToggle />
                <Link to="/login" className="text-sm font-medium text-muted hover:text-navy transition-colors flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link to="/register" className="text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  <UserPlus className="w-4 h-4" />
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile menu buttons */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <Link to="/login" className="text-sm font-medium text-muted hover:text-navy px-2 py-2">
                Login
              </Link>
              <Link to="/register" className="text-sm font-medium bg-primary text-surface px-4 py-2 rounded-full hover:bg-gray-200">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-border-subtle text-sm text-indigo-300 mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>The future of intelligent learning</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Learn Smarter. <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Understand Faster.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg lg:text-xl text-muted mb-10 leading-relaxed">
            Transform your study materials into interactive quizzes, smart flashcards, and comprehensive insights using advanced AI. Master any subject in record time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-navy font-semibold text-lg hover:from-indigo-400 hover:to-purple-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 transform hover:-translate-y-1">
              Start Learning Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface/50 border border-border-subtle text-navy font-semibold text-lg hover:bg-primary/10 transition-all backdrop-blur-sm flex items-center justify-center">
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-page/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Supercharge your study workflow</h2>
            <p className="text-muted text-lg">Everything you need to digest complex information and retain it longer, powered by artificial intelligence.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-surface/50 border border-border-subtle backdrop-blur-sm hover:bg-primary/[0.07] transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Document Processing</h3>
              <p className="text-muted leading-relaxed">Upload your PDFs, notes, or articles. Our AI instantly analyzes the content to extract key concepts and summaries.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-surface/50 border border-border-subtle backdrop-blur-sm hover:bg-primary/[0.07] transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Auto-Generated Flashcards</h3>
              <p className="text-muted leading-relaxed">Stop wasting time creating study materials manually. Instantly generate perfectly formatted flashcards from any document.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-surface/50 border border-border-subtle backdrop-blur-sm hover:bg-primary/[0.07] transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Quizzes</h3>
              <p className="text-muted leading-relaxed">Test your knowledge with AI-generated quizzes. Get instant feedback and detailed explanations to reinforce learning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted text-lg">Three simple steps to mastery</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
            
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-surface border border-border-subtle rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)] relative z-10">
                <span className="text-3xl font-bold text-indigo-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-muted">Sign up in seconds to access your personal AI learning workspace.</p>
            </div>
            
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-surface border border-border-subtle rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)] relative z-10">
                <span className="text-3xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Materials</h3>
              <p className="text-muted">Add your documents and let our AI analyze and structure the content.</p>
            </div>
            
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-surface border border-border-subtle rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(236,72,153,0.2)] relative z-10">
                <span className="text-3xl font-bold text-pink-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn & Track</h3>
              <p className="text-muted">Practice with flashcards, take quizzes, and track your progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-12 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-border-subtle bg-surface/50 backdrop-blur-sm p-4 md:p-8 shadow-2xl">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-indigo-500/30 blur-[80px]" />
             
             {/* Mock Dashboard UI */}
             <div className="relative rounded-xl overflow-hidden border border-white/5 bg-page shadow-2xl flex flex-col h-[500px]">
                {/* Header */}
                <div className="h-14 border-b border-white/5 flex items-center px-6 justify-between bg-surface/50">
                   <div className="flex gap-4 items-center">
                      <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                      <span className="font-semibold text-sm">Dashboard Preview</span>
                   </div>
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                   </div>
                </div>
                {/* Body */}
                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
                   <div className="col-span-2 space-y-6">
                      <div className="h-32 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/5 p-6 flex flex-col justify-between">
                         <div className="w-1/3 h-4 rounded bg-primary/10"></div>
                         <div className="w-2/3 h-8 rounded bg-primary/20"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-40 rounded-lg bg-surface/50 border border-white/5 p-4 flex flex-col justify-between">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 mb-4"></div>
                            <div className="space-y-2">
                              <div className="w-full h-3 rounded bg-primary/10"></div>
                              <div className="w-2/3 h-3 rounded bg-primary/10"></div>
                            </div>
                         </div>
                         <div className="h-40 rounded-lg bg-surface/50 border border-white/5 p-4 flex flex-col justify-between">
                            <div className="w-10 h-10 rounded-full bg-pink-500/20 mb-4"></div>
                            <div className="space-y-2">
                              <div className="w-full h-3 rounded bg-primary/10"></div>
                              <div className="w-1/2 h-3 rounded bg-primary/10"></div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="h-10 rounded-lg bg-surface/50"></div>
                      <div className="h-10 rounded-lg bg-surface/50"></div>
                      <div className="h-10 rounded-lg bg-surface/50"></div>
                      <div className="h-10 rounded-lg bg-surface/50"></div>
                      <div className="h-10 rounded-lg bg-surface/50"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-muted mb-10">Join thousands of users who are learning faster and smarter.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-surface font-semibold text-lg hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 transform hover:scale-105">
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface/50 border border-border-subtle text-navy font-semibold text-lg hover:bg-primary/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              Sign In
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-page py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-500" />
            <span className="font-semibold text-muted">AI Learning Assistant</span>
          </div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} AI Learning Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
