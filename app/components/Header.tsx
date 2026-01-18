"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#", active: true },
  { name: "Productos", href: "#productos" },
  { name: "Beneficios Nutricionales", href: "#beneficios" },
  { name: "Experiencias", href: "#experiencias" },
  { name: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main navbar container */}
      <div className="relative">
        {/* Background bar for navigation - transparent to show gradient */}
        <div className="absolute inset-0 bg-transparent" />

        {/* Content wrapper */}
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center">

            {/* Logo Section - Left aligned */}
            <a
              href="#"
              className="group relative flex items-center py-3 shrink-0"
            >
              {/* Warm glow effect behind logo on hover */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-600/20 via-orange-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Logo image */}
              <Image
                src="/sabrocados-logo.png"
                alt="Sabrocados"
                width={320}
                height={100}
                className="relative h-20 w-auto drop-shadow-[0_2px_10px_rgba(180,120,60,0.3)] transition-transform duration-500 group-hover:scale-105 lg:h-24"
                priority
              />
            </a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`
                        relative px-5 py-2.5 text-sm font-medium tracking-wide
                        transition-all duration-300 rounded-full
                        ${link.active
                          ? "text-emerald-400"
                          : "text-neutral-400 hover:text-white"
                        }
                      `}
                    >
                      {/* Active indicator background */}
                      {link.active && (
                        <span className="absolute inset-0 rounded-full bg-emerald-500/15 border border-emerald-500/20" />
                      )}

                      {/* Hover background */}
                      <span className="absolute inset-0 rounded-full bg-white/0 hover:bg-white/5 transition-colors duration-300" />

                      <span className="relative">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right spacer to balance logo width - keeps nav centered */}
            <div className="hidden lg:block w-[200px] shrink-0" />

            {/* Mobile Menu Button */}
            <button
              className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white lg:hidden transition-colors hover:bg-white/10 ml-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden overflow-hidden transition-all duration-500 ease-out
          ${mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="bg-[#0A0A0A]/98 backdrop-blur-xl border-b border-white/5 px-4 py-6">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms"
                }}
                className={`
                  transform transition-all duration-300
                  ${mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}
                `}
              >
                <a
                  href={link.href}
                  className={`
                    block rounded-xl px-5 py-4 text-base font-medium
                    transition-all duration-300
                    ${link.active
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
