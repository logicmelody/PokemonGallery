import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	Animated, // add this
	Easing // add this
} from "react-native";
import DataRow from "./DataRow";

class BigCard extends Component {
	constructor(props) {
		super(props);

		this.imageOpacityValue = new Animated.Value(0);
		this.titleTranslateYValue = new Animated.Value(0);
		this.titleScaleValue = new Animated.Value(0);
	}

	renderDataRows = data => {
		return data.map((item, index) => {
			return (
				<DataRow
					label={item.label}
					value={item.value}
					index={index}
					key={item.label}
				/>
			);
		});
	};

	render() {
		const { image, title, data } = this.props;

		const imageOpacity = this.imageOpacityValue.interpolate({
			inputRange: [0, 0.25, 0.5, 0.75, 1],
			outputRange: [0, 0.25, 0.5, 0.75, 1]
		});

		// construct the image style
		const imageOpacityStyle = {
			opacity: imageOpacity
		};

		// interpolate the vertical position of the title
		const titleMoveY = this.titleTranslateYValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 280]
		});

		// interpolate the scale of the title
		const titleScale = this.titleScaleValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0.25, 0.5, 1]
		});

		// construct the styles for the title
		const titleTransformStyle = {
			transform: [{ translateY: titleMoveY }, { scale: titleScale }]
		};

		return (
			<View style={styles.container}>
				<View style={styles.mainContainer}>
					<Animated.Image
						source={image}
						style={[styles.image, imageOpacityStyle]}
						resizeMode={"contain"}
					/>

					<Animated.View style={[styles.titleContainer, titleTransformStyle]}>
						<Text style={styles.title}>{title}</Text>
					</Animated.View>
				</View>

				{data && (
					<View style={styles.dataContainer}>{this.renderDataRows(data)}</View>
				)}
			</View>
		);
	}

	componentDidUpdate() {
		// reset the animated values
		this.imageOpacityValue.setValue(0);
		this.titleTranslateYValue.setValue(0);
		this.titleScaleValue.setValue(0);

		// start the sequence
		Animated.sequence([
			Animated.timing(this.imageOpacityValue, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear
			}),
			Animated.timing(this.titleTranslateYValue, {
				toValue: 1,
				duration: 300,
				easing: Easing.linear
			}),
			Animated.timing(this.titleScaleValue, {
				toValue: 1,
				duration: 300,
				easing: Easing.linear
			})
		]).start();
	}
}

const styles = {
	container: {
		flex: 1
	},
	title: {
		fontSize: 25,
		fontWeight: "bold"
	},
	mainContainer: {
		flex: 2,
		justifyContent: "flex-start",
		alignItems: "center"
	},
	image: {
		width: 200,
		height: 150
	},
	dataContainer: {
		flex: 2,
		flexDirection: "column",
		padding: 20
	},
	titleContainer: {
		position: "absolute",
		top: -100
	},
};

export default BigCard;
