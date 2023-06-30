import { useContext, useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import AuthContext from '../context/AuthContext';
import { colors } from '../utils';

export default function ProfileScreen({ navigation }) {
  const { signOut, firstName, email } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState({
    order: true,
    password: true,
    special: true,
    newsletter: true,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (firstName || email) {
      setFormData((prev) => ({ ...prev, firstName: firstName, email: email }));
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='arrow-back-circle'
            size={32}
            color={colors.primary1}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMethod='scale'
          resizeMode='contain'
        />
        <Image
          source={require('../assets/profile.png')}
          style={styles.avatar}
          resizeMethod='scale'
          resizeMode='contain'
        />
      </View>

      <View style={styles.profileContainer}>
        {/* personal info */}
        <Text style={styles.sectionTitle}>Personal information</Text>
        <Text style={styles.label}>Avatar</Text>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.avatarInfo}
            resizeMethod='scale'
            resizeMode='contain'
          />
          <TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
            <Text style={styles.primaryButtonText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => {}}>
            <Text style={styles.secondaryButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.textInput}
          placeholder='First name'
          value={formData.firstName}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, firstName: text }))
          }
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Last name'
          value={formData.lastName}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, lastName: text }))
          }
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          value={formData.email}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
        />

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Phone number'
          value={formData.phoneNumber}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, phoneNumber: text }))
          }
          keyboardType='phone-pad'
        />

        {/* email notif */}
        <Text style={styles.sectionTitle}>Email notifications</Text>

        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setIsChecked((prev) => ({ ...prev, order: !prev.order }))
          }
        >
          <Ionicons
            name={isChecked.order ? 'checkbox' : 'square-outline'}
            color={colors.primary1}
            size={20}
          />
          <Text style={styles.checkboxText}>Order statuses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setIsChecked((prev) => ({ ...prev, password: !prev.password }))
          }
        >
          <Ionicons
            name={isChecked.password ? 'checkbox' : 'square-outline'}
            color={colors.primary1}
            size={20}
          />
          <Text style={styles.checkboxText}>Password change</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setIsChecked((prev) => ({ ...prev, special: !prev.special }))
          }
        >
          <Ionicons
            name={isChecked.special ? 'checkbox' : 'square-outline'}
            color={colors.primary1}
            size={20}
          />
          <Text style={styles.checkboxText}>Special offers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setIsChecked((prev) => ({ ...prev, newsletter: !prev.newsletter }))
          }
        >
          <Ionicons
            name={isChecked.newsletter ? 'checkbox' : 'square-outline'}
            color={colors.primary1}
            size={20}
          />
          <Text style={styles.checkboxText}>Newsletter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={signOut}>
          <Text style={styles.menuButtonText}>Log out</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
            <Text style={styles.primaryButtonText}>Discard Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => {}}>
            <Text style={styles.secondaryButtonText}>Save Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    paddingBottom: 40,
  },
  headerContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    height: 36,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  profileContainer: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopColor: colors.secondary4,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  avatarInfo: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  primaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.primary1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary1,
    marginLeft: 20,
  },
  primaryButtonText: {
    color: colors.secondary3,
    fontWeight: '500',
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.secondary3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary1,
    marginLeft: 20,
  },
  secondaryButtonText: {
    color: colors.primary1,
    fontWeight: '500',
  },
  label: {
    fontSize: 11,
    marginBottom: 6,
  },
  textInput: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  checkboxText: {
    fontSize: 12,
    color: colors.secondary4,
    marginLeft: 8,
  },
  menuButton: {
    backgroundColor: colors.primary2,
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary1,
    marginTop: 24,
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.secondary4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 32,
  },
});
