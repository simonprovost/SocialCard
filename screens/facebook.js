import React, {Component } from "react";
import * as Facebook from "expo-facebook";
import {Button, Container, Text, View, Thumbnail, Body, Root, Icon} from "native-base";
import {GenericRoundedCard} from "../components/genericRoundedCard";
import {StyleSheet, TouchableOpacity, } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as dataConstants from './../app.json';
import {AppLoading} from "expo";

export class FacebookScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			name: null,
			picture: null,
			email: null,
			socialNetworkConnected: false,
			appId: null,
		};
		this.logInFacebook = this.logInFacebook.bind(this);
	}

	componentDidMount() {
		this.setState({appId: dataConstants.expo.extra.facebook.appId, loading: false})
	}

	async logInFacebook() {
		try {
			const { type, token, } = await Facebook.logInWithReadPermissionsAsync(this.state.appId, { permissions: ['public_profile', 'email',], });

			if (type === 'success') {
				const response = await fetch( `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),email` );
				const { picture, name, email } = await response.json();

				this.setState({picture: picture, name: name, email: email, socialNetworkConnected: true});
				showMessage({
					message: "Facebook Login Info",
					description: "User Connected.",
					type: "success",
					icon: "success",
				});
			} else {
				showMessage({
					message: "Facebook Login Info",
					description: "User cancelled the connexion method.",
					type: "info",
					icon: "info",
				});
			}
		} catch ({ message }) {
			showMessage({
				message: "Facebook Login Error",
				description: message,
				type: "danger",
				icon: "danger",
			});
		}
	}

	_onLayout = (event) => {
		this.props.find_dimensions(event.nativeEvent.layout)
	};

	render() {
		const {screenShot,} = this.props;

		if (this.state.loading) {
			return (
				<Root>
					<AppLoading
					/>
				</Root>
			);
		}
		let facebookCard = this.state.socialNetworkConnected ?
			<View style={styles.fbCard}>
				<View style={styles.container} collapsable={false} ref={view => { this.facebookView = view}} onLayout={(event) => { this._onLayout(event) }}>
					<GenericRoundedCard
						bottomRightCorner={this.state.picture.data.url}
						formatPictureBottomRight={'circle'}

						fontBottomLeftTitle={"SnapFont"}
						fontBottomLeftContent={"SnapFontLight"}
						contentBottomLeftTitle={"EMAIL"}
						contentBottomLeftText={this.state.email}
						colorBottomLeftTitle={"white"}
						colorBottomLeftText={"white"}
						sizeTitleBottomLeft={16}
						sizeContentBottomLeft={16}

						fontTopLeftCornerTitle={"SnapFontBold"}
						contentTopLeftCornerTitle={this.state.name}
						colorTopLeftCornerTitle={"white"}
						sizeTitleTopLeftCorner={32}

						headerRightCorner={'https://www.ameswessex.com/wp-content/uploads/2017/05/facebook-logo-png-white-i6-300x300.png'}
						formatPictureTopRightCorner={'square'}

						backgroundColorCard={"#3b5998"}
					/>
				</View>
				<Button rounded onPress={screenShot(this.facebookView)} title={"Screenshot Facebook view"} style={styles.screenshotButton}>
					<Text style={styles.titleScreenshotButton}>Screenshot</Text>
				</Button>
			</View>
			:
			<View style={styles.container}>
				<GenericRoundedCard
					bottomRightCorner={'https://cdn.ticketswap.com/public/testimonials/201906/d3aed318-ac92-4de9-8827-03d30e545ece.jpeg'}
					formatPictureBottomRight={'circle'}

					fontBottomLeftTitle={"SnapFont"}
					fontBottomLeftContent={"SnapFontLight"}
					contentBottomLeftTitle={"EMAIL"}
					contentBottomLeftText={'xxxx@xxxx.com'}
					colorBottomLeftTitle={"white"}
					colorBottomLeftText={"white"}
					sizeTitleBottomLeft={16}
					sizeContentBottomLeft={16}

					fontTopLeftCornerTitle={"SnapFontBold"}
					contentTopLeftCornerTitle={'XXXXX'}
					colorTopLeftCornerTitle={"white"}
					sizeTitleTopLeftCorner={32}

					headerRightCorner={'https://www.ameswessex.com/wp-content/uploads/2017/05/facebook-logo-png-white-i6-300x300.png'}
					formatPictureTopRightCorner={'square'}

					backgroundColorCard={"#3b5998"}
				/>
				<Button rounded onPress={this.logInFacebook} title={"Log in with Facebook button"} style={styles.loginFacebook} >
					<Icon name="logo-facebook" />
					<Text style={styles.textloginFbButton}>Log in With Facebook</Text>
				</Button>
			</View>;

		return(
			<Container>
				{facebookCard}
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10
	},
	countContainer: {
		alignItems: 'center',
		padding: 10
	},
	countText: {
		color: '#FF00FF'
	},
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fbCard: {
		flex:1,
	},
	screenshotButton: {
		flex: 1,
		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 1, //IOS
		marginLeft: '5%',
		marginRight: '5%',
		elevation: 2,
		backgroundColor: "#3b5998",
	},
	titleScreenshotButton: {
		fontFamily: 'Roboto',
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
	},
	loginFacebook: {
		flex: 1,
		backgroundColor: '#3b5998',

		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 1, //IOS
		marginLeft: '5%',
		marginRight: '5%',
		elevation: 2,
	},
	textloginFbButton: {
		fontFamily: 'Roboto',
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
	}
});