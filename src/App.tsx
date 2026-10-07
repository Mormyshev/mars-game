import { useEffect } from "react";
import { GameContainer } from "./components/GameContainer";

function App() {
    useEffect(() => {
        // Проверяем, что SDK Яндекса загрузилось
        if (typeof window !== "undefined" && (window as any).ysdk) {
            (window as any).ysdk.features.LoadingProgress?.report(100);
            console.log("Yandex SDK успешно инициализировано в React");
        }
    }, []);

    return (
        <div className="App">
            <GameContainer />
        </div>
    );
}

export default App;
