import axios from "axios";
import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

interface Game {
  bannerUrl: string;
  id: string;
  title: string;
  _count: { ads: number };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] my-20 mx-auto flex flex-col items-center">
      <img src={logoImg} alt="nlw logo vector" />
      <h1 className=" mt-20 text-6xl text-white font-black">
        Seu{" "}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-6">
        {games.map((game) => (
          <GameBanner
            title={game.title}
            bannerUrl={game.bannerUrl}
            key={game.id}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
