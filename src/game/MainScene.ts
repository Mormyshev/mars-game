import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super("MainScene");
    }

    preload() {
        // Предзагрузка ассетов (пока используем генерацию графики на лету, чтобы не искать картинки)
    }

    create() {
        // Создаем интерактивный текстовый объект
        this.scoreText = this.add
            .text(400, 300, "Очки: 0\nНажми на меня!", {
                fontSize: "32px",
                color: "#ffffff",
                align: "center",
            })
            .setOrigin(0.5)
            .setInteractive();

        // Обработка клика
        this.scoreText.on("pointerdown", () => {
            this.score += 1;
            this.scoreText.setText(`Очки: ${this.score}\nНажми на меня!`);

            // Генерируем событие для React, если интерфейсу нужно знать об очках
            this.game.events.emit("score-changed", this.score);
        });
    }
}
