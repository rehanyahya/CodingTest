import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import styles from './styles';

import {CustomFlatlist} from '../../components';
import {clearPosts, getPostsFromGiphyAction} from '../../store/slices/posts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import ImageLoad from 'react-native-image-placeholder';
import {debounceSearch} from '../../util';

const Home = (props: any) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.feedbackButtonContainer}
          onPress={() => props.navigation.navigate('Feedback')}>
          <Text style={{color: 'black'}}>Feedback</Text>
        </Pressable>
      ),
    });
  }, [props.navigation]);

  const posts = useAppSelector(state => state.posts);

  const sendSearchRequest = (_value: string) => {
    setSearchText(_value);
    dispatch(clearPosts());
  };

  const renderItem = useCallback(
    ({item}: {item: string}) => {
      const postData = posts.data.entities[item];

      return (
        <View>
          <ImageLoad
            style={{
              width: 200,
              height: 200,
            }}
            source={{
              uri: postData.images.original.url,
            }}
          />
          <Text style={styles.textStyle}>{postData.title}</Text>
        </View>
      );
    },
    [posts],
  );

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Search..."
        placeholderTextColor={'grey'}
        onChangeText={(value: string) =>
          debounceSearch(value, sendSearchRequest)
        }
      />
      <CustomFlatlist
        apiRequest={getPostsFromGiphyAction}
        payload={{
          limit: 15,
          offset: 0,
          searchText,
        }}
        data={posts.data.ids}
        renderItem={renderItem}
        keyExtractor={(item: string) => item}
        loading={posts.loading}
        contentContainerStyle={styles.flatlistContainerStyle}
        ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
        totalCount={posts.pagination.total_count}
      />
    </View>
  );
};

export default Home;
