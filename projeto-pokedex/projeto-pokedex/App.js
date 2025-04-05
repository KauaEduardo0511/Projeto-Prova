import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function App() {

  const [pokemon, setPokemon] = useState(null); //pokemon selecionado
  const [pesquisa, setPesquisa] = useState(""); // para realizar a pesquisa de id e nome

  const buscarPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisa.toLowerCase()}`);
      //verifica na api se foi possivel selecionar o id ou nome do pokemon
      
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      //caso não encontre voltará o erro

      const data = await response.json();

      
      const moves = data.moves.slice(0, 3).map(move => move.move.name);
      //busca até 3 movimentos de ataque do pokemon
      
      setPokemon({
        name: data.name.toUpperCase(),
        image: data.sprites.front_default,
        type: data.types.map((t) => t.type.name).join(", "),
        id: data.id,
        moves: moves,
      });
      //informações que serão buscadas do pokemon
    } catch (error) {
      setPokemon(null);
      console.log(error);
      //caso não consiga pegar as informações
    }

    
  };



  return (
    <SafeAreaView style={css.container}>
      <View style={css.titulo}>
        <View style={css.retangulo}>
          <Image source={require("./img/rotom.png")} style={css.image_rotom} />
        </View>
        <Text style={css.texto_titulo}>POKEDEX</Text>
        <Image source={require("./img/pokebola.png")} style={css.image_poke} />
      </View>

      <TextInput
        style={css.input}
        placeholder="Digite o nome ou ID"
        placeholderTextColor="#888"
        onChangeText={(text) => setPesquisa(text)}
        onSubmitEditing={buscarPokemon}
         returnKeyType="search"
      />

      <View style={css.espacoPokemon}>
        {pokemon && (
          <View style={css.card}>
            <Text style={css.pokemonName}>{pokemon.name}</Text>
            <Image source={{ uri: pokemon.image }} style={css.pokemonImage} />
            <Text style={css.pokemonInfo}>Tipo: {pokemon.type}</Text>
            <Text style={css.pokemonInfo}>ID: {pokemon.id}</Text>
          </View>
        )}

        {pokemon && (
          <View style={css.movimentos}>
            <Text style={css.mov_text}>Movimentos:</Text>
            
            <ScrollView horizontal style={css.attackContainer}>
              {pokemon.moves.map((move, index) => (
                <View key={index} style={css.attackBox}>

                  <Text style={css.attackText}>{move}</Text>
                </View>
              ))}
            </ScrollView>

          </View>
        )}
      </View>

      <TouchableOpacity style={css.button} onPress={buscarPokemon}>
        <Text style={css.buttonText}>Buscar</Text>
      </TouchableOpacity>

  <View style={css.base_final}>
<Image source={require('./img/pikachu.png')} style={css.image_poke_fundo} />
<Image source={require('./img/bulbasaro.png')} style={css.image_poke_fundo} />
<Image source={require('./img/squirtle.png')} style={css.image_poke_fundo} />
  </View>

    </SafeAreaView>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: '#0101DF',
  },

  titulo: {
    backgroundColor: 'red',
    width: '100%',
    height: 150,
    borderColor: 'black',
    borderWidth: 4,
  },

  texto_titulo: {
    flex: 1,
    left: '60%',
    color: "white",
    fontSize: 40,
    marginTop: -11,
  },

  image_poke: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginTop: 82,
    right: 1,
  },

  retangulo: {
    width: 100,
    height: 100,
    marginLeft: 30,
    backgroundColor: "blue"
  },

  image_rotom: {
    width: 80,
    height: 80,
    alignContent: 'center',
    left: 10,
    top: 10,
  },

  input: {
    top: "50%",
    width: "80%",
    height: 50,
    backgroundColor: "white",
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 15,
    elevation: 10,
  },

  button: {
    top: "50%",
    backgroundColor: "#00ffea",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a0a0a",
  },

  base_final: {
    backgroundColor: 'red',
    width: '100%',
    height: 150,
    borderColor: 'black',
    borderWidth: 4,
    top: "60%",
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    justifyContent: 'space-between',
  },

  image_poke_fundo: {
    width: 80,
    height: 80,
    alignContent: 'center',
    padding: 30,
  },

  espacoPokemon: {
    position: "absolute",
    top: 190,
  },

  card: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    marginTop: 20,
  },

  pokemonName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },

  pokemonImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  pokemonInfo: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },

  movimentos:{
    alignItems: 'center',
  },
  
  attackContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  attackBox: {
   backgroundColor:'#8B4513',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFFF00',
  },

  attackText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: 'bold',
  },

  mov_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF00',
    marginTop: 20,
    marginBottom: 10,
    
    
  },
});

