export default class Message {
  constructor() {}

  static get WARNING() {
    return 1;
  }
  static get SUCCESS() {
    return 2;
  }
  static get DANGER() {
    return 3;
  }

  static get selectorId() {
    return "app__message";
  }

  static create(message, type) {
    switch (type) {
      case 1:
        return `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
              `;
      case 2:
        return `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
              `;
      case 3:
        return `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
              `;
      default:
        return `
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
              `;
    }
  }

  clear() {
    document.querySelector(`#${Message.selectorId}`).innerHTML = "";
  }

  render(message, type) {
    document.querySelector(`#${Message.selectorId}`).innerHTML = Message.create(
      message,
      type
    );
  }
}
