// Enums для направления и поворота
enum Direction {
    //% block="вперед"
    Forward,
    //% block="назад"
    Back,
    //% block="влево"
    Left,
    //% block="вправо"
    Right
}

// Переименованное перечисление для поворотов, чтобы избежать конфликта
enum TurnDir {
    //% block="влево"
    Left,
    //% block="вправо"
    Right
}

// Enum для выбора типа витражного стекла
enum BeamsGlass {
    //% blockIdentity="blocks.block" enumval=262385 block="Желтое витражное стекло"
    //% jres alias=YELLOW_STAINED_GLASS
    YellowStainedGlass = 262385,
    //% blockIdentity="blocks.block" enumval=327921 block="Лаймовое витражное стекло"
    //% jres alias=LIME_STAINED_GLASS
    LimeStainedGlass = 327921,
    //% blockIdentity="blocks.block" enumval=721137 block="Синее витражное стекло"
    //% jres alias=BLUE_STAINED_GLASS
    BlueStainedGlass = 721137,
    //% blockIdentity="blocks.block" enumval=917745 block="Красное витражное стекло"
    //% jres alias=RED_STAINED_GLASS
    RedStainedGlass = 917745
}

// Глобальные переменные
const stopBlock = BEDROCK;            // Блок, при встрече с которым агент должен остановиться
const stopPosition = world(35, 1, 0);   // Координаты стоп-блока
const locatePaintingTarget = 14;       // Идентификатор для поиска картины
const locateGoonTarget = 113;          // Идентификатор для поиска посетителя-вора

// Массивы сопоставления направлений и поворотов
const directions = [
    FORWARD,
    BACK,
    LEFT,
    RIGHT
];

const turns = [
    LEFT_TURN,
    RIGHT_TURN
];

// Пространство имён с функционалом Wonder Woman
//% block="Wonder Woman" weight=200 color=#BF9B30 icon="\u2605"
namespace ww {

    /**
     * Движение Wonder Woman на заданное количество шагов в определённом направлении.
     * @param d направление движения (вперед, назад, влево, вправо)
     * @param n количество шагов (по умолчанию 1)
     */
    //% block="Движение %d на %n"
    export function moveWW(d: Direction, n: number = 1): void {
        for (let i = 0; i < n; i++) {
            if (shouldStop()) return;
            const direction = directions[d];
            agent.move(direction, 1);
        }
    }

    /**
     * Поворот Wonder Woman в заданном направлении.
     * Если параметр не указан, по умолчанию производится поворот налево.
     * @param t направление поворота (влево/вправо, по умолчанию: влево)
     */
    //% block="Поворот %t"
    export function turnWW(t: TurnDir = TurnDir.Left): void {
        if (shouldStop()) return;
        const turn = turns[t];
        agent.turn(turn);
    }

    /**
     * Установка блока витражного стекла в заданном направлении.
     * @param block тип витражного стекла
     * @param d направление установки блока
     */
    //% block="Установить %block %d"
    export function placeBlock(block: BeamsGlass, d: Direction): void {
        if (shouldStop()) return;
        agent.setItem(block, 1, 1);
        agent.setSlot(1);
        const direction = directions[d];
        agent.place(direction);
    }

    /**
     * Поиск картины в заданном направлении.
     * @param d направление для поиска картины
     */
    //% block="Картина в ящике %d"
    export function locatePainting(d: Direction): boolean {
        if (shouldStop()) return false;
        const direction = directions[d];
        const inspected = agent.inspect(AgentInspection.Block, direction);
        return inspected === locatePaintingTarget;
    }

    /**
     * Разрушение ящика с картиной в заданном направлении.
     * @param d направление для разрушения
     */
    //% block="Разрушить ящик %d"
    export function retrievePainting(d: Direction): void {
        if (shouldStop()) return;
        const direction = directions[d];
        agent.destroy(direction);
    }

    /**
     * Поиск посетителя-вора в заданном направлении.
     * @param d направление для поиска вора
     */
    //% block="Посетитель - вор %d"
    export function locateGoon(d: Direction): boolean {
        if (shouldStop()) return false;
        const direction = directions[d];
        const inspected = agent.inspect(AgentInspection.Block, direction);
        return inspected === locateGoonTarget;
    }

    /**
     * Применение лассо для нейтрализации вора в заданном направлении.
     * @param d направление применения лассо
     */
    //% block="Лассо для вора %d"
    export function apprehendGoon(d: Direction): void {
        if (shouldStop()) return;
        const direction = directions[d];
        agent.destroy(direction);
    }

    /**
     * Нейтрализация преступника (вора) в заданном направлении.
     * @param d направление для нейтрализации
     */
    //% block="Нейтрализация преступника %d"
    export function takedownGoon(d: Direction): void {
        if (shouldStop()) return;
        const direction = directions[d];
        agent.destroy(direction);
    }

    // Вспомогательная функция для проверки наличия стоп-блока
    function shouldStop(): boolean {
        return blocks.testForBlock(stopBlock, stopPosition);
    }
}
