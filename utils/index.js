import { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const getInitials = (fullName) => {
  const allNames = fullName.trim().split(' ');
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
  return initials;
};

export const getImageUrl = (imageFileName) => {
  return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;
};

export const colors = {
  primary1: '#495E57',
  primary2: '#F4CE14',
  secondary1: '#EE9972',
  secondary2: '#FBDABB',
  secondary3: '#EDEFEE',
  secondary4: '#333333',
};

export const globalStyle = StyleSheet.create({
  displayTitle: {
    fontSize: 64,
    fontWeight: '600',
    color: colors.secondary4,
  },
  subTitle: {
    fontSize: 40,
    color: colors.secondary4,
  },
  leadText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'capitalize',
    color: colors.secondary4,
  },
  sectionCategories: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.secondary4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary4,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.secondary4,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export function getSectionListData(data) {
  let sectionListData = [];
  let categoryData = [];
  if (data.length > 0) {
    data?.map((item) => {
      const categoryIndex = sectionListData.findIndex(
        (data) => data.category === item.category
      );

      if (categoryIndex < 0) {
        categoryData.push(item.category);
      }

      sectionListData.push({
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        category: item.category,
      });
    });
  }
  return { sectionListData, categoryData };
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
