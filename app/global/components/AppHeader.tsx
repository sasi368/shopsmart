import React, {useState} from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {setHeaderImage} from './HeaderImages';
import {Fonts} from '../../assets/Fonts';
import {Colors} from '../themes/Colors';

const AppHeader = (props: {
  name: string;
  leftImage: string;
  rightImage: string;
  rightImage2: string;
}) => {
  const [delay, pressDelay] = useState(false);
  const navigation = useNavigation();

  const navBack = () => {
    pressDelay(true);
    setTimeout(() => {
      pressDelay(false);
    }, 1500);
    navigation.goBack();
  };

  const navToPages = (imageName: string) => {
    switch (imageName) {
      case 'back':
        navBack();
        break;
    }
  };

  const displayImages = (image1: string) => {
    return image1 ? setHeaderImage({imageName: image1}) : <View />;
  };

  return (
    <View style={styles.headerStyle}>
      <View style={styles.leftImgView}>
        <Pressable onPress={() => navToPages(props.leftImage)} disabled={delay}>
          {displayImages(props.leftImage)}
        </Pressable>
        <Text style={styles.largeFont}>{props.name}</Text>
        <View style={styles.rightImgView}>
          <Pressable
            onPress={() => navToPages(props.rightImage2)}
            style={{right: 20}}
            disabled={delay}>
            {displayImages(props.rightImage2)}
          </Pressable>
          <Pressable
            onPress={() => navToPages(props.rightImage)}
            disabled={delay}>
            {displayImages(props.rightImage)}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  headerStyle: {
    height: 55,
    elevation: 4,
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  largeFont: {
    color: Colors.WHITE,
    fontFamily: Fonts.Bold,
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  leftImgView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  rightImgView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
