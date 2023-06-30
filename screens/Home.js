import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, getImageUrl } from '../utils';

export default function HomeScreen({ navigation }) {
  const [menuList, setMenuList] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );


  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
      );
      const result = await response.json();
      setMenuList(result.menu);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View />
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMethod='scale'
          resizeMode='contain'
        />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.avatar}
            resizeMethod='scale'
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={menuList}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => {
          return (
            <View style={styles.menuWrapper}>
              <View style={styles.menuInfoWrapper}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text
                  style={styles.menuDescription}
                  numberOfLines={2}
                  ellipsizeMode='tail'
                >
                  {item.description}
                </Text>
                <Text style={styles.menuPrice}>${item.price}</Text>
              </View>
              <Image
                source={{ uri: getImageUrl(item.image) }}
                style={styles.menuImage}
                resizeMethod='scale'
                resizeMode='center'
              />
            </View>
          );
        }}
        ItemSeparatorComponent={<View style={styles.separatorLine} />}
      />
    </View>
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
  menuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  menuInfoWrapper: {
    flex: 1,
    paddingRight: 16,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary4,
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.secondary4,
    marginBottom: 8,
  },
  menuPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary4,
    marginBottom: 8,
    opacity:0.75
  },
  menuImage: {
    height: 120,
    width: 120,
  },
  separatorLine: {
    height: 1,
    backgroundColor: colors.secondary4,
    opacity: 0.1,
    marginHorizontal: 16,
  },
});
