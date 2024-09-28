export interface Danmaku {
    //弹幕id
    danmaku_id: number,
    //内容
    content: string,
    //出现时间（秒）
    progress: number,
    // 颜色
    color: number,
    // 是否已发送
    fired: boolean
}

interface DanmakuTrajectory {
    //当前轨道的弹幕
    bullets: HTMLElement[],
    //轨道距离所挂载容器的高度偏移
    top: number;
}

//弹幕基准速度，实际上速度取决于弹幕长度，越长越快
const danmakuSpeed = 144;

export class NekoDanmakuEngine {
    container: HTMLElement;
    danmakus: Danmaku[];
    hide: boolean;
    trajectorys: DanmakuTrajectory[];
    progress: number;
    timeThreadHandle: NodeJS.Timeout | null;
    constructor(container: HTMLElement) {
        this.container = container;
        this.progress = 0;
        this.timeThreadHandle = null;
        this.trajectorys = [];
        this.hide = false;
        this.danmakus = [
            {
                danmaku_id: 1,
                content: '第一条弹幕第第一条弹幕第一条弹幕第一条弹幕第一条弹幕第一条弹幕第一条弹幕第一条弹幕!',
                progress: 0,
                color: 0xffffff,
                fired: false
            },
            {
                danmaku_id: 1,
                content: '来啦！！！！！！！！',
                progress: 1,
                color: 0xffffff,
                fired: false
            },
        ]

        // for (var i = 0; i < 100; ++i) {
        //     this.danmakus.push({
        //         danmaku_id: 1,
        //         content: '测试弹幕' + i,
        //         progress: i / 10,
        //         color: 0xffffff,
        //         fired: false
        //     })
        // }

        //初始化弹幕轨道，通过创建一条不可见的弹幕用于确定弹幕元素的高度
        var exampleDanmaku = this.createDanmaku({
            danmaku_id: 0,
            content: "example",
            progress: 0,
            color: 0xffffff,
            fired: false
        }, { bullets: [], top: 0 })
        exampleDanmaku.style.opacity = '0';
        this.container.insertAdjacentElement('afterbegin', exampleDanmaku)

        //创建轨道，使用容器的70%空间作为轨道的可放置区域
        for (var i = 0; i < container.offsetHeight * 0.7 - exampleDanmaku.offsetHeight; i += exampleDanmaku.offsetHeight) {
            this.trajectorys.push({ bullets: [], top: i })
        }
        // for(var i = 0; i< 10; i++){
        //     this.trajectorys.push({ bullets: [], top: i })
        // }
        exampleDanmaku.remove();


    }

    createDanmaku(danmaku: Danmaku, trajactory: DanmakuTrajectory): HTMLElement {
        var screenSize = this.container.offsetWidth;

        var bullet = document.createElement("div")
        bullet.innerText = danmaku.content;
        // trajectory1.style = "color: #FFFFFF; font-size: 25px;position:absolute;width:fit-content;"
        bullet.style.color = "#FFFFFF"
        bullet.style.fontSize = '25px'
        bullet.style.position = "absolute";
        bullet.style.width = 'fit-content';
        bullet.style.opacity = "1";
        bullet.style.left = /*video.offsetLeft + */ screenSize + 'px';
        bullet.style.top = this.container.offsetTop + trajactory.top + "px";
        bullet.style.textShadow = "rgb(0 0 0) 1px 1px 2px, rgb(0 0 0) 0px 0px 1px";
        bullet.style.fontFamily = 'SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif';
        bullet.style.fontWeight = "bold";
        bullet.style.whiteSpace = 'nowrap';
        return bullet
    }


    onprogress(newProgress: number) {
        this.progress = newProgress;
    }

    /**
     * 暂停弹幕的移动
     */
    onpause() {
        if (this.timeThreadHandle !== null) {
            clearInterval(this.timeThreadHandle);
            this.timeThreadHandle = null;
        }

        var containerRect = this.container.getBoundingClientRect()
        for (var i = 0; i < this.trajectorys.length; ++i) {
            for (var j = 0; j < this.trajectorys[i].bullets.length; ++j) {
                var bullet = this.trajectorys[i].bullets[j];
                if (bullet !== null) {
                    var rect = bullet.getBoundingClientRect()
                    bullet.style.transition = "-webkit-transform 0s linear 0s";
                    bullet.style.transform = `translateX(-${containerRect.left + this.container.offsetWidth - rect.left}px) translateY(0px) translateZ(0px)`;
                    console.log('onpause')
                }
            }
        }
    }

    /**
     * 判断弹道是否准备发送弹幕
     * @param trajactory 弹道
     * @returns 若可发送，返回true，反之false
     */
    isTrajactoryReady(trajactory: DanmakuTrajectory): boolean {
        var bullets = trajactory.bullets;
        if (bullets.length === 0) {
            return true;
        }
        const space = 20;
        var lastElement = bullets.at(bullets.length - 1);
        if (lastElement !== undefined) {
            var containerRect = this.container.getBoundingClientRect()
            var rect = lastElement.getBoundingClientRect();
            if (rect.right + space <= containerRect.right) {
                return true;
            }
        }
        return false;
    }

    /**
     * 清除弹幕
     */
    clearBullets() {
        for (var i = 0; i < this.trajectorys.length; i++) {
            for (var j = 0; j < this.trajectorys[i].bullets.length; ++j) {
                var bullet = this.trajectorys[i].bullets[j];
                bullet.remove();
            }
            this.trajectorys[i].bullets = [];
        }
    }

    stopRender() {
        this.hide = true;

    }

    startRender() {
        this.hide = false;
    }

    onplay() {
        //check if there is paused danmaku 
        var containerRect = this.container.getBoundingClientRect()

        for (var i = 0; i < this.trajectorys.length; i++) {
            for (var j = 0; j < this.trajectorys[i].bullets.length; ++j) {
                var bullet = this.trajectorys[i].bullets[j];
                if (bullet !== null) {
                    var rect = bullet.getBoundingClientRect()
                    var remainingDistance = rect.left - containerRect.left
                    //原始速度 = （弹幕长度 + 容器宽度） / (容器宽度 /弹幕速度）
                    //恢复后的速度 = 原始速度
                    //恢复的秒数 = 剩余距离 / 原始速度
                    bullet.style.transition = `-webkit-transform ${(remainingDistance + bullet.offsetWidth) / ((bullet.offsetWidth + this.container.offsetWidth) / (this.container.offsetWidth / danmakuSpeed))}s linear 0s`;
                    bullet.style.transform = `translateX(-${this.container.offsetWidth + bullet.offsetWidth}px) translateY(0px) translateZ(0px)`;
                    console.log('onplay')
                }
            }
        }

        this.timeThreadHandle = setInterval(() => {
            if (this.hide === true) {
                return;
            }
            //select unfired danmaku
            for (var i = 0; i < this.danmakus.length; ++i) {
                if (this.danmakus[i].progress <= this.progress && this.danmakus[i].fired === false) {
                    //select trajactory

                    for (var j = 0; j < this.trajectorys.length; ++j) {
                        if (this.isTrajactoryReady(this.trajectorys[j])) {

                            this.danmakus[i].fired = true
                            var bullet = this.createDanmaku(this.danmakus[i], this.trajectorys[j])
                            bullet.ontransitionend = (ev) => {
                                this.trajectorys[j].bullets.splice(i);
                                bullet.remove()
                            }

                            this.trajectorys[j].bullets.push(bullet);
                            this.container.insertAdjacentElement('afterbegin', bullet);
                            //弹幕移动速度由弹幕长度决定
                            //每一个弹幕在容器的显示时间是固定的，即容器长度 / 弹幕速度
                            //移动距离 = 容器长度 + 弹幕长度
                            //移动速度 = 移动距离 / 显示时间
                            bullet.style.transition = `-webkit-transform ${this.container.offsetWidth / danmakuSpeed}s linear 0s`;
                            bullet.style.transform = `translateX(-${this.container.offsetWidth + bullet.offsetWidth}px) translateY(0px) translateZ(0px)`;
                            console.log(i, j, bullet.style.transition, bullet.style.transform)
                            break;
                        }
                    }
                }
            }
        }, 10)
    }

    onseek(newProgress: number) {
        this.progress = newProgress;
        this.clearBullets();
        for (var i = 0; i < this.danmakus.length; ++i) {
            if (this.danmakus[i].progress >= newProgress) {
                this.danmakus[i].fired = false;
            }
        }
    }

    oncontainerchange() {
        this.onpause();
        this.onplay();
    }

    insertDanmaku(danmaku: Danmaku){
        this.danmakus.push(danmaku);
    }

    destory() {
        if (this.timeThreadHandle !== null) {
            clearInterval(this.timeThreadHandle)
        }
    }
}
