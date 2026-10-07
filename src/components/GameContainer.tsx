import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { MainScene } from "../game/MainScene";

export const GameContainer = () => {
    const gameRef = useRef<HTMLDivElement>(null);
    const phaserInstance = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (!gameRef.current || phaserInstance.current) return;

        // Конфигурация Phaser с учетом адаптивности под экраны
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameRef.current,
            backgroundColor: "#1d1d1d",
            scale: {
                mode: Phaser.Scale.FIT, // Автоматически масштабировать под размеры контейнера
                autoCenter: Phaser.Scale.CENTER_BOTH, // Центрировать игру
            },
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { x: 0, y: 0 },
                    debug: false,
                },
            },
            scene: [MainScene],
        };

        // Запуск Phaser
        phaserInstance.current = new Phaser.Game(config);

        // Пример прослушивания событий из Phaser в React
        const handleScoreChange = (score: number) => {
            console.log("React поймал изменение очков:", score);
        };
        phaserInstance.current.events.on("score-changed", handleScoreChange);

        // Очистка памяти при размонтировании компонента
        return () => {
            if (phaserInstance.current) {
                phaserInstance.current.events.off(
                    "score-changed",
                    handleScoreChange,
                );
                phaserInstance.current.destroy(true);
                phaserInstance.current = null;
            }
        };
    }, []);

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#000",
            }}
        >
            <div ref={gameRef} style={{ width: "100%", height: "100%" }} />
        </div>
    );
};
