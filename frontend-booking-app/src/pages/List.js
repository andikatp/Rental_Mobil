import { FooterPart, NavBarPart } from "../components/common";
import { ListPart } from "../components/list-page";

const List = () => {
  return (
    <>
      <div className="app">
        <header>
          <div className="navbar">
            <NavBarPart />
          </div>
        </header>
        <div className="list">
          <ListPart />
        </div>
        <div className="footer">
          <FooterPart />
        </div>
      </div>
    </>
  );
};

export default List;
