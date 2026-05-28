/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen overflow-hidden relative py-20 bg-[#070707]">
      <div className="mx-auto max-w-7xl relative z-20 px-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-sm absolute -top-4 left-20 font-medium tracking-wider text-[#f0e8dc]/50">
            Director & Storyteller
          </p>
          <h1
            className={`z-20 text-[#f0e8dc] relative font-bold text-center tracking-[-7px] text-7xl md:text-9xl xl:tracking-[-1rem] md:tracking-[-14px] xl:text-[10rem]`}
          >
            ABOUT ME
          </h1>
          <p className="text-4xl hidden xl:block absolute -bottom-12 right-24 font-thin tracking-[6px] text-[#f0e8dc]/30">
            KIKI GAROD
          </p>
          <p className="text-4xl absolute xl:hidden -bottom-12 left-24 font-thin tracking-[6px] text-[#f0e8dc]/30">
            KIKI GAROD
          </p>
        </motion.div>

        <motion.div
          className="grid relative"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          <div className="space-y-8 pt-20 flex gap-6 justify-center">
            <div className="flex gap-6 bg-[#1a1a1a] w-full max-w-xl h-fit p-10 items-end space-y-2 text-xl font-bold md:text-2xl lg:text-3xl text-[#f0e8dc]">
              <div className="font-semibold text-xl">
                <div>/ FILM DIRECTION</div>
                <div>/ CINEMATOGRAPHY</div>
                <div>/ SCREENWRITING</div>
                <div>/ PRODUCTION</div>
              </div>
              <div className="absolute hidden md:flex left-1/2 -top-10 w-fit overflow-hidden bg-[#1a1a1a]">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop&auto=format"
                  alt="Kiki Garod"
                  className="h-100 w-full object-contain grayscale"
                />
                <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest text-[#f0e8dc]/50">
                  BASED IN MEGHALAYA, INDIA
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden left-1/2 -top-10 w-full md:w-fit overflow-hidden bg-[#1a1a1a]">
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop&auto=format"
              alt="Kiki Garod"
              className="h-100 w-full object-contain grayscale"
            />
            <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest text-[#f0e8dc]/50">
                BASED IN MEGHALAYA, INDIA
            </div>
          </div>
        </motion.div>

        <motion.div
          className="md:mt-40 mt-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        >
          <p className="mx-auto max-w-2xl font-mono text-center text-sm font-medium tracking-wide md:text-base text-[#f0e8dc]/70">
            I'M A KHASI FILM DIRECTOR AND CINEMATOGRAPHER,
            <br />
            WHO BRINGS AUTHENTIC STORIES FROM MEGHALAYA
            <br />
            TO THE GLOBAL STAGE
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center pt-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.45 }}
        >
          <a href="#works">
            <Button size={"lg"}>View Works</Button>
          </a>
        </motion.div>

        <motion.div
          className="md:flex mt-20 items-end justify-between"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
        >
          <div className="relative">
            <div className="w-60 h-36 shadow-lg border border-white/10 rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop&auto=format"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-60 h-36 absolute left-6 -top-6 shadow-lg border border-white/10 rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&auto=format"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-60 h-36 absolute left-12 -top-12 shadow-lg border border-white/10 rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop&auto=format"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center md:justify-end gap-2 text-[#f0e8dc]">
              <span className="text-lg font-medium tracking-wider">
                RECENT WORK
              </span>
              <ArrowDownRight className="size-6" />
            </div>

            <div className="mt-3 md:text-right">
              <h2 className="text-5xl uppercase tracking-[-4px] text-[#f0e8dc]">
                Stories from Meghalaya
              </h2>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute block inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(240,232,220,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(240,232,220,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
            repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </section>
  );
}
