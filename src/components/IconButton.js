import React, { Component } from "react";
import { 
	View, 
	TouchableWithoutFeedback,
	Animated, // provides methods for animating components
	Easing, // for implementing easing functions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const icon_color = "#586069";
const icon_size = 15;

class IconButton extends Component {
	constructor(props) {
		super(props);

		this.rotateValue = new Animated.Value(0); // declare animated value
	}

	render() {
		const { icon, onPress, data } = this.props;

		let rotation = this.rotateValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "360deg"] // degree of rotation
		});
		// next: add transformStyle

		let transformStyle = { transform: [{ rotate: rotation }] };

		return (
			<TouchableWithoutFeedback
				onPressIn={() => {
					Animated.timing(this.rotateValue, {
						toValue: 1,
						duration: 700,
						easing: Easing.linear
					}).start();

					onPress(data);
				}}
				onPressOut={() => {
					Animated.timing(this.rotateValue, {
						toValue: 0,
						duration: 350,
						easing: Easing.linear
					}).start();
				}}
			>
				<Animated.View style={transformStyle}>
					<Icon
						name={icon}
						style={styles.icon}
						size={icon_size}
						color={icon_color}
					/>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	icon: {
		paddingLeft: 5,
		paddingRight: 5
	}
};

export default IconButton;
