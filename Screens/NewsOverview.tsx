//@ts-nocheck
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ComponentNavigationProps, NewsData } from '../utils/types';
import DetailsCard from '../components/DetailsCard';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const storeData = async (value: NewsData) => {
  const data: NewsData[] = (await getData()) || [];
  !data.find((d)=>d.title===value.title) ? data.push(value) : data;
  try {
    const jsonvalue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_Key", jsonvalue);
  } catch(e){
     return alert("Something went wrong");
  }
};

const NewsOverview = (props: ComponentNavigationProps) => {
  const {title, content, image_url} = props?.route?.params as NewsData;

  props.navigation.setOptions({
    headerRight: () => <Button onPress={() => storeData({title, content, image_url})}>Save</Button>
  });

  return ( <DetailsCard content={content} image_url={image_url} title={title} />
  );
};

export default NewsOverview;
 
const styles = StyleSheet.create({})