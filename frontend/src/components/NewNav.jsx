import PillNav from "./ui/PillNav";
import logo from "../assets/logo.png";

export default function NewNav() {
  return (
    <PillNav
      logo={logo}
      logoAlt="Company Logo"
      items={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
      ]}
      activeHref="/"
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="#000000"
      pillColor="#ffffff"
      hoveredPillTextColor="#ffffff"
      pillTextColor="#000000"
    />
  );
}
