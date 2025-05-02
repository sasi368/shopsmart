import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
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

  const selectImage = async (fromCamera = false) => {
    const result = fromCamera
      ? await launchCamera({mediaType: 'photo'})
      : await launchImageLibrary({mediaType: 'photo'});

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
                <ActivityIndicator size="large" color="#007bff" />
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
              style={styles.imageButton}
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
    backgroundColor: '#007bff',
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
