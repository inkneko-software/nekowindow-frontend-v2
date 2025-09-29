/**
 *   {
    "danmaku_id": 97,
    "content": "有内味了",
    "progress": 18.19,
    "color": 6844407,
    "fired": false
  },
 */

  import { Configuration, DanmakuControllerApi } from "@api/codegen/danmaku";

  export interface DanmakuBullet {
      //弹幕id
      danmaku_id: number,
      //内容
      content: string,
      //出现时间（秒）
      progress: number,
      // 颜色
      color: number,
      // 是否已发送
      fired: boolean,
  
      // HTML元素
      element?: HTMLElement,
      // 弹幕发送时间
      fired_at?: number,
      // 弹幕持续时间
      duration?: number,
      //通过的速度
      speed?: number,
  }
  
  interface DanmakuTrajectory {
      //当前轨道的弹幕
      bullets: DanmakuBullet[],
      //轨道距离所挂载容器的高度偏移
      top: number
  }
  
  //弹幕基准速度，实际上速度取决于弹幕长度，越长越快
  const bulletSpeedFactor = 168;
  
  export default class NekoDanmakuEngine {
      //挂载容器
      container: HTMLElement;
      //弹幕池
      bullets: DanmakuBullet[];
      //显示状态
      hide: boolean;
      //弹道。在HTML中实际上是一个相对于容器顶部的偏移值，即bullet.offsetTop
      trajectorys: DanmakuTrajectory[];
      //当前挂载容器的播放进度
      progress: number;
      //定时器句柄
      timeThreadHandle: NodeJS.Timeout | null;
      constructor(container: HTMLElement, videoResourceId: number) {
          this.container = container;
          this.progress = 0;
          this.timeThreadHandle = null;
          this.trajectorys = [];
          this.hide = false;
          this.bullets = [];
          var danmakuAPI = new DanmakuControllerApi(new Configuration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))
          
          danmakuAPI.getChatRoomByVideoResourceId({videoResourceId: videoResourceId}).then(res => {
              if (res.code !== 0 || res.data === null || res.data === undefined) {
                  return;
              }
              var chatRoomId = res.data.chatId;
              if (chatRoomId === null || chatRoomId === undefined) {
                  return;
              }
              
              danmakuAPI.getRecentDanmakuList({chatRoomId: chatRoomId}).then(res => {
                  if (res.data === null || res.data === undefined) {
                    return;
                  }
                  
                  this.bullets = res.data.map(item => ({
                    danmaku_id: item.messageId,
                    content: item.content,
                    progress: item.progress,
                    color: item.colorHex,
                    fired: false
                  }))
                })
          })
  
          
  
          // for (var i = 0; i < 100; ++i) {
          //     this.danmakus.push({
          //         danmaku_id: 1,
          //         content: '测试弹幕CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC' + i,
          //         progress: i / 2,
          //         color: 0xffffff,
          //         fired: false
          //     })
          // }
  
          //初始化弹幕轨道，通过创建一条不可见的弹幕用于确定弹幕元素的高度
          var exampleDanmaku = this.createBulletHTMLElement({
              danmaku_id: 0,
              content: "example",
              progress: 0,
              color: 0xffffff,
              fired: false
          })
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
  
      /**
       * 创建弹幕的HTML元素
       * 
       * @param bullet 弹幕内容
       * @returns HTML元素
       */
      createBulletHTMLElement(bullet: DanmakuBullet): HTMLElement {
          var screenSize = this.container.offsetWidth;
  
          var bulletElement = document.createElement("div")
          bulletElement.innerText = bullet.content;
          // trajectory1.style = "color: #FFFFFF; font-size: 25px;position:absolute;width:fit-content;"
          bulletElement.style.color = "#FFFFFF"
          bulletElement.style.fontSize = '25px'
          bulletElement.style.position = "absolute";
          bulletElement.style.width = 'fit-content';
          bulletElement.style.opacity = "1";
          bulletElement.style.left = /*video.offsetLeft + */ screenSize + 'px';
          bulletElement.style.textShadow = "rgb(0 0 0) 1px 1px 2px, rgb(0 0 0) 0px 0px 1px";
          bulletElement.style.fontFamily = 'SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif';
          bulletElement.style.fontWeight = "bold";
          bulletElement.style.whiteSpace = 'nowrap';
          return bulletElement
      }
  
      /**
       * 用于容器元素向本引擎告知当前的播放进度
       * 
       * @param newProgress 进度
       */
      onprogress(newProgress: number) {
          this.progress = newProgress;
      }
  
      /**
       * 用于容器向本引擎告知播放已暂停
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
                  if (bullet !== null && bullet.element !== undefined) {
                      var element = bullet.element;
                      var rect = element.getBoundingClientRect()
                      element.style.transition = "-webkit-transform 0s linear 0s";
                      element.style.transform = `translateX(-${containerRect.left + this.container.offsetWidth - rect.left}px) translateY(0px) translateZ(0px)`;
                      console.log('onpause')
                  }
              }
          }
      }
  
      /**
       * 判断弹道是否准备发送弹幕
       * 
       * @param trajactory 目标弹道
       * @param nextBullet 下一个弹幕
       * @returns 若可发送，返回true，反之false
       */
      isTrajactoryReady(trajactory: DanmakuTrajectory, nextBullet: DanmakuBullet): boolean {
          if (trajactory.bullets.length === 0) {
              return true;
          }
          if (nextBullet.duration === undefined || nextBullet.speed === undefined) {
              return false;
          }
  
          var lastBullet = trajactory.bullets.at(-1);
  
          if (lastBullet !== undefined && lastBullet.element !== undefined) {
              if (lastBullet.fired_at !== undefined && lastBullet.duration !== undefined && lastBullet.speed !== undefined) {
                  var latBulletMovedDistance = (this.progress - lastBullet.fired_at) * lastBullet.speed;
                  if (latBulletMovedDistance < lastBullet.element.offsetWidth) {
                      return false;
                  }
                  var remainTime = lastBullet.duration - (this.progress - lastBullet.fired_at);
                  var nextBulletLeftSidePassTime = this.container.offsetWidth / nextBullet.speed
                  if (remainTime + 0.2> nextBulletLeftSidePassTime) {
                      return false;
                  }
              }
          }
  
          return true;
      }
  
      /**
       * 清除弹幕
       */
      clearBullets() {
          for (var i = 0; i < this.trajectorys.length; i++) {
              for (var j = 0; j < this.trajectorys[i].bullets.length; ++j) {
                  var bullet = this.trajectorys[i].bullets[j];
                  if (bullet.element !== undefined) {
                      bullet.element.remove();
                  }
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
                  var bullet = this.trajectorys[i].bullets[j].element;
                  if (bullet !== undefined) {
                      var rect = bullet.getBoundingClientRect()
                      var remainingDistance = rect.left - containerRect.left
                      //原始速度 = （弹幕长度 + 容器宽度） / (容器宽度 /弹幕速度）
                      //恢复后的速度 = 原始速度
                      //恢复的秒数 = 剩余距离 / 原始速度
                      bullet.style.transition = `-webkit-transform ${(remainingDistance + bullet.offsetWidth) / ((bullet.offsetWidth + this.container.offsetWidth) / (this.container.offsetWidth / bulletSpeedFactor))}s linear 0s`;
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
              for (var i = 0; i < this.bullets.length; ++i) {
                  if (Math.abs(this.bullets[i].progress - this.progress) <= 3 && this.bullets[i].fired === false) {
                      //select trajactory
                      let bulletElement = this.createBulletHTMLElement(this.bullets[i])
                      this.container.insertAdjacentElement('afterbegin', bulletElement);
                      var duration = this.container.offsetWidth  / bulletSpeedFactor;
                      var speed = (bulletElement.clientWidth + this.container.offsetWidth) / duration;
                      this.bullets[i].element = bulletElement;
                      this.bullets[i].duration = duration;
                      this.bullets[i].speed = speed;
                      for (var j = 0; j < this.trajectorys.length; ++j) {
                          if (this.isTrajactoryReady(this.trajectorys[j], this.bullets[i])) {
                              this.bullets[i].fired = true
                              this.bullets[i].fired_at = this.progress;
                              // bullet.ontransitionend = (ev) => {
                              //     // this.trajectorys[j].bullets.splice(this.trajectorys[j].bullets.indexOf(bullet), 1);
                              //     bullet.remove();
                              // }
                          
                              this.trajectorys[j].bullets.push(this.bullets[i]);
                              bulletElement.style.transition = `-webkit-transform ${duration}s linear 0s`;
                              bulletElement.style.transform = `translateX(-${this.container.offsetWidth + bulletElement.offsetWidth}px) translateY(0px) translateZ(0px)`;
                              bulletElement.style.top = this.trajectorys[j].top + 'px';
                              bulletElement.style.color = `#${this.bullets[i].color.toString(16).padStart(6, '0')}`;
                              bulletElement.ontransitionend = (ev) => {
                                  console.log('called',bulletElement.innerText)
                                  bulletElement.remove();
                              }
                              break;
                          }
                      }
                      if (this.bullets[i].fired === false){
                          bulletElement.remove();
                      }
                  }
              }
          }, 10)
      }
  
      onseek(newProgress: number) {
          this.progress = newProgress;
          this.clearBullets();
          for (var i = 0; i < this.bullets.length; ++i) {
              if (this.bullets[i].progress >= newProgress) {
                  this.bullets[i].fired = false;
              }
          }
      }
  
      oncontainerchange() {
        this.clearBullets();
  
          // this.onpause();
          // this.onplay();
      }
  
      insertDanmaku(danmaku: DanmakuBullet) {
          this.bullets.push(danmaku);
      }
  
      loadDanmakus(danmakus: DanmakuBullet[]) {
          this.bullets = danmakus;
      }
  
      destory() {
          if (this.timeThreadHandle !== null) {
              clearInterval(this.timeThreadHandle)
          }
      }
  }
  