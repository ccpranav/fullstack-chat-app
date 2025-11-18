import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MenuToggleIcon } from "./MenuToggleIcon";
import { Button, buttonVariants } from "./ui/Button";
import useScroll from "../hooks/useScroll";
import { cn } from "../lib/utils";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

export default function Header() {
  const { authUser, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);

  // const links = [
  //   { label: "Featuresss", href: "/features" },
  //   { label: "About", href: "/about" },
  //   { label: "Settings", href: "/settings" },
  // ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-transparent border-b bg-black/60",
        scrolled &&
          "border-gray-700 bg-black/80 backdrop-blur-lg supports-[backdrop-filter]:bg-black/60"
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2 rounded-md p-2 transition-transform duration-200 hover:scale-105">
          {/* <WordmarkIcon className="h-4" /> */}
          <Link to="/">
            <img src={logo} alt="Logo" className="h-6 w-auto " loading="lazy" />
          </Link>
          <a href="/" className="text-white font-semibold ">
            CharLando
          </a>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          {/* {links.map((link, i) => (
            <a
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "hover:bg-white/70 hover:text-black/70 transition-colors "
              )}
              href={link.href}
              key={i}
            >
              {link.label}
            </a>
          ))} */}
          {!authUser ? (
            <>
              <Link to={"/login"}>
                {" "}
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to={"/signup"}>
                <Button>Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/profile"}>
                {" "}
                <Button variant="outline">Profile</Button>
              </Link>
              <Button onClick={logout}>Logout</Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <Button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          size="icon"
          variant="outline"
        >
          <MenuToggleIcon className="size-5" duration={300} open={open} />
        </Button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu className="flex flex-col justify-between gap-2" open={open}>
        <div className="grid gap-y-2">
          {/* {links.map((link) => (
            <a
              onClick={() => setOpen(false)}
              className={buttonVariants({
                variant: "ghost",
                className: "justify-start",
              })}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))} */}
        </div>
        <div className="flex flex-col gap-2">
          {!authUser ? (
            <>
              <Link to={"/login"}>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="w-full" onClick={() => setOpen(false)}>
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/"}>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Chats
                </Button>
              </Link>
              // todo: After logout close navbar in mobile
              <Button className="w-full" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </MobileMenu>
    </header>
  );
}

function MobileMenu({ open, children, className, ...props }) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      className={cn(
        "bg-black/80 backdrop-blur-lg supports-[backdrop-filter]:bg-black/60",
        "fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden"
      )}
      id="mobile-menu"
    >
      <div
        className={cn(
          "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
          "size-full p-4",
          className
        )}
        data-slot={open ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
