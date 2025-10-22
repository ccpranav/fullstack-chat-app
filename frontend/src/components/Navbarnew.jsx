"use client";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { useState } from "react";

export default function NavbarDemo() {
  const { authUser, logout } = useAuthStore();
  const navItems = authUser
    ? [
        {
          name: "Call",
          link: "#features",
        },
        {
          name: "New Chat",
          link: "#pricing",
        },
        {
          name: "Settings",
          link: "/settings",
        },
      ]
    : [
        {
          name: "About",
          link: "#features",
        },
        {
          name: "Settings",
          link: "/settings",
        },
      ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />

          <div className="flex items-center gap-4">
            {authUser ? (
              <>
                <NavbarButton variant="secondary">Profile</NavbarButton>
                <NavbarButton variant="primary" onClick={logout}>
                  Logout
                </NavbarButton>
              </>
            ) : (
              <>
                <Link to="/loginnew">
                  <NavbarButton variant="secondary">Sign In</NavbarButton>
                </Link>
                <Link to="/signupnew">
                  <NavbarButton variant="primary">Create Account</NavbarButton>
                </Link>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                // onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {authUser ? (
                <>
                  <Link to="/profile">
                    <NavbarButton
                      // onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="w-full"
                    >
                      Profile
                    </NavbarButton>
                  </Link>

                  <NavbarButton
                    // onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                    onClick={logout}
                  >
                    Logout
                  </NavbarButton>
                </>
              ) : (
                <>
                  <Link to="/loginnew">
                    <NavbarButton
                      // onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="w-full"
                    >
                      Login
                    </NavbarButton>
                  </Link>
                  <Link to="/signupnew">
                    <NavbarButton
                      // onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="w-full"
                    >
                      Create Account
                    </NavbarButton>
                  </Link>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}
