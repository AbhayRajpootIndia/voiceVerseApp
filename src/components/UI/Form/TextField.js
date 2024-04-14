/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

// Components
import BaseContainer from '../Containers/BaseContainer';
import BaseText from '../Text/BaseText';

// icons
import Eye from '../../../assets/icons/eye-icon';

// Constants
import {AppColors} from '../../../constants/AppColors';

// redux
import {useSelector} from 'react-redux';

function EyeIcon({show = false, setShow = () => {}}) {
  return (
    <View style={styles.eyeIconContainer}>
      <TouchableOpacity onPress={() => setShow(prev => !prev)}>
        {show ? (
          <Eye width={20} height={20} crossed={true} />
        ) : (
          <Eye width={20} height={20} />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default function TextField({
  value = '',
  onChangeText = () => {},
  ref = null,
  placeholder = 'Text Field',
  maxLength = -1,
  placeholderTextColor = AppColors().LIGHT_GREY,
  valueTextStyle = {},
  placeholderTextStyle = {},
  onBlur = () => {},
  numberOfLines = 1,
  width = '100%',
  height = 50,
  multiline = false,
  borderColor = AppColors().LIGHT_GREY,
  shadowColor = borderColor,
  fontSize = 16,
  fontWeight = '500',
  keyboardType = 'default',
  secureTextEntry = false,
  allowSecureTextPreview = true,
  prefixText = '',
  prefixDividerColor = '#DDDDDD',
  prefixTextStyle = {},
  leftComponent = null,
  rightComponent = <></>,
  textFieldStyle = {},
  containerStyle = {},
  ...rest
}) {
  const theme = useSelector(state => state.theme.theme);

  const textStyle = value.length > 0 ? valueTextStyle : placeholderTextStyle;
  const [showValue, setShowValue] = useState(false);

  return (
    <BaseContainer
      style={[
        styles.container,
        {
          width: width,
          height: height < 30 ? 30 : height,
          borderColor: borderColor,
          shadowColor: shadowColor,
        },
        containerStyle,
      ]}>
      {leftComponent}

      {prefixText.length > 0 && (
        <View style={styles.prefixContainer}>
          <BaseText
            style={[
              styles.prefixStyle,
              {borderRightColor: prefixDividerColor},
              prefixTextStyle,
            ]}
            fontWeight="500"
            fontSize={14}>
            {prefixText}
          </BaseText>
          {Platform.OS === 'ios' && (
            <BaseText fontSize={30} fontWeight="200" color={prefixDividerColor}>
              |
            </BaseText>
          )}
        </View>
      )}

      <TextInput
        ref={ref}
        multiline={multiline}
        style={[
          styles.textFieldContainer,
          {
            fontSize: fontSize,
            fontWeight: !value ? '300' : fontWeight,
            // fontFamily: 'Arial',
            color: AppColors(theme).BLACK,
            paddingLeft: leftComponent ? 10 : 15,
            width:
              secureTextEntry && allowSecureTextPreview && value
                ? '80%'
                : '90%',
          },
          textStyle,
          textFieldStyle,
        ]}
        onBlur={onBlur}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry && !showValue}
        value={value}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        maxLength={maxLength !== -1 ? maxLength : null}
        {...rest}
      />

      {secureTextEntry && allowSecureTextPreview && value && (
        <EyeIcon show={showValue} setShow={setShowValue} />
      )}

      {rightComponent}
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
  },
  textFieldContainer: {
    width: '100%',
    margin: 0,
    paddingVertical: 2,
    paddingHorizontal: 15,
    textDecorationLine: 'none',
  },
  prefixContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
    paddingLeft: 2,
  },
  prefixStyle: {
    borderRightWidth: 1,
    borderRightColor: 'black',
    height: '70%',
    textAlignVertical: 'center',
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 9 : 5,
  },
  eyeIconContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '4%',
  },
});
