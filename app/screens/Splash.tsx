import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Images} from '../assets/Images';
import {navigate} from '../navigation/NavigationUtils';
import {Colors} from '../global/themes/Colors';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      navigate('Home');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.PRIMARY} />
      <ImageBackground
        source={Images.splashBg}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.overlay} />

        <View style={styles.logoContainer}>
          <Image
            source={Images.appLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});
