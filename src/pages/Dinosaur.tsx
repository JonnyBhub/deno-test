import React from "npm:@types/react@^18.3.3";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dino } from "../types.ts";

export default function Dinosaur() {
  const { selectedDinosaur } = useParams();
  const [dinosaur, setDino] = useState<Dino>({ name: "", description: "" });

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        `http://localhost:8000/api/dinosaurs/${selectedDinosaur}`
      );
      const dino = (await resp.json()) as Dino;
      setDino(dino);
    })();
  }, [selectedDinosaur]);

  return (
    <div>
      <h1>{dinosaur.name}</h1>
      <p>{dinosaur.description}</p>
      <Link to="/">🠠 Back to all dinosaurs</Link>
    </div>
  );
}
