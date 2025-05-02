import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import AppHeader from '../global/components/AppHeader';
import AppInput from '../global/components/AppInput';
import AppText from '../global/components/AppText';
import {Colors} from '../global/themes/Colors';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateUpload = async (uri: string) => {
    setUploading(true);
    setAvatar(null);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setAvatar(uri);
      }
    }, 200);
  };

  const getPermission = (fromCamera: boolean): Permission | null => {
    if (Platform.OS === 'android') {
      if (fromCamera) return PERMISSIONS.ANDROID.CAMERA;
      return Platform.Version >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    } else {
      return fromCamera
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.IOS.PHOTO_LIBRARY;
    }
  };

  const requestPermission = async (fromCamera = false): Promise<boolean> => {
    try {
      const permission = getPermission(fromCamera);
      if (!permission) return false;

      const currentStatus = await check(permission);
      if (currentStatus === RESULTS.GRANTED) return true;
      if (currentStatus === RESULTS.DENIED) {
        const newStatus = await request(permission);
        return newStatus === RESULTS.GRANTED;
      }

      Alert.alert(
        'Permission Denied',
        'Please enable permission from settings.',
      );
      return false;
    } catch (error) {
      console.warn('Permission error:', error);
      return false;
    }
  };

  const selectImage = async (fromCamera = false) => {
    const hasPermission = await requestPermission(fromCamera);
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please allow access to continue.');
      return;
    }

    const result = fromCamera
      ? await launchCamera({mediaType: 'photo'} as CameraOptions)
      : await launchImageLibrary({mediaType: 'photo'} as ImageLibraryOptions);

    if (result.didCancel) return;

    const uri = result.assets?.[0]?.uri;
    if (uri) simulateUpload(uri);
    else Alert.alert('Error', 'Unable to select image');
  };

  return (
    <View style={styles.container}>
      <AppHeader
        name={'Profile'}
        leftImage={'back'}
        rightImage={''}
        rightImage2=""
      />

      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <ScrollView>
          <TouchableOpacity onPress={() => selectImage()}>
            {uploading ? (
              <View style={styles.avatarPlaceholder}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
                <AppText textType="regular14">{progress}%</AppText>
              </View>
            ) : avatar ? (
              <Image source={{uri: avatar}} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <AppText textType="regular14" style={styles.avatarText}>
                  Add Avatar
                </AppText>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => selectImage(false)}>
              <AppText textType="regular14" style={styles.imageButtonText}>
                Gallery
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton2}
              onPress={() => selectImage(true)}>
              <AppText textType="regular14" style={styles.imageButtonText}>
                Camera
              </AppText>
            </TouchableOpacity>
          </View>

          <AppInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />

          <AppInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#666',
  },
  imageButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
  },
  imageButton2: {
    backgroundColor: Colors.GREEN,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
  },
  imageButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
