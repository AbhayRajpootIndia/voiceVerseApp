import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// constants
import {AppColors} from '../../constants/AppColors';

// Redux
import {useSelector} from 'react-redux';

export default function MainBottomTabBar({state, descriptors, navigation}) {
  const theme = useSelector(state => state.theme.theme);

  return (
    <View
      style={[styles.container, {backgroundColor: AppColors(theme).SECONDARY}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const labelSize = descriptors[route.key].options.tabBarLabelSize;

        const labelColor = isFocused
          ? descriptors[route.key].options.activeColor
          : descriptors[route.key].options.inactiveColor;

        const Icon = isFocused
          ? descriptors[route.key].options.activeIcon
          : descriptors[route.key].options.inactiveIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
            style={styles.tabButton}>
            {Icon}
            <Text style={{color: labelColor, fontSize: labelSize || 12}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    columnGap: 50,
    height: 80,
    elevation: 50,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  tabButton: {
    width: 55,
    height: 55,
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 4,
  },
});
