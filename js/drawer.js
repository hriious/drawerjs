//Model


const state = {
    drawer: {}
}

//title=抽屉标题
//buttons=（可选，默认为 'Ok'）按钮数组和每个按钮的回调函数。回调可选。例如。 [{label: "OK", callback: function(){}},{label: "Cancel"}]
//direction=(可选，默认为'rtl'),抽屉打开方向
//size = (可选，默认为Drawer._size) 自定义打开大小
//baseUrl = (可选, 默认为 getClientUrl) CRM 的基本 url (仅当无法访问 Xrm.Page 时才需要)
//showClose = (可选，默认为 false) 隐藏右上角的“X”，意味着你只能使用按钮关闭警报
//wrapperClosable = (可选，默认为 true) 点击遮罩层是否可以关闭 Drawer
//padding = (可选，默认为 20) 设置抽屉周围的内填充量。设置为 0 表示无填充（在 iframe 等上）

const loadDrawer = function (drawer) {
    state.drawer = {
        title: drawer.title,
        buttons: drawer.buttons || [],
        size: drawer.size || '30',
        direction: drawer.direction || 'rtl',
        baseUrl: drawer.baseUrl || Xrm.Page.context.getClientUrl(),
        webresource: drawer.webresource || ''
    }
    console.log('💖💖💖' + state)
}



//View
class DrawerView {
    $_ = window.top.document
    #drawerContentEle = this.$_.querySelector('.drawer__content')
    #drawerEle = this.$_.querySelector('.drawer')
    #containerEle = this.$_.querySelector('.drawer__container')
    #wrapperEle = this.$_.querySelector('.drawer__wrapper')
    #titleEle = this.$_.querySelector('.drawer__header-title')
    #footerEle = this.$_.querySelector('.drawer__footer')
    #closeiconEle = this.$_.querySelector('.drawer__header-close')
    #iframeEle = this.$_.querySelector('.drawer__content-iframe')

    #data
    #prefix = 'vy_'
    #rootUrl = Xrm.Page.context.getClientUrl()

    init() {
        this.#appendToBody();
    }

    render(data) {
        this.#data = data;

        this.#generateDrawer();
    }

    #clearContent() {
        this.#drawerContentEle.innerHTML = "";
    }

    #appendToBody() {
        if (this.#wrapperEle) return;
        const wrapper =
            `<div class="drawer__wrapper">
             <link rel="stylesheet" href="${this.#rootUrl}/WebResources/${this.#prefix}/components/drawer/css/drawer.css">
                <div class="drawer__container" role="document">
                    <div class="drawer">
                        <header class="drawer__header">
                            <div class="drawer__header-title"></div>
                            <div class="drawer__header-close">
                                <img class="drawer__header-closeicon" src="${this.#rootUrl}/WebResources/${this.#prefix}/components/drawer/img/close.svg"></img>
                            </div>
                        </header>
                        <main class="drawer__content">
                        </main>
                        <footer class="drawer__footer">
                        </footer>
                    </div>
                </div>
            </div>`;
        this.$_.body.insertAdjacentHTML("beforeEnd", wrapper);
    }

    #close() {
        this.#containerEle.classList.remove('drawer__open')
        this.#wrapperEle.classList.add("drawer__close");
        setTimeout(() => {
            this.#wrapperEle.style.display = "none";
        }, 250);
    }

    #generateDrawer() {
        //title
        this.#titleEle.innerHTML = this.#data.title;

        //closeicon
        (() => {
            this.#closeiconEle.onclick = () => {
                this.#close()
            }
        })();

        //drawer
        this.#drawerEle.classList.add(this.#data.direction);
        this.#drawerEle.style.width = this.#data.size;

        //container
        this.#containerEle.classList.add('drawer__open');

        //footer
        this.#footerEle.innerHTML = "";

        let confirmBtn = document.createElement('button')
        confirmBtn.classList.add('drawer__footer-confirm')
        confirmBtn.innerHTML = this.#data.buttons.confirm.title;

        this.#footerEle.insertAdjacentElement("beforeEnd", confirmBtn)

        let cancelBtn = document.createElement('button')
        cancelBtn.classList.add('drawer__footer-cancel')
        cancelBtn.innerHTML = this.#data.buttons.cancel.title;

        this.#footerEle.insertAdjacentElement("beforeEnd", cancelBtn);

        //content
        this.#generateSpiner();

        this.#generateIframe();

        const iframeWindow = this.$_.querySelector('.drawer__content-iframe').contentWindow;

        //btn_EventHandler
        (() => {
            confirmBtn.onclick = () => {
                const f = this.#data.buttons.confirm.callback(iframeWindow);

                if (f) this.#close()
            };
            cancelBtn.onclick = () => {
                this.#data.buttons.cancel.callback(iframeWindow);
                this.#close()
            };
        })();

        //wrapper
        setTimeout(() => {
            this.#wrapperEle.style.display = "block";
        }, 100);
    }

    #generateSpiner() {
        this.#clearContent();
        const spiner = `<img class="drawer__content-spiner" src="${this.#data.baseUrl}/WebResources/${this.#prefix}/components/drawer/img/load.svg"></img>`;

        this.#drawerContentEle.insertAdjacentHTML("beforeEnd", spiner);
    }

    #generateIframe() {
        this.#clearContent();
        const iframe = `<iframe src="${this.#data.baseUrl}/${this.#data.webresource}" frameborder="0" class="drawer__content-iframe"></iframe>`;

        this.#drawerContentEle.insertAdjacentHTML("beforeEnd", iframe);
    }

}



//Controller
const controllDrawer = function (data) {
    const { drawer } = data

    //1
    loadDrawer(drawer);

    //2
    const drawerView = new DrawerView();
    drawerView.render(state.drawer);
}

const Init = function () {
    const drawerView = new DrawerView();
    drawerView.init();
}

window.top.controllDrawer = controllDrawer;

Init();

