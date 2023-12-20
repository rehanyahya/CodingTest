import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {Controller} from 'react-hook-form';
import type {ControllerProps} from 'react-hook-form';

import type {TextInputProps} from 'react-native';
import styles from './styles';

type CustomTextInputProps = Omit<ControllerProps, 'render'> &
  TextInputProps & {
    error?: any;
    label: string;
  };

const CustomTextInput: React.FC<CustomTextInputProps> = props => {
  const {style} = props;
  const borderColor =
    props.error && props.error[props.name]
      ? {
          borderColor: 'red',
        }
      : {
          borderColor: '#9B9B9B',
        };

  return (
    <Controller
      defaultValue={props.defaultValue}
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({field: {onChange, value}}) => (
        <View>
          <Text style={styles.headingTextStyle}>{props.label}</Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={props.placeholder}
            placeholderTextColor={'grey'}
            {...props}
            style={[styles.textInputStyle, borderColor, style]}
          />
          {props.error && props.error[props.name] ? (
            <Text style={styles.errorTextStyle}>{`${props.label} ${
              props.error[props.name].message
            }`}</Text>
          ) : null}
        </View>
      )}
    />
  );
};

export default CustomTextInput;
