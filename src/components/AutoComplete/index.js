import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function defaultKeyExtractor(_, index) {
  return `key-${index}`;
}
function DefaultResultList(props) {
  return <FlatList {...props} />;
}
function DefaultTextInput(props) {
  return <TextInput {...props} />;
}
function AutocompleteInputComponent(props, ref) {
  const defaultRenderItems = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        props.onPress(item);
      }}
      style={{paddingHorizontal: '5%', marginTop: 5, zIndex: 200}}>
      <Text>{String(item[props.valuekey])}</Text>
    </TouchableOpacity>
  );
  function renderResultList() {
    const {
      data,
      renderResultList: renderFunction = DefaultResultList,
      flatListProps,
    } = props;
    const listProps = {
      data,
      renderItem: defaultRenderItems,
      keyExtractor: defaultKeyExtractor,
      ...flatListProps,
      style: [styles.list, flatListProps?.style],
    };
    return renderFunction(listProps);
  }
  function renderTextInput() {
    const {renderTextInput: renderFunction = DefaultTextInput, style} = props;
    const textProps = {
      ...props,
      style: [styles.input],
      ref,
    };
    return renderFunction?.(textProps);
  }
  const {
    data,
    containerStyle,
    hideResults,
    inputContainerStyle,
    listContainerStyle,
    onShowResults,
    onStartShouldSetResponderCapture = () => false,
  } = props;
  const showResults = data.length > 0;
  onShowResults && onShowResults(showResults);
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer]}>{renderTextInput()}</View>
      {!hideResults && (
        <View
          style={{zIndex: 500, backgroundColor: 'red', flex: 1}}
          onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}>
          {showResults && renderResultList()}
        </View>
      )}
    </View>
  );
}
const border = {
  //   55,
};

const androidStyles = StyleSheet.create({
  container: {
    flex: 1,

    // Ensure the container has a lower zIndex initially
  },
  input: {
    marginTop: wp(2),
    borderWidth: 1,
    borderColor: '#979998',
    color: '#000',
    height: hp(5.5),
    backgroundColor: 'white',
    borderRadius: wp(2),
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    fontSize: 14,
    elevation: 3,
    justifyContent: 'center',
    zIndex: 2, // Ensure the input field is above the container
  },
  inputContainer: {
    ...border,
    marginBottom: 0,
    zIndex: 2, // Ensure the input container is above the list container
    position: 'relative',
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    position: 'absolute', // Absolute positioning for the list
    left: 0,
    right: 0,
    top: hp(0) + wp(2), // Positioned right below the input field
    zIndex: 3, // Ensure the dropdown list is above everything else
    maxHeight: hp(30), // Set a maximum height to enable scrolling
  },
});

const iosStyles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  inputContainer: {
    ...border,
  },
  input: {
    marginTop: wp(2),
    borderWidth: 1,
    borderColor: '#979998',
    color: '#000',
    height: hp(5.5),
    backgroundColor: 'white',
    borderRadius: wp(2),
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    fontSize: 14,
    elevation: 3,
    justifyContent: 'center',
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    position: 'absolute', // Absolute positioning for the list
    left: 0,
    right: 0,
    top: hp(5.5) + wp(2), // Positioned right below the input field
    zIndex: 1,
    maxHeight: hp(30), // Set a maximum height to enable scrolling
  },
});

//   const styles = StyleSheet.create({
//     ...Platform.select({
//       android: androidStyles,
//       ios: iosStyles,
//       default: iosStyles,
//     }),
//   });

const styles = StyleSheet.create({
  ...Platform.select({
    android: androidStyles,
    ios: iosStyles,
    default: iosStyles,
  }),
});
export const AutocompleteInput = React.forwardRef(AutocompleteInputComponent);
export default AutocompleteInput;
