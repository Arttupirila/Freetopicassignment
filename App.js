import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image } from 'react-native';
import { API_KEY } from '@env'; 

export default function App() {
  const [phrase, setPhrase] = useState('');
  const [recipes, setRecipes] = useState([]); 

  const searchRecipes = async (text) => {
    setPhrase(text);

    const URL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${text}&number=5`;

    try {
      const response = await fetch(URL);
      const json = await response.json();
      console.log(json);
      setRecipes(json); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Search for foods by ingredients</Text>
      <Text>Separate ingredients by comma, for example: "apple,sugar,bacon"</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ingredients..."
        value={phrase}
        onChangeText={searchRecipes}
      />
      
      <FlatList
        data={recipes} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            {item.image && (
              <Image 
                source={{ uri: item.image }} 
                style={styles.recipeImage} 
              />
            )}
            <Text style={styles.recipeName}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20, 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
    marginTop: 10,
  },
  recipeItem: {
    marginVertical: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 200,  
    borderRadius: 5,
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
 
});
