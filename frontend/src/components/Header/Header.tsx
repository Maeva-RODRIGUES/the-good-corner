import CategoriesButtons from "./CategoriesButtons";
import NavBar from "./NavBar";

function Header() {
  return (
    <div>
      <div className="flex justify-left items-center gap-8">
        <NavBar />
      </div>
      <div>
        <CategoriesButtons />
      </div>
    </div>
  );
}

export default Header;
