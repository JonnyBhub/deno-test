import React from "npm:@types/react@^18.3.3";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dino } from "../types.ts";

export default function Index() {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);
  const [seeAll, setSeeAll] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8000/api/dinosaurs/`);
      const allDinosaurs = (await response.json()) as Dino[];
      setDinosaurs(allDinosaurs);
    })();
  }, []);

  return (
    <main>
      <h1>Welcome to the Dinosaur app</h1>
      <p>Click on a dinosaur below to learn more.</p>
      <button onClick={() => setSeeAll(!seeAll)}>
        {seeAll ? "Hide" : "Show"} all dinosaurs
      </button>
      <div className="link-list">
        {seeAll &&
          dinosaurs.map((dinosaur: Dino) => {
            return (
              <Link
                to={`/${dinosaur.name.toLowerCase()}`}
                key={dinosaur.name}
                className="dinosaur"
              >
                {dinosaur.name}
              </Link>
            );
          })}
      </div>
    </main>
  );
}
