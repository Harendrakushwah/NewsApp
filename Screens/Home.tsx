//@ts-nocheck

import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ComponentNavigationProps, NewsData } from '../utils/types'
import React, {useState} from 'react'
import { Appbar, Chip, Button} from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import CardItem from '../components/Navigation/CardItem'
const categories = ["Technology", "Entertainment", "Business", "Sports", "Politics"]
const API_KEY = "pub_29471ceceef3a5920a8e268703dabeff94f85"

const Home = (props: ComponentNavigationProps) => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const theme = useTheme();
  const [selectedCategories, setselectedCategories] = useState([]);
  const [nextPage, setNextPage] = useState("")
  const handleSelect = (val: string) => {
    setselectedCategories((prev: string[])=>
    prev.find((p) => p===val)
    ? prev.filter((cat) => cat !== val)
    : [...prev, val])
  };
  const handlePress = async() => {
    const URL = `https://newsdata.io/api/1/news?apikey= ${API_KEY}&country=in&language=en${selectedCategories.length > 0 ? `&category=${selectedCategories.join()}` : ""}${nextPage?.length > 0 ? `&page=${nextPage}` : ""}`;
    try {
      await fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setNewsData((prev) => [...prev, ...data.results]);
        setNextPage(data.nextPage)});
    } catch (err) {
      console.log(err);
    }
  }; 
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
     <FlatList onEndReached={() => handlePress()}
     style={styles.flatList}
     data={newsData} 
     renderItem={({item}) => (
     <CardItem 
     navigation={props.navigation}
     category={item.category} 
     content={item.content} 
     country={item.country}
     creator={item.creator}
     description={item.description}
     image_url={item.image_url}
     keywords={item.keywords}
     language={item.language}
     link={item.link}
     pubDate={item.pubDate}
     source_id={item.source_id}
     title={item.title}
     video_url={item.video_url}
    /> 
    )}
  />
  </View>
  );
};

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
  flatList: {
    flex: 1,
    height: "auto"
  }
});