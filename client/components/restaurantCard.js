import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import UserContext from '../UserContext';


const RestaurantCard = ({ restaurant }) => {
  const { isLoggedIn, setYelpData,setRefresh, refresh } = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    fetch('http://127.0.0.1:5555/partyvotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: isLoggedIn.id,
        restaurantId: restaurant.id,
        voted: true
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

    fetch('http://127.0.0.1.5555/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({restaurant})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

    setIsSubmitted(true);
    setYelpData(null)
    setRefresh(!refresh)
  }

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => window.open(restaurant.url, '_blank')}>
      <Image style={styles.image} source={{ uri: restaurant.image_url }} />
      <View >
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.category}>
          {restaurant.categories && restaurant.categories.length > 0 ? restaurant.categories[0].title : ''}
        </Text>
        <View style={styles.rating}>
          {[...Array(Math.floor(restaurant.rating))].map((_, i) => (
            <Ionicons key={i} name='star' color={'#2EC4B6'}/>
            ))}
          {restaurant.rating % 1 !== 0 && (
            <Ionicons name='star-half' color={'#2EC4B6'}/>
            )}
          <Text style={styles.ratingText}>{restaurant.rating}</Text>
          <Text style={styles.reviewCount}>({restaurant.review_count})</Text>
        </View>
        <Text style={styles.address}>{restaurant.location.address1}</Text>
        <Text style={styles.address}>
          {restaurant.location.city}, {restaurant.location.state} {restaurant.location.zip_code}
        </Text>
        <Text style={styles.address}>{restaurant.display_phone}</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          size={25}
          fillColor="#2EC4B6"
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "#2EC4B6" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={() => setIsChecked(!isChecked)}
        />
        {isChecked && !isSubmitted && (
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        )}
        {isChecked && isSubmitted && (
          <Text style={styles.submitted}>Submitted</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    height: 125,
    width: 125,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 8
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    color: '#666',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  star: {
    height: 16,
    width: 16,
    marginRight: 4,
    color: '#2EC4B6'
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  }, 
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 15,
  },
});

export default RestaurantCard;
