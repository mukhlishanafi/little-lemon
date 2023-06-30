import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, titleCase } from '../utils';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={section + index}
          onPress={() => {
            onChange(index);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8,
            marginRight: 16,
            backgroundColor: selections[index]
              ? colors.primary1
              : colors.secondary3,
            borderWidth: 1,
            borderColor: colors.primary1,
            borderRadius: 16,
          }}
        >
          <View>
            <Text
              style={{
                color: selections[index] ? colors.secondary3 : colors.primary1,
                fontWeight: '600',
                fontSize: 14,
              }}
            >
              {titleCase(section)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: colors.secondary3,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary4,
  },
});

export default Filters;
