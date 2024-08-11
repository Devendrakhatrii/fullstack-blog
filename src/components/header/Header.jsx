import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutBtn from "../LogoutBtn";
const Header = () => {
  const authStatus = useSelector((state) => state.status);
  const navItems = [
    { name: "Home", active: status, slug: "/" },
    { name: "Blogs", active: status, slug: "/blogs" },
    { name: "Login", active: !status, slug: "/login" },
    { name: "Sign Up", active: !status, slug: "/sign-up" },
  ];
  return (
    <nav>
      <div className="bg-slate-400 w-full h-10 flex  items-center px-10">
        <h1>Logo</h1>
        <ul>
          {navItems.map((item, index) =>
            item.active ? (
              <li key={index}>
                <Link to={item.slug}>{item.name}</Link>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
