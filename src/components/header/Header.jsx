import { useSelector } from "react-redux";
const Header = () => {
  // const status = useSelector((state) => state.status);
  const status = true;
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
            item.active ? <li key={index}>{item.name}</li> : null
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
