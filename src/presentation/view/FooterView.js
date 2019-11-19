import NoticeView from "./NoticeView";
import AboutView from "./AboutView";

export default class Footer {
  constructor() {
    this._notice = new NoticeView();
    this._about = new AboutView();
  }

  topEvent() {
    this._notice.render();
  }

  aboutEvent() {
    this._about.render();
  }

  renderComponent() {
    const selector = {
      footer: "footer",
      top: "footer-top",
      about: "footer-about"
    };
    const dispatchEvent = () => {
      document
        .querySelector(`#${selector.top}`)
        .addEventListener("click", this.topEvent.bind(this));

      document
        .querySelector(`#${selector.about}`)
        .addEventListener("click", this.aboutEvent.bind(this));
    };

    const createComponent = (events => {
      const top = `
        <a href="#" id="${selector.top}" class="nav-link">Top</a>
      `;

      const about = `
        <a href="#" id="${selector.about}" class="nav-link">About</a>
      `;

      const copyright = `
        Copyright &copy;2019 HiroshiamARC, All Rights Reserved.
      `;

      document.querySelector(`#${selector.footer}`).innerHTML = `
        <footer class="py-4 bg-dark text-light">
          <div class="container text-center">
            <!-- ナビゲーション -->
            <ul class="nav justify-content-center mb-3">
              <li class="nav-item">
               ${top}
              </li>
              <li class="nav-item">
               ${about}
              </li>
            </ul>
            <!-- /ナビゲーション -->
            <p>
              <small>${copyright}</small>
            </p>
          </div>
        </footer>
      `;

      events();
    })(dispatchEvent);
  }

  render() {
    this.renderComponent();
  }
}
