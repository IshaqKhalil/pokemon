"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "./GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { saveSearchHistory } from "./GlobalRedux/Slices/history-slice";

interface PokemonData {
  name: string;
  url: string;
}

export default function Home() {
  const history = useSelector((state: RootState) => state.history.value);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [filteredData, setFilteredData] = useState<PokemonData[]>([]);
  const router = useRouter();

  console.log(history);

  const filterPokemon = (value: string) => {
    return pokemonData?.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
  };

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPokemonData(data.results);
        setFilteredData(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchPokemonData();
  }, []);
  return (
    <div className="p-2 flex flex-col gap-3">
      <div className="flex items-center w-full gap-2">
        <input
          type="text"
          className="p-2 border border-black focus:outline-none w-full"
          placeholder="Search Pokemon"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            const filteredData = filterPokemon(searchText);
            if (filteredData.length == 0 && searchText.length == 0) {
              setFilteredData(pokemonData);
            } else {
              setFilteredData(filteredData);
              if (searchText.length > 0) {
                if (!history.includes(searchText)) {
                  dispatch(saveSearchHistory(searchText));
                }
              }
            }
          }}
          className="p-2 border border-black hover:bg-slate-300"
        >
          Search
        </button>
      </div>
      {filteredData.map((item, index) => {
        const parts = item.url.split("/");
        const id = parts[parts.length - 2];
        return (
          <div
            key={index}
            onClick={() => {
              router.push(`/${item.name}/${id}`);
            }}
            className="p-2 border border-black cursor-pointer hover:bg-slate-300"
          >
            <p className="capitalize">Pokemon Name: {item.name}</p>
          </div>
        );
      })}
    </div>
  );
}
