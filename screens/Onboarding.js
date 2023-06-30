import { useContext, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { validateEmail } from '../utils';
import AuthContext from '../context/AuthContext';

export default function OnboardingScreen() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState({
    firstName: false,
    email: false,
  });

  const { onboardingIn } = useContext(AuthContext);

  const checkFirstName = (input) => {
    return /^[a-zA-Z]+$/.test(input);
  };

  const checkEmail = (input) => {
    return validateEmail(input);
  };

  const completeOnboarding = async () => {
    try {
      const storageData = JSON.stringify({
        status: true,
        firstName: firstName,
        email: email,
      });
      await AsyncStorage.setItem('onboarding-complete', storageData);
      onboardingIn({ status: true, firstName: firstName, email: email });
    } catch (e) {
      console.log('completeOnboarding: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMethod='scale'
        resizeMode='contain'
      />
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Let us get to know you</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              if (checkFirstName(text)) {
                setIsValid((prev) => ({ ...prev, firstName: true }));
              } else {
                setIsValid((prev) => ({ ...prev, firstName: false }));
              }
            }}
            style={styles.textInput}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (checkEmail(text)) {
                setIsValid((prev) => ({ ...prev, email: true }));
              } else {
                setIsValid((prev) => ({ ...prev, email: false }));
              }
            }}
            keyboardType='email-address'
            textContentType='emailAddress'
            style={styles.textInput}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={!(isValid.firstName && isValid.email)}
        style={[
          styles.buttonWrapper,
          (!isValid.firstName || !isValid.email) && styles.buttonDisabled,
        ]}
        onPress={() => completeOnboarding()}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  logo: {
    height: 60,
    width: '100%',
  },
  mainContainer: {
    flex: 0.8,
    justifyContent: 'space-around',
    paddingTop: 80,
  },
  headerText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: '70%',
    borderRadius: 8,
    height: 40,
    marginBottom: 20,
    padding: 10,
  },
  buttonWrapper: {
    alignSelf: 'flex-end',
    marginHorizontal: 40,
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: '#495E57',
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    top: -12,
  },
});
