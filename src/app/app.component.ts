import { AfterViewChecked, AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.startGame && !this.endGame) {
      if (event.key == 'ArrowRight') {
        if (this.posY + 1 <= 10) {
          let basket = document.getElementById("basket-img-1" + "-" + this.posY) as HTMLImageElement;
          basket.src = "./assets/download_adobespark.png";
          let updatedBasket = document.getElementById("basket-img-1" + "-" + (this.posY + 1)) as HTMLImageElement;
          updatedBasket.src = "./assets/basket.png";
          this.posY++;
        }

      }
      else if (event.key == 'ArrowLeft') {
        if (this.posY - 1 > 0) {
          let basket = document.getElementById("basket-img-1" + "-" + this.posY) as HTMLImageElement;
          basket.src = "./assets/download_adobespark.png";
          let updatedBasket = document.getElementById("basket-img-1" + "-" + (this.posY - 1)) as HTMLImageElement;
          updatedBasket.src = "./assets/basket.png";
          this.posY--;
        }
      }
    }
  }


  title = 'game';
  noName: boolean = false;
  startGame: boolean = false;
  endGame: boolean = false;
  showLevel: boolean = false;
  enableArrows: boolean = false;
  level: number = 1;
  score: number = 0;
  HorizontalSquares: any[];
  verticalSquares: any[];
  lives: Array<any> = [1, 2, 3, 4, 5];
  posY: number = 5;
  audio: any;
  count: number = 0;
  scoreBoard: Array<any> = [];
  name: string = '';
  totalCount: number = 0;
  subcount: Array<number> = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  imgs: Array<any> = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];


  ngOnInit() {
    this.HorizontalSquares = Array(10).fill(null);
    this.verticalSquares = Array(20).fill(null);
    if(window.innerWidth <= 768){
      this.enableArrows = true;
    }
  }

  start() {
    if (!document.forms['game'].name.value) {
      this.noName = true;
    }
    else {
      this.startGame = true;
      this.audio = new Audio('./assets/Monkeys-Spinning-Monkeys.mp3');
      this.audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
      this.audio.play();
      this.name = document.forms['game'].name.value;
      this.randomizeEggs();
    }
  }

  randomizeEggs() {
    if (this.count != 10) {
      setTimeout(() => {
        let randomItem = this.imgs[Math.floor(Math.random() * this.imgs.length)];
        const index = this.imgs.indexOf(randomItem);
        if (index > -1) {
          this.imgs.splice(index, 1);
        }
        let item = document.getElementById("img-1-" + randomItem) as HTMLImageElement;
        item.src = "./assets/egg.png";
        this.increment(randomItem);
        this.count++;
        this.randomizeEggs();
      }, this.count == 0?10:(5000 / this.level));
    }
  }

  increment(entity) {
    if (this.subcount[entity] != 17 && this.subcount[entity] != 19) {
      setTimeout(() => {
        let item = document.getElementById("img-" + this.subcount[entity] + "-" + entity) as HTMLImageElement;
        item.src = "./assets/download_adobespark.png";
        let updatedItem = document.getElementById("img-" + (this.subcount[entity] + 1) + "-" + entity) as HTMLImageElement;
        updatedItem.src = "./assets/egg.png";
        this.subcount[entity]++;
        this.increment(entity);
      }, (300 / this.level));
    }
    else if (this.subcount[entity] == 17) {
      if (this.posY == entity) {
        this.score++;
        this.totalCount++;
        let item = document.getElementById("img-" + this.subcount[entity] + "-" + entity) as HTMLImageElement;
        item.src = "./assets/download_adobespark.png";
        if ((this.totalCount % 10) == 0) {
          this.level++;
          this.count = 0;
          this.imgs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
          this.imgs.forEach((item) => {
            let entity = document.getElementById("img-" + 20 + "-" + item) as HTMLImageElement;
            entity.src = "./assets/download_adobespark.png";
          })
          this.subcount = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
          this.showLevel = true;
          setTimeout(() => { this.showLevel = false }, 1000);
          this.randomizeEggs();
        }
      }
      else {
        setTimeout(() => {
          let item = document.getElementById("img-" + this.subcount[entity] + "-" + entity) as HTMLImageElement;
          item.src = "./assets/download_adobespark.png";
          let updatedItem = document.getElementById("img-" + (this.subcount[entity] + 1) + "-" + entity) as HTMLImageElement;
          updatedItem.src = "./assets/egg.png";
          this.subcount[entity]++;
          this.increment(entity);
        }, (300 / this.level));
      }
    }
    else if (this.subcount[entity] == 19) {
      setTimeout(() => {
        this.totalCount++;
        this.lives.pop();
        let item = document.getElementById("img-" + this.subcount[entity] + "-" + entity) as HTMLImageElement;
        item.src = "./assets/download_adobespark.png";
        let item1 = document.getElementById("img-" + 20 + "-" + entity) as HTMLImageElement;
        item1.src = "./assets/break_adobespark.png";
        if (this.lives.length == 0) {
          this.endGame = true;
          this.endTheGame();
        }
        if ((this.totalCount % 10) == 0) {
          this.level++;
          this.count = 0;
          this.imgs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
          this.imgs.forEach((item) => {
            let entity = document.getElementById("img-" + 20 + "-" + item) as HTMLImageElement;
            entity.src = "./assets/download_adobespark.png";
          })
          this.subcount = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
          this.showLevel = true;
          setTimeout(() => { this.showLevel = false }, 1000);
          this.randomizeEggs();
        }
      }, (300 / this.level));
    }

  }
  reinitialize() {
    this.noName = false;
  }

  trigger(direction) {
    if (direction == 'right') {
      if (this.posY + 1 <= 10) {
        let basket = document.getElementById("basket-img-1" + "-" + this.posY) as HTMLImageElement;
        basket.src = "./assets/download_adobespark.png";
        let updatedBasket = document.getElementById("basket-img-1" + "-" + (this.posY + 1)) as HTMLImageElement;
        updatedBasket.src = "./assets/basket.png";
        this.posY++;
      }

    }
    else if (direction == 'left') {
      if (this.posY - 1 > 0) {
        let basket = document.getElementById("basket-img-1" + "-" + this.posY) as HTMLImageElement;
        basket.src = "./assets/download_adobespark.png";
        let updatedBasket = document.getElementById("basket-img-1" + "-" + (this.posY - 1)) as HTMLImageElement;
        updatedBasket.src = "./assets/basket.png";
        this.posY--;
      }
    }

  }

  endTheGame() {
    this.audio.pause();
    this.audio.currentTime = 0;
    if (localStorage.getItem("names:" + this.name)) {
      if (+localStorage.getItem("names:" + this.name) < this.score) {
        localStorage.setItem("names:" + this.name, this.score.toString());
      }
    }
    else {
      localStorage.setItem("names:" + this.name, this.score.toString());
    }
    for (var key in localStorage) {
      if (key.includes('names:')) {
        let obj = {};
        obj['name'] = key.slice(6);
        obj['value'] = localStorage.getItem(key);
        this.scoreBoard.push(obj);
      }
    }
    this.scoreBoard.sort(function (a, b) {
      var value1 = +a.value,
        value2 = +b.value;
      if (value1 < value2) return 1;
      if (value1 > value2) return -1;
      return 0;
    });
  }
  reload() {
    window.location.reload();
  }

  ngAfterViewInit() {

  }
}
