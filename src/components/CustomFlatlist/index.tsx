import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import type {FlatListProps} from 'react-native';
import {useAppDispatch} from '../../store/hooks';

type PayloadType = {
  limit: number;
  offset: number;
  searchText?: string;
};

type Props = FlatListProps<any> & {
  apiRequest: Function;
  loading: boolean;
  payload: PayloadType;
  totalCount: number;
};

let limit = 0;
let offset = 0;
let onEndReachBlocked = false;

const CustomFlatlist: React.FC<Props> = props => {
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const sendRequest = async (
    payload: PayloadType,
    loadingCallback?: (loading: boolean) => void,
  ) => {
    try {
      if (loadingCallback) {
        loadingCallback(true);
      }
      await dispatch(props.apiRequest({...props.payload, ...payload})).unwrap();
      if (loadingCallback) {
        loadingCallback(false);
      }
    } catch (error) {
      if (loadingCallback) {
        loadingCallback(false);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    sendRequest(props.payload);
    limit = props.payload.limit;
    offset = props.payload.offset;
  }, [props.payload.searchText]);

  const onEndReached = async () => {
    try {
      if (
        !onEndReachBlocked &&
        props.data &&
        props.data?.length < props.totalCount
      ) {
        onEndReachBlocked = true;
        offset = offset + limit;
        await sendRequest({offset, limit}, setIsLoadMore);
        onEndReachBlocked = false;
      }
    } catch (error) {
      onEndReachBlocked = false;
      console.log(error);
    }
  };

  const renderFooter = () => {
    return isLoadMore ? <ActivityIndicator size={60} /> : null;
  };

  const onRefresh = () => {
    sendRequest({offset: 0, limit}, setIsRefreshing);
  };

  if (props.loading && props.data && props.data.length < 1) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={70} />
      </View>
    );
  }

  return (
    props.data &&
    props.data.length > 0 && (
      <FlatList
        {...props}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    )
  );
};

export default CustomFlatlist;
