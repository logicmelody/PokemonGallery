import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	TouchableWithoutFeedback,
	Animated, // provides methods for animating components
	Easing, // for implementing easing functions
} from "react-native";
import IconButton from "./IconButton";

const Card = ({
	item,
	cardAction,
	viewAction,
	bookmarkAction,
	shareAction
}) => {
	let scaleValue = new Animated.Value(0); // declare an animated value

	const cardScale = scaleValue.interpolate({
		inputRange: [0, 0.5, 1], // scaleValue on th top
		outputRange: [1, 1.1, 1.2] // the scale which each scaleValue maps to
	});

	let transformStyle = { ...styles.card, transform: [{ scale: cardScale }] };

	return (
		<TouchableWithoutFeedback
			onPressIn={() => {
				scaleValue.setValue(0);

				Animated.timing(scaleValue, {
					toValue: 1, // update the animated value to
					duration: 250, // how long the animation will take in milliseconds
					easing: Easing.linear, // easing function to use (https://facebook.github.io/react-native/docs/easing.html)
					useNativeDriver: true // delegate all the animation related work to the native layer
				}).start(); // start the animation

				cardAction();
			}}
			onPressOut={() => {
				Animated.timing(scaleValue, {
					toValue: 0, // reset the animated value to 0
					duration: 100, // animate over 100ms
					easing: Easing.linear,
					useNativeDriver: true
				}).start();
			}}
		>
			<Animated.View style={transformStyle}>
				<Image source={item.pic} style={styles.thumbnail} />

				<Text style={styles.name}>{item.name}</Text>

				<View style={styles.icons}>
					<IconButton
						icon="search"
						onPress={() => {
							viewAction(item.name, item.full_pic);
						}}
						data={item}
					/>

					<IconButton icon="bookmark" onPress={bookmarkAction} data={item} />

					<IconButton icon="share" onPress={shareAction} data={item} />
				</View>

			</Animated.View>

		</TouchableWithoutFeedback>
	);
};

const styles = {
	card: {
		width: 120,
		height: 140,
		backgroundColor: "#fafbfc",
		padding: 10,
		margin: 10,
		alignItems: "center"
	},
	name: {
		fontSize: 15,
		color: "#333",
		fontWeight: "bold"
	},
	thumbnail: {
		width: 75,
		height: 75
	},
	icons: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-between"
	}
};

export default Card;
