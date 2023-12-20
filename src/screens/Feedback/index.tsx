import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Alert, ScrollView} from 'react-native';
import styles from './styles';
import StarRating from 'react-native-star-rating-widget';
import {CustomTextInput} from '../../components';
import {useForm} from 'react-hook-form';
import {EMAIL_ADDRRESS_RULE, NAME_RULE} from '../../util';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const Feedback = () => {
  const [rating, setRating] = useState(0);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data: any) => {
    if (rating === 0) {
      Alert.alert('Rating', 'Rating is required');
    } else {
      try {
        const formValue = JSON.stringify({
          ...data,
          rating,
        });
        await AsyncStorage.setItem('formValue', formValue);
        showMessage({
          message: 'Feedback has been sumitted',
          type: 'success',
        });
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 16}}>
        <CustomTextInput
          label="Name"
          name="name"
          control={control}
          placeholder="Enter Name"
          rules={NAME_RULE}
          error={errors}
        />
        <CustomTextInput
          label="Email Address"
          name="email"
          control={control}
          placeholder="Enter Email Address"
          rules={EMAIL_ADDRRESS_RULE}
          error={errors}
          keyboardType="email-address"
        />
        <Text style={styles.headingTextStyle}>Rating</Text>
        <StarRating rating={rating} onChange={setRating} starSize={50} />
        <CustomTextInput
          label="Feedback"
          name="feedback"
          control={control}
          placeholder="Enter Feedback"
          multiline={true}
          style={styles.feedbackTextContainer}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonTextStyle}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feedback;
