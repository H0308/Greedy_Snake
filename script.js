// ��ȡ�ߵ�����
const snake = document.getElementById("snake");
// ��ȡ�ߵĸ�������
const snakes = snake.getElementsByTagName("div");

// ��ȡʳ��
const food = document.getElementById("food");

// ��ȡ������level��span
const scoreSpan = document.getElementById("score");
scoreSpan.innerText = 0;
const levelSpan = document.getElementById("level");

// ���������洢�����͵ȼ�
let score = 0;
let level = 0;


/*
    ʳ�������Ӧ����0-290֮��
*/
function changeFood() {
    // ����0-29֮��������
    const x = Math.floor(Math.random() * 30) * 10;
    const y = Math.floor(Math.random() * 30) * 10;

    // ����ʳ�������
    food.style.left = x + "px";
    food.style.top = y + "px";
}


// ����һ�����������洢�ߵ��ƶ��ķ���

let dir;

// ����һ����������¼������״̬
let keyActive = true;

/*
    �󶨰����¼�keydown keyup
        - �����¼�ֻ�ܰ󶨸����Ի�ȡ�����Ԫ�ػ�����document
*/

const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

// ����һ������
const reObj = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowLeft: "ArrowRight",
    ArrowRight: "ArrowLeft",
};

/*
    ��Ϸ��ֹ��ͷ��
        ���ɵ�Ҫ����
            1. ���峬��2
            2. �������෴�ķ���
        ����
            ����ԭ���ķ��򲻱䣨���޸�dir��ֵ��

*/
document.addEventListener("keydown", (event) => {
    if (keyActive && keyArr.includes(event.key)) {
        if (snakes.length < 2 || reObj[dir] !== event.key) {
            // ���÷���
            dir = event.key;
            keyActive = false;
        }
    }
})

/*
    Ҫʹ��������Ժ�ͷһ���ƶ���ֻ��Ҫ�����ƶ�ʱ���仯��β�͵�λ��

*/

setTimeout(function move() {
    // ��ȡ��ͷ
    const head = snakes[0];

    // ��ȡ��ͷ������
    let x = head.offsetLeft;
    let y = head.offsetTop;

    switch (dir) {
        case "ArrowUp":
            // �����ƶ���
            y -= 10;
            break;
        case "ArrowDown":
            // �����ƶ���
            y += 10;
            break;
        case "ArrowLeft":
            // �����ƶ���
            x -= 10;
            break;
        case "ArrowRight":
            // �����ƶ���
            x += 10;
            break;
    }

    // ������Ƿ�Ե�ʳ��
    if (
        head.offsetTop === food.offsetTop &&
        head.offsetLeft === food.offsetLeft
    ) {
        //1.�ı�ʳ���λ��
        changeFood()
        //2.�����ߵ�����
        snake.insertAdjacentHTML("beforeend", "<div/>");
        score++;
        scoreSpan.textContent = score;

        // ���ȼ�
        if(score % 10 === 0 && level < 14){
            level++;
            levelSpan.textContent = level+1;
        }
    }

    /*
        �ж���Ϸ�Ƿ������
            1.ײǽ
            2.ײ�Լ�
    */

    //�ж��Ƿ�ײǽ
    if (x < 0 || x > 290 || y < 0 || y > 290) {
        alert("Collision with the wall! Game Over!");
        // ��Ϸ����
        return;
    }

    // �ж��Ƿ�ײ���Լ�
    for (let i = 0; i < snakes.length - 1; i++) {
        if (
            snakes[i].offsetLeft === x &&
            snakes[i].offsetTop === y
        ) {
            alert("You have eaten yourself! Game Over!");
            return;
        }
    }

    // ��ȡβ��
    const tail = snakes[snakes.length - 1];
    // �ƶ��ߵ�λ��
    tail.style.left = x + "px";
    tail.style.top = y + "px";
    // ��β���ƶ�����ͷ��λ��
    snake.insertAdjacentElement("afterbegin", tail);
    keyActive = true;

    setTimeout(move, 300 - level * 20)
}, 300);