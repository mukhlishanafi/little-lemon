import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import debounce from 'lodash.debounce';

import {
  colors,
  getImageUrl,
  getSectionListData,
  useUpdateEffect,
} from '../utils';
import Filters from '../components/Filters';
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from '../database';

const sections = ['starters', 'mains', 'desserts', 'drinks'];

export default function HomeScreen({ navigation }) {
  const [menuList, setMenuList] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
      );
      const result = await response.json();
      setMenuList(result.menu);
      return result.menu;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = [];
        menuItems = await getMenuItems();

        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        const { sectionListData } = getSectionListData(menuItems);
        setMenuList(sectionListData);
      } catch (e) {
        // Handle error
        console.log(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const { sectionListData } = getSectionListData(menuItems);
        setMenuList(sectionListData);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
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
      <View style={styles.heroContainer}>
        <View style={styles.heroSubContainer}>
          <View style={styles.heroSubWrapper}>
            <Text style={styles.heroTitle}>Little Lemon</Text>
            <Text style={styles.heroSubTitle}>Chicago</Text>
            <Text style={styles.heroDescription}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image
            source={require('../assets/hero-image.png')}
            style={styles.heroImage}
            resizeMethod='scale'
            resizeMode='cover'
          />
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name='search' color={colors.primary1} size={20} />
          <TextInput
            style={styles.searchInput}
            value={searchBarText}
            onChangeText={handleSearchChange}
            placeholder='Search'
          />
        </View>
      </View>

      {/* category */}
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />

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
  heroContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.primary1,
  },
  heroSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  heroSubWrapper: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 40,
    color: colors.primary2,
    fontWeight: '700',
  },
  heroSubTitle: {
    fontSize: 32,
    color: colors.secondary3,
    fontWeight: '400',
    marginBottom: 20,
  },
  heroDescription: {
    fontSize: 14,
    color: colors.secondary3,
    fontWeight: '600',
  },
  heroImage: {
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.secondary3,
    borderRadius: 24,
    padding: 8,
    marginTop: 20,
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
    opacity: 0.75,
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
