//@ts-nocheck

import { StyleSheet, Text, View } from 'react-native'
import { NewsData } from '../utils/types'
import React, {useState} from 'react'
import { Appbar, Chip, Button} from 'react-native-paper'
import { useTheme } from 'react-native-paper'
const categories = ["Technology", "Entertainment", "Business", "Sports", "Politics"]
const API_KEY = "pub_29471ceceef3a5920a8e268703dabeff94f85"
const Home = () => {
  const [newsData, setnewsData] = useState([]);
  const theme = useTheme();
  const [selectedCategories, setselectedCategories] = useState<NewsData>([]);
  const handleSelect = (val: string) => {
    setselectedCategories((prev: string[])=>
    prev.find((p) => p===val)
    ? prev.filter((cat) => cat !== val)
    : [...prev, val])
  };
  const handlePress = async() => {
    const URL = `https://newsdata.io/api/1/news?apikey= ${API_KEY}&country=in&language=en${selectedCategories.length > 0 ? `&category=${selectedCategories.join()}` : ""}`;
    try {
      await fetch(URL)
      .then((res) => res.json())
      .then((data) => setnewsData(data.results));
    } catch (err) {
      console.log(err);
    }
  }; 
  console.log(Object.keys(newsData[0]));
  return (
    <View style={styles.container}>
     <Appbar.Header>
      <Appbar.Content title="Home"></Appbar.Content>
     </Appbar.Header>
     <View style={styles.filterContainer}>
      { categories.map((cat)=>(
        <Chip 
          key={cat} 
          mode="outlined" 
          style={styles.chipItem} 
          textStyle={{fontWeight: "400", color: "white", padding: 1}}
          showSelectedOverlay
          selected={selectedCategories.find((c) => cat === c) ? true : false}
          onPress={()=>handleSelect(cat)}
        >
          {cat}
        </Chip>  
          ))}
          <Button
           mode="contained"
           style = {styles.button} 
           labelStyle={{fontSize: 14, margin: "auto", color: theme.colors.inverseOnSurface}}
           icon={"sync"} onPress={handlePress}>Refresh</Button>
     </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
});