'use client'

import React, { useState, useEffect } from 'react';
import { Play, Circle, Share2, Zap, Shield, Users, ArrowRight, Star, Check } from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const ScreenDropLanding = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSignIn = async () => {
    try {
      return await authClient.signIn.social({ provider: "google" })
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string' &&
        (err as { message: string }).message.toLowerCase().includes('rate limit')
      ) {
        toast.error('Rate limit exceeded. Please wait before trying again.')
        return
      }
      console.error(err)
      toast.error('Sign-in failed. Please try again.')
    }
  };

  const features = [
    {
      icon: <Circle className="w-6 h-6" />,
      title: "Instant Recording",
      description: "Start recording with one click. No setup, no delays."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Share Anywhere",
      description: "Generate shareable links instantly. Works on any device."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Ultra-fast processing and sharing. No waiting around."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your recordings are encrypted and protected."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer at Stripe",
      content: "ScreenDrop has revolutionized how I share design feedback. It's incredibly intuitive.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Engineering Manager",
      content: "Perfect for quick bug reports and code reviews. Our team productivity has increased 40%.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Lisa Thompson",
      role: "Content Creator",
      content: "The quality is amazing and sharing is effortless. Exactly what I needed.",
      rating: 5,
      avatar: "LT"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`
        }}
      />
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <nav className="relative z-10 flex items-center justify-between p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <Image src="/assets/icons/logo.svg" alt="logo" height={40} width={40} />
          <span className="text-2xl font-bold">
            <span className="text-blue-400">Screen</span>
            <span className="text-purple-400">Drop</span>
          </span>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto px-6 pt-20 pb-32 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-8">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm">Lightning fast screen recording</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Record. Share.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Collaborate.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The fastest way to capture, share, and collaborate with screen recordings. 
              No downloads, no complexity - just pure simplicity that works everywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                onClick={handleSignIn}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center"
              >
                <Image src="/assets/icons/google.svg" alt="Google" width={20} height={20} className="mr-3" />
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 px-6 py-4">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
            
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-3xl" />
              <div className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:scale-105 transition-transform duration-700">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Circle className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-bounce" />
                    <p className="text-gray-400">Your screen recording preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ScreenDrop?</h2>
            <p className="text-gray-400 text-lg">Everything you need for seamless screen recording</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Professionals</h2>
            <p className="text-gray-400 text-lg">Join thousands of satisfied users</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Recording?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who've made the switch to effortless screen recording
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleSignIn}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center"
              >
                <img src="/assets/icons/google.svg" alt="Google" className="w-5 h-5 mr-3" />
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex items-center justify-center mt-6 text-sm text-gray-400">
              <Check className="w-4 h-4 mr-2 text-green-400" />
              No credit card required
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/assets/icons/logo.svg" alt="logo" height={32} width={32} />
            <span className="text-lg font-semibold">
              <span className="text-blue-400">Screen</span>
              <span className="text-purple-400">Drop</span>
            </span>
          </div>
          <p>©ScreenDrop {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default ScreenDropLanding;