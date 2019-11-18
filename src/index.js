import NavBar from "./presentation/view/NavBarView";
import Notice from "./presentation/view/NoticeView";

document.addEventListener("DOMContentLoaded", e => {
  const navbar = new NavBar();
  navbar.render();
  const notice = new Notice();
  notice.render();

  if (process.env.NODE_ENV === "production") {
    if (document.getElementById("dev")) {
      document.getElementById("dev").style.display = "none";
    }
  }
});
