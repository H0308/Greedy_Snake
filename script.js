// 获取蛇的容器
const snake = document.getElementById("snake");
// 获取蛇的各个部分
const snakes = snake.getElementsByTagName("div");

// 获取食物
const food = document.getElementById("food");

// 获取分数和level的span
const scoreSpan = document.getElementById("score");
scoreSpan.innerText = 0;
const levelSpan = document.getElementById("level");

// 创建变量存储分数和等级
let score = 0;
let level = 0;


/*
    食物的坐标应该在0-290之间
*/
function changeFood() {
    // 生成0-29之间的随机数
    const x = Math.floor(Math.random() * 30) * 10;
    const y = Math.floor(Math.random() * 30) * 10;

    // 设置食物的坐标
    food.style.left = x + "px";
    food.style.top = y + "px";
}


// 定义一个变量用来存储蛇的移动的方向

let dir;

// 创建一个变量来记录按键的状态
let keyActive = true;

/*
    绑定按键事件keydown keyup
        - 键盘事件只能绑定给可以获取焦点的元素或者是document
*/

const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

// 创建一个对象
const reObj = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowLeft: "ArrowRight",
    ArrowRight: "ArrowLeft",
};

/*
    游戏禁止掉头：
        构成的要件：
            1. 身体超过2
            2. 不能是相反的方向
        处理：
            保持原来的方向不变（不修改dir的值）

*/
document.addEventListener("keydown", (event) => {
    if (keyActive && keyArr.includes(event.key)) {
        if (snakes.length < 2 || reObj[dir] !== event.key) {
            // 设置方向
            dir = event.key;
            keyActive = false;
        }
    }
})

/*
    要使得身体可以和头一起移动，只需要在蛇移动时，变化蛇尾巴的位置

*/

setTimeout(function move() {
    // 获取蛇头
    const head = snakes[0];

    // 获取蛇头的坐标
    let x = head.offsetLeft;
    let y = head.offsetTop;

    switch (dir) {
        case "ArrowUp":
            // 向上移动蛇
            y -= 10;
            break;
        case "ArrowDown":
            // 向下移动蛇
            y += 10;
            break;
        case "ArrowLeft":
            // 向左移动蛇
            x -= 10;
            break;
        case "ArrowRight":
            // 向右移动蛇
            x += 10;
            break;
    }

    // 检查蛇是否吃到食物
    if (
        head.offsetTop === food.offsetTop &&
        head.offsetLeft === food.offsetLeft
    ) {
        //1.改变食物的位置
        changeFood()
        //2.增加蛇的身体
        snake.insertAdjacentHTML("beforeend", "<div/>");
        score++;
        scoreSpan.textContent = score;

        // 检查等级
        if(score % 10 === 0 && level < 14){
            level++;
            levelSpan.textContent = level+1;
        }
    }

    /*
        判断游戏是否结束：
            1.撞墙
            2.撞自己
    */

    //判断是否撞墙
    if (x < 0 || x > 290 || y < 0 || y > 290) {
        alert("Collision with the wall! Game Over!");
        // 游戏结束
        return;
    }

    // 判断是否撞到自己
    for (let i = 0; i < snakes.length - 1; i++) {
        if (
            snakes[i].offsetLeft === x &&
            snakes[i].offsetTop === y
        ) {
            alert("You have eaten yourself! Game Over!");
            return;
        }
    }

    // 获取尾巴
    const tail = snakes[snakes.length - 1];
    // 移动蛇的位置
    tail.style.left = x + "px";
    tail.style.top = y + "px";
    // 将尾巴移动到蛇头的位置
    snake.insertAdjacentElement("afterbegin", tail);
    keyActive = true;

    setTimeout(move, 300 - level * 20)
}, 300);