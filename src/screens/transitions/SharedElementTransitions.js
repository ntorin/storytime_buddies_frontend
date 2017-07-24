import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import Row from '../../components/Row';

class Transitions extends React.Component {

  showCardsExample = () => {
    this.props.navigator.showModal({
      title: 'Cards',
      screen: 'storytime_buddies_frontend.Transitions.SharedElementTransitions.Cards',
    });
  };

  showProfileExample = () => {
    this.props.navigator.showModal({
      title: 'Profiles',
      screen: 'storytime_buddies_frontend.Transitions.SharedElementTransitions.Profiles',
    });
  };

  showMasonryExample = () => {
    this.props.navigator.showModal({
      title: 'Masonry',
      screen: 'storytime_buddies_frontend.Transitions.SharedElementTransitions.Masonry',
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Row title={'Cards'} onPress={this.showCardsExample}/>
        {/*<Row title={'Profiles'} onPress={this.showProfileExample} />*/}
        <Row title={'Masonry'} onPress={this.showMasonryExample}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default Transitions;
