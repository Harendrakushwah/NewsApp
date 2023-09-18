import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ComponentNavigationProps } from '../utils/types';
import DetailsCard from '../components/DetailsCard';

const NewsOverview = (props: ComponentNavigationProps) => {
  const {title, content, image_url} = props?.route?.params?.title;
  return ( <DetailsCard content={content} image_url={image_url} title={title} />
  );
};

export default NewsOverview;

const styles = StyleSheet.create({})