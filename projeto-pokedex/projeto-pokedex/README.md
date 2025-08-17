# Desenvolvimento de uma Pokédex em React Native

Este projeto tem como objetivo o desenvolvimento de uma **Pokédex interativa** utilizando **React Native** com o ambiente de execução **Expo Go**, permitindo rodar a aplicação tanto em dispositivos móveis quanto no navegador via **Expo Web**. 

---

## 🚀 Tecnologias Utilizadas  
- ⚛️ **React Native**  
- 📦 **Expo Go** (mobile e web)  
- 🌐 **PokéAPI** ([pokeapi.co](https://pokeapi.co/))  
- 🧭 **React Navigation**  
- 🎨 **StyleSheet** para estilização

 ---

 ---

## 📡 Integração com a API  

A **PokéAPI** foi utilizada para fornecer informações completas como:  
- Nome  
- Tipos  
- Habilidades  
- Imagens oficiais  

A comunicação foi feita com `fetch`, recebendo os dados em **JSON** e exibindo-os dinamicamente nos componentes da aplicação.  

```javascript
useEffect(() => {
  fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(res => res.json())
    .then(data => setPokemon(data));
}, []);
