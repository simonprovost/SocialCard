import React, {Component } from "react";
import * as Facebook from "expo-facebook";
import {Button, Container, Root, Text, View} from "native-base";
import {GenericRoundedCard} from "../components/genericRoundedCard";
import {StyleSheet} from "react-native";
import InstagramLogin from "react-native-instagram-login";
import {showMessage} from "react-native-flash-message";
import * as dataConstants from './../app.json';
import {AppLoading} from "expo";

export class InstagramScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			tokenInsta: null,
			pseudoInstagram: null,
			followingInstagram: 0,
			followersInstagram: 0,
			socialNetworkConnected: false,
			redirectURI: null,
			clientID: null,
		};
	}

	componentDidMount() {
		this.setState({
			clientID: dataConstants.expo.extra.instagram.clientID,
			redirectURI: dataConstants.expo.extra.instagram.redirectURI,
			loading: false,
		})
	}

	addInstagramInfoUser = (data) => {
		this.setState({pseudoInstagram: data.data.username, followingInstagram: data.data.counts.follows,
			followersInstagram: data.data.counts.followed_by, socialNetworkConnected: true})
	};

	getInstagramInfoUser = (access_token) => {

		fetch('https://api.instagram.com/v1/users/self/?access_token='+access_token)
			.then((response) => response.json())
			.then((responseJson) => {
				this.addInstagramInfoUser(responseJson);
			})
			.catch((error) => {
				showMessage({
					message: "Instagram Login Info",
					description: "Request to Instagram API was broke." + error,
					type: "warning",
					icon: "warning",
				});
				console.error(error);
			});

	};


	_onLayout = (event) => {
		this.props.find_dimensions(event.nativeEvent.layout)
	};

	_loginSuccessInstagram = () => {
		this.getInstagramInfoUser(token);
		showMessage({
			message: "Instagram Login Info",
			description: "User Connected.",
			type: "success",
			icon: "success",
		})
	}

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

		let instaCard =
			this.state.socialNetworkConnected ?
				<View style={styles.instagramCard}>
					<View style={styles.container}
					      collapsable={false}
					      ref={view => {this.instaView = view}}
					      onLayout={(event) => { this._onLayout(event) }}
					>
						<GenericRoundedCard
							fontBottomRightTitle={"SnapFont"}
							fontBottomRightContent={"SnapFontLight"}
							contentBottomRightTitle={"FOLLOWING"}
							contentBottomRightText={this.state.followingInstagram}
							sizeTitleBottomRight={16}
							sizeContentBottomRight={16}
							colorBottomRightTitle={"#282c34"}
							colorBottomRightText={"#282c34"}

							fontBottomLeftTitle={"SnapFont"}
							fontBottomLeftContent={"SnapFontLight"}
							contentBottomLeftTitle={"FOLLOWERS"}
							contentBottomLeftText={this.state.followersInstagram}
							colorBottomLeftTitle={"#282c34"}
							colorBottomLeftText={"#282c34"}
							sizeTitleBottomLeft={16}
							sizeContentBottomLeft={16}

							fontTopLeftCornerTitle={"SnapFontBold"}
							contentTopLeftCornerTitle={this.state.pseudoInstagram}
							colorTopLeftCornerTitle={"#282c34"}
							sizeTitleTopLeftCorner={32}

							headerRightCorner={'https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png'}
							formatPictureTopRightCorner={'square'}

							backgroundColorCard={"white"}
						/>
					</View>
					<Button rounded onPress={() => this.props.screenShot(this.instaView)}
					        title={"Screenshot Insta view"} style={styles.screenShotButton}>
						<Text style={styles.textScreenShotButton}>Screenshot</Text>
					</Button>
				</View>
				:
				<Container style={styles.container}>

					<GenericRoundedCard
						fontBottomRightTitle={"SnapFont"}
						fontBottomRightContent={"SnapFontLight"}
						contentBottomRightTitle={"FOLLOWERS"}
						contentBottomRightText={"XXXX"}
						sizeTitleBottomRight={16}
						sizeContentBottomRight={16}
						colorBottomRightTitle={"#282c34"}
						colorBottomRightText={"#282c34"}

						fontBottomLeftTitle={"SnapFont"}
						fontBottomLeftContent={"SnapFontLight"}
						contentBottomLeftTitle={"FOLLOWING"}
						contentBottomLeftText={"XXXX XXXX"}
						colorBottomLeftTitle={"#282c34"}
						colorBottomLeftText={"#282c34"}
						sizeTitleBottomLeft={16}
						sizeContentBottomLeft={16}

						fontTopLeftCornerTitle={"SnapFontBold"}
						contentTopLeftCornerTitle={"XXXXX"}
						colorTopLeftCornerTitle={"#282c34"}
						sizeTitleTopLeftCorner={32}

						headerRightCorner={'https://i.pinimg.com/originals/ff/0e/20/ff0e20de4718fe14cdd256c81c5db771.png'}
						formatPictureTopRightCorner={'square'}

						backgroundColorCard={"white"}
					/>
					<Button rounded onPress={() => this.instagramLogin.show()} title={"Log in with insta button"} style={styles.loginInstagram} >
						<Text style={styles.textLoginInstagramButton}>Log in With Instagram</Text>
					</Button>
					<InstagramLogin
						ref= {ref => this.instagramLogin= ref}
						clientId={this.state.clientID} redirectUrl={this.state.redirectURI} scopes={['basic']}

						onLoginSuccess={(token) => { this._loginSuccessInstagram(token) }}
						onLoginFailure={(data) => {
							showMessage({
								message: "Instagram Login Info",
								description: "User connexion failed.",
								type: "danger",
								icon: "danger",
							});
						}}
					/>
				</Container>;

		return(
			<Container>
				{instaCard}
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
	instagramCard: {
		flex:1,
	},
	screenShotButton: {
		flex: 1,

		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 1, //IOS

		elevation: 2,
		marginLeft: '5%',
		marginRight: '5%',
		backgroundColor: "white",

	},
	textScreenShotButton: {
		fontFamily: 'Roboto',
		color: '#282c34',
		fontSize: 16,
		fontWeight: '500',
	},
	loginInstagram: {
		backgroundColor: 'white',

		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 1, //IOS

		elevation: 2,
		marginLeft: '5%',
		marginRight: '5%',
	},
	textLoginInstagramButton: {
		fontFamily: 'Roboto',
		color: '#282c34',
		fontSize: 16,
		fontWeight: '500',
	}
});