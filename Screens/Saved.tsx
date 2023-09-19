//@ts-nocheck
import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { ComponentNavigationProps, NewsData } from '../utils/types';
import CardItem from '../components/Navigation/CardItem';
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null){
      return JSON.parse(value);
    }
  } catch(e) {
    alert("Something went wrong");
    return;
  }
}

const storeData =async (val: string) => {
  const data: NewsData[] = (await getData()) || [];
  const filtered = data.filter((news) => news.title !== value);

  try {
    const jsonValue = JSON.stringify(filtered);
    await AsyncStorage.setItem("@newsData", jsonValue);
  } catch (e) {
    return alert("Something went wrong with storing data");
  }
  
}

const Saved = (props: ComponentNavigationProps) => {
  const focused = useIsFocused();
  const [savedNews, setSavedNews] = useState([]);
  useEffect(() => {
    getData()
    .then((data) => setSavedNews(data))
    .catch(() => alert("Error Occurred"));
  }, [focused, deleteHandler]);

const deleteHandler = async (val: string) => {
  await storeData(val);
}

  return (
    <View style={styles.container}>
      <Appbar.Header>
      <Appbar.Content title="Home"></Appbar.Content>
     </Appbar.Header>

    <FlatList 
     keyExtractor={(item) => item.title}
     data={savedNews} 
     renderItem={({item}) => (
      <CardItem 
        handleDelete={deleteHandler}
        navigation={props.navigation}
        content={item.content} 
        description={item.description || ""}
        image_url={item.image_url}
        title={item.title}
    /> 
    )}
  />
     {savedNews && savedNews.length > 0 && savedNews.map((data: NewsData)=><CardItem 
        content={data.content} 
        description={data.description || ""} 
        image_url={data.image_url} 
        navigation={props.navigation} 
        title={data.title}
        key={data.title}
        />
      )}
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  flatList: {
    display: 'flex',
    flex: 1,
    height: 'auto'
  }
})