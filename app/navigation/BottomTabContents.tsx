import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Fonts} from '../assets/Fonts';
import {Colors} from '../global/themes/Colors';
import AppText from '../global/components/AppText';
import Icon from '../global/components/AppIcons';

const BottomTabContents = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;

  return (
    <Pressable
      android_ripple={{color: Colors.WHITE}}
      style={[styles.container, {flex: 1}]}
      onPress={onPress}>
      <View style={styles.btn}>
        <Icon
          type={item.type}
          name={item.icon}
          size={20}
          color={focused ? Colors.BLACK : Colors.LIGHTGREY}
        />

        <AppText
          textType="medium12"
          style={{
            color: focused ? Colors.BLACK : Colors.LIGHTGREY,
          }}>
          {item.label}
        </AppText>
      </View>
    </Pressable>
  );
};

export default BottomTabContents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    borderRadius: 16,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
  },
});
