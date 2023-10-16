"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pokemon from "@/assets/pokemon-cover.jpg";

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
    <div className="flex flex-col items-center justify-center p-5">
      <Image
        width="700"
        height="150"
        className="w-[40%] m-auto"
        alt="cover image"
        src={Pokemon}
      />
      <img
        src={singlePokemonData?.sprites?.front_default}
        className="h-40 w-40 border border-black my-4 rounded-lg"
      />
      <div className="flex items-start gap-5 m-auto border border-black p-4 rounded-lg">
        <div>
          <p className="capitalize">Name: {singlePokemonData.name}</p>
          <p className="capitalize">Height: {singlePokemonData.height} ft.</p>
          <p className="capitalize">Weight: {singlePokemonData.weight} lbs.</p>
        </div>
        <div>
          <p className="capitalize">
            Base Experience: {singlePokemonData.base_experience}
          </p>
          <p className="capitalize">
            Species: {singlePokemonData?.species?.name}
          </p>
        </div>
        <div>
          <p className="text-lg capitalize">Abilites: </p>
          {singlePokemonData?.abilities?.map((item: any, index: number) => (
            <p className="capitalize ml-3" key={index}>
              {item.ability.name}{" "}
            </p>
          ))}
        </div>
        <div>
          <p className="text-lg capitalize">Types: </p>
          {singlePokemonData?.types?.map((item: any, index: number) => (
            <p className="capitalize ml-3" key={index}>
              {item.type.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
