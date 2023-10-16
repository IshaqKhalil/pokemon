"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const params = useParams();
  const [singlePokemonData, setSinglePokemonData] = useState<any>({});
  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.slug[1]}/`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSinglePokemonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchPokemonData();
  }, []);
  return (
    <div className="flex items-center justify-center p-5">
      <div className="p-2 flex flex-col gap-3  border border-black">
        <img src={singlePokemonData?.sprites?.front_default} className="h-40 w-40" />
        <p className="capitalize">Name: {singlePokemonData.name}</p>
        <p className="capitalize">Height: {singlePokemonData.height} ft.</p>
        <p className="capitalize">Weight: {singlePokemonData.weight} lbs.</p>
        <p className="capitalize">
          Base Experience: {singlePokemonData.base_experience}
        </p>
        <p className="capitalize">
          Species: {singlePokemonData?.species?.name}
        </p>
        <p className="text-lg capitalize">Abilites: </p>
        {singlePokemonData?.abilities?.map((item: any, index: number) => (
          <p className="capitalize ml-3" key={index}>
            {item.ability.name}{" "}
          </p>
        ))}
        <p className="text-lg capitalize">Types: </p>
        {singlePokemonData?.types?.map((item: any, index: number) => (
          <p className="capitalize ml-3" key={index}>
            {item.type.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Page;
