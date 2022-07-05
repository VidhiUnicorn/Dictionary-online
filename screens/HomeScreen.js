import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      word: "Nothing", 
      definition: 'Not Found' 
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    return fetch(url)
      .then((data) => {
        console.log('data');

        console.log(data);

        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        console.log('response' + response);
        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;
          console.log(lexicalCategory);
          this.setState({
            word: word,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: word,
            definition: 'Not Found',
          });
        }
      });
  };
  render() {
    return (
      <View style={{ backgroundColor: '#f5dbc2' }}>
        <Text style={styles.title}>Dictionary</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Press the search button for the definition :)',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <Text style = {styles.text}> Word : {''}</Text>
        <Text style = {styles.info}>        {this.state.word}</Text>


        <Text style = {styles.text}> Type: {''}</Text>
        <Text style = {styles.info}>         {this.state.lexicalCategory}</Text>


        <Text style = {styles.text}> Definition : {''}</Text>
        <Text style = {styles.info}>         {this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 300,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    fontSize: 30,
  },
  button: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 50,
    borderWidth: 5,
    borderColor: 'black',
    backgroundColor: 'green',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: 'green',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: -13,
  },
  text : {
    fontSize:45

  },
  info : {
    fontSize : 30

  }
});
