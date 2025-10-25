import PillNav from "./ui/PillNav";
import logo from "../assets/image.png";
import { useAuthStore } from "../store/useAuthStore";

export default function NewNav() {
  const { logout, authUser } = useAuthStore();
  const items = authUser
    ? [
        { label: "Home", href: "/" },
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
        { label: "Log Out", onClick: logout },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Sign In", href: "/loginnew" },
        { label: "Create Account", href: "/signupnew" },
      ];
  return (
    <PillNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      activeHref="/"
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="#fff"
      pillColor="#060010"
      hoveredPillTextColor="#060010"
      pillTextColor="#ffffff"
    />
  );
}
