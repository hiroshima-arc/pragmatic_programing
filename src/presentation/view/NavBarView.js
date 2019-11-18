import FizzBuzzView from "./fizz-buzz/FizzBuzzView";

export default class NavBarView {
  constructor() {
    this._fizzBuzzView = new FizzBuzzView();
  }

  fizzBuzzEvent(e) {
    this._fizzBuzzView.render();
  }

  renderComponent() {
    const selector = {
      fizzBuzz: "fizz-buzz-app-menu"
    };

    const dispatchEvent = () => {
      document
        .querySelector(`#${selector.fizzBuzz}`)
        .addEventListener("click", this.fizzBuzzEvent.bind(this));
    };

    const createComponent = (events => {
      const fizzBuzz = `
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a href="#" id="${selector.fizzBuzz}" class="dropdown-item">FizzBuzz</a>
        </div>
      `;
      document.querySelector("#navbar").innerHTML = `
        <nav class="navbar navbar-expand-md navbar-dark bg-dark stick-top">
          <!-- サブコンポーネント -->
          <div class="container">
            <a href="index.html" class="navbar-brand">Etude</a>
            <!-- 切り替えボタン -->
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-content"
              aria-controls="navbar-content"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <!-- ナビゲーション -->
            <div class="collapse navbar-collapse" id="navbar-content">
              <!-- ナビゲーションメニュー -->
              <!-- 左側メニュー: トップページの各コンテンツへのリンク -->
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a href="#" class="nav-link"
                    >Top <span class="sr-only">(current)</span></a
                  >
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">About</a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-hhaspopup="true"
                    aria-expanded="false"
                  >
                    Contents
                  </a>
                  ${fizzBuzz}
                </li>
              </ul>
              <!-- /ナビゲーションメニュー -->
            </div>
          </div>
          <!-- サブコンポーネント -->
        </nav>
      `;
      events();
    })(dispatchEvent);

    const render = () => {
      createComponent();
    };
  }
  render() {
    this.renderComponent();
  }
}
