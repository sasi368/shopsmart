import React, {JSX} from 'react';
import {Colors} from '../themes/Colors';
import Icon, {AppIcons} from './AppIcons';

interface SetHeaderImageProps {
  imageName: string;
}

export const setHeaderImage = ({
  imageName,
}: SetHeaderImageProps): JSX.Element | null => {
  if (imageName === 'close') {
    return (
      <Icon
        type={AppIcons.AntDesign}
        name={'close'}
        size={30}
        color={Colors.WHITE}
        style={{alignSelf: 'center'}}
      />
    );
  }

  if (imageName === 'notification') {
    return (
      <Icon
        type={AppIcons.Ionicons}
        name={'notifications-outline'}
        size={30}
        color={Colors.WHITE}
        style={{alignSelf: 'center'}}
      />
    );
  }

  if (imageName === 'back') {
    return (
      <Icon
        type={AppIcons.Ionicons}
        name={'chevron-back'}
        size={30}
        color={Colors.WHITE}
        style={{alignSelf: 'center'}}
      />
    );
  }

  return null;
};
