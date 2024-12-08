/*
The constraint of microsoft powerpoint is too much

So i decided to create slides in html instead

Because css rocks :D
*/

const contents = {
    title: {
        group: "Nhóm 6",
        t1: "Phần mềm quản lý",
        t2: "Cửa hàng bách hóa"
    },

    member: {
        1: "Đỗ Trần Hiếu Anh",
        2: "Nguyễn Khánh An",
        3: "Đặng Hải Anh",
        4: "Nguyễn Hoàng Minh",
        5: "Đậu Huy Trung",
        6: "Đặng Đức Anh",
        7: "Bùi Huy Hoàng",
        8: "Trần Đình Chiểu"
    }
};

const assets = {
    store: "assets/store.jpg"
};

class GlbDiv {
    constructor(idx, imgNum, pNum, bxNum, divNum) {
        this.glb = document.createElement("label");

        this.idx = idx;
        this.imgNum = imgNum;
        this.pNum = pNum;
        this.bxNum = bxNum;
        this.divNum = divNum;

        this.img = [];
        this.p = [];
        this.bx = []; // Boxicons icons
        this.div = []; // Child divs

        this.init();
    }

    init() {
        // Set class: <type>-<idx>
        for (let i = 0; i < this.imgNum; i++) {
            this.img.push(document.createElement("img"));
            this.img[i].className = `img img-${i}`;
        }
        for (let i = 0; i < this.pNum; i++) {
            this.p.push(document.createElement("p"));
            this.p[i].className = `p p-${i}`;
        }
        for (let i = 0; i < this.divNum; i++) {
            this.div.push(new GlbDiv(i, 1, 5, 5, 0));
            this.div[i].glb.className = `div div-${i}`;
            this.div[i].glb.style.display = "none";
        }
        for (let i = 0; i < this.bxNum; i++) {
            this.bx.push(document.createElement("i"));
            this.bx[i].className = `bx bx-${i}`;
        }

        // Append elements to div
        for (let i = 0; i < this.imgNum; i++) {
            this.glb.appendChild(this.img[i]);
        }
        for (let i = 0; i < this.divNum; i++) {
            this.glb.appendChild(this.div[i].glb);
        }
        for (let i = 0; i < this.bxNum; i++) {
            this.glb.appendChild(this.bx[i]);
        }
        for (let i = 0; i < this.pNum; i++) {
            this.glb.appendChild(this.p[i]);
        }
    }

    cleanP() {
        for (let i = 0; i < this.pNum; i++) {
            this.p[i].innerHTML = "";
            this.p[i].className = `p p-${i}`;
        }
    }
    cleanDiv() {
        for (let i = 0; i < this.divNum; i++) {
            this.div[i].innerHTML = "";
            this.div[i].className = `div div-${i}`;
        }
    }
    cleanImg() { // Not really necessary
        for (let i = 0; i < this.imgNum; i++) {
            this.img[i].src = "";
            this.img[i].className = `img img-${i}`;
        }
    }
    cleanBx() {
        for (let i = 0; i < this.bxNum; i++) {
            this.bx[i].className = "bx";
        }
    }
}

class PowerPoint {
    constructor() {
        // Settings
        this.sIdx = -1; // Idx: [0, sNum)
        this.sNum = 50;

        // Elements per glb div
        this.glbNum = 10;
        this.imgNum = 5;
        this.pNum = 16;
        this.bxNum = 10;
        this.divNum = 10;

        // Elements
        this.ppt = document.getElementById("powerpoint");
        this.glb = [];

        // Init
        this.init();
    }

    init() {
        for (let i = 0; i < this.glbNum; i++) {
            this.glb.push(new GlbDiv(
                i, this.imgNum, this.pNum, this.bxNum, this.divNum 
            ));
            this.glb[i].glb.className = `glb glb-${i}`;

            this.ppt.appendChild(this.glb[i].glb);
        }
    }

    moveRight(right=true) {
        // Your "PowerPoint" here

        if (right) this.sIdx = (this.sIdx + 1) % this.sNum;
        else       this.sIdx = (this.sIdx - 1 + this.sNum) % this.sNum; // In case of negative  

        this.ppt.className = `slide-${this.sIdx}`;

        // Turn off every child div by default since they are very dangerous
        // to be left on
        for (let i = 0; i < this.glbNum; i++) {
            for (let j = 0; j < this.divNum; j++) {
                this.glb[i].div[j].glb.style.display = "none";
            }
        }

        switch (this.sIdx) {
            // Title screen
            case 0:
                this.glb[1].p[0].innerHTML = contents.title.group;
                this.glb[1].p[1].innerHTML = contents.title.t1;
                this.glb[1].p[2].innerHTML = contents.title.t2;

                // 8 members
                this.glb[2].p[0].innerHTML = "Thành viên";
                for (let i = 1; i < 9; i++) {
                    this.glb[2].p[i].innerHTML = contents.member[i];
                    this.glb[2].p[i].style.transform = `scale(0)`;
                }

                break;

            // Member introduction
            case 1:
                this.glb[1].p[0].innerHTML = contents.title.group;
                this.glb[1].p[1].innerHTML = contents.title.t1;
                this.glb[1].p[2].innerHTML = contents.title.t2;

                // 8 members
                this.glb[2].p[0].innerHTML = "Thành viên";
                for (let i = 1; i < 9; i++) {
                    this.glb[2].p[i].innerHTML = contents.member[i];
                    this.glb[2].p[i].style.transform = `scale(1)`;
                    this.glb[2].p[i].style.transition = `.${i}s ease`;
                    this.glb[2].p[i].classList.add("custom-p-1");
                }

                break;
            
            // Table of contents
            case 2:
                for (let i = 6; i < 10; i++) {
                    this.glb[i].cleanBx();
                    this.glb[i].cleanP();
                    this.glb[i].cleanImg();

                    this.glb[i].p[0].classList.add("custom-p-1");
                }

                this.glb[5].p[0].innerHTML = "Nội dung";
                break;

            case 3:
                this.glb[1].cleanP();
                this.glb[2].cleanP();
                this.glb[5].p[0].innerHTML = "Nội dung";

                for (let i = 6; i < 10; i++) {
                    this.glb[i].cleanBx();
                    this.glb[i].cleanP();

                    this.glb[i].p[0].classList.add("custom-p-1");
                }

                this.glb[6].bx[0].className = "bx bx-cart-alt custom-bx-1";
                this.glb[6].p[0].innerHTML = "1. Quản lý sản phẩm";

                this.glb[7].bx[0].className = "bx bx-cart custom-bx-1";
                this.glb[7].p[0].innerHTML = "2. Tạo đơn hàng mới"; 

                this.glb[8].bx[0].className = "bx bx-credit-card-alt custom-bx-1";
                this.glb[8].p[0].innerHTML = "3. Quản lý hóa đơn";

                this.glb[9].bx[0].className = "bx bx-bar-chart-alt custom-bx-1";
                this.glb[9].p[0].innerHTML = "4. Thống kê";
                break;

            case 4:
                this.glb[0].cleanImg();
                this.glb[0].img[0].src = assets.store;

                break;

            case 5:
                // Clean everything previous
                for (let i = 1; i < this.glbNum; i++) {
                    this.glb[i].cleanP();
                    this.glb[i].cleanBx();
                }

                this.glb[0].bx[0].className = "bx bx-cart-alt bx-0";
                this.glb[0].p[0].innerHTML = "1. Quản lý sản phẩm";

                break;

            case 6:
                this.glb[0].p[0].setAttribute("data-glitch", "Product Management");
                glitchActivate(this.glb[0].p[0], 10);

                for (let i = 0; i < 4; i++) {
                    this.glb[1].div[i].glb.style.display = "flex";
                }   

                this.glb[1].div[0].bx[0].className = "bx bx-search bx-0";
                this.glb[1].div[0].p[0].innerHTML = "Tìm kiếm sản phẩm";
                this.glb[1].div[0].p[1].innerHTML = "Công cụ tìm kiếm hiện đại";
                this.glb[1].div[0].p[2].innerHTML = "với nhiều tiêu chí";

                this.glb[1].div[1].bx[0].className = "bx bx-plus bx-0";
                this.glb[1].div[1].p[0].innerHTML = "Thêm sản phẩm";
                this.glb[1].div[1].p[1].innerHTML = "Thao tác thêm mới dễ dàng";
                this.glb[1].div[1].p[2].innerHTML = "và nhanh chóng";

                this.glb[1].div[2].bx[0].className = "bx bx-trash bx-0";
                this.glb[1].div[2].p[0].innerHTML = "Xóa sản phẩm";
                this.glb[1].div[2].p[1].innerHTML = "Khả năng xóa sản phẩm";
                this.glb[1].div[2].p[2].innerHTML = "một cách dễ dàng";

                this.glb[1].div[3].bx[0].className = "bx bx-edit bx-0";
                this.glb[1].div[3].p[0].innerHTML = "Sửa sản phẩm";
                this.glb[1].div[3].p[1].innerHTML = "Chỉnh sửa thông tin sản phẩm";
                this.glb[1].div[3].p[2].innerHTML = "một cách linh hoạt chi tiết";

                break;

            case 7:
                this.glb[0].p[0].setAttribute("data-glitch", "Product Management");
                glitchActivate(this.glb[0].p[0], 10);

                for (let i = 0; i < 7; i++) {
                    this.glb[1].div[i].glb.style.display = "flex";
                }

                this.glb[1].div[4].bx[0].className = "bx bx-edit-alt bx-0";
                this.glb[1].div[4].p[0].innerHTML = "Tìm kiếm theo Tên sản phẩm";

                this.glb[1].div[5].bx[0].className = "bx bx-edit bx-0";
                this.glb[1].div[5].p[0].innerHTML = "Tìm kiếm theo Giá sản phẩm";

                this.glb[1].div[6].bx[0].className = "bx bx-barcode bx-0";
                this.glb[1].div[6].p[0].innerHTML = "Tìm kiếm bằng Mã vạch barcode";
                this.glb[1].div[6].p[1].innerHTML = "Sử dụng thư viện nhận dạng hình ảnh";
                this.glb[1].div[6].p[2].innerHTML = "giúp tìm kiếm bằng mã vạch nhanh chóng";

                break;

            case 8:

                this.glb[1].div[0].glb.style.display = "flex";
                this.glb[1].div[0].p[1].innerHTML = "";
                this.glb[1].div[0].p[2].innerHTML = "";
                for (let i = 0; i < 3; i++) {
                    this.glb[1].div[i + 4].glb.style.display = "flex";
                }

                break;

            case 9:
                for (let i = 0; i < 4; i++) {
                    this.glb[1].div[i + 4].glb.style.display = "flex";
                }
        }

        // Rename the tab to Slide <n>
        document.title = `Slide ${this.sIdx}`;
    }
}

const powerpoint = new PowerPoint();
powerpoint.moveRight();