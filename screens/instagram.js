import React, {Component } from "react";
import * as Facebook from "expo-facebook";
import {Button, Container, Text, View} from "native-base";
import {GenericRoundedCard} from "../components/genericRoundedCard";
import {StyleSheet} from "react-native";
import InstagramLogin from "react-native-instagram-login";
import {showMessage} from "react-native-flash-message";

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
		};
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


	render() {
		let instaCard =
			this.state.socialNetworkConnected ?
				<View style={{flex: 1,}}>
					<View style={styles.container}
					      collapsable={false}
					      ref={view => {
						      this.instaView = view}}
					      onLayout={(event) => { this.props.find_dimensions(event.nativeEvent.layout) }}
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

							bgCard={"white"}
						/>
					</View>
					<Button rounded
					        onPress={() => this.props.screenShot(this.instaView)}
					        title={"Screenshot Insta view"}
					        style={{flex: 1,
						        marginBottom: 50,

						        shadowColor: 'rgba(0,0,0, .4)', // IOS
						        shadowOffset: { height: 1, width: 1 }, // IOS
						        shadowOpacity: 1, // IOS
						        shadowRadius: 1, //IOS

						        elevation: 2,
						        marginLeft: 10,
						        marginRight: 10,
						        backgroundColor: "white",

					        }}
					>
						<Text style={{
							fontFamily: 'Roboto',
							color: '#282c34',
							fontSize: 16,
							fontWeight: '500',
						}}>Screenshot</Text>
					</Button>
				</View>
				:
				<Container>

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

						bgCard={"white"}
					/>
					<Button rounded
					        onPress={() => this.instagramLogin.show()}
					        title={"Log in with insta button"}
					        style={{flex: 1,
						        backgroundColor: 'white',
						        marginBottom: 50,

						        shadowColor: 'rgba(0,0,0, .4)', // IOS
						        shadowOffset: { height: 1, width: 1 }, // IOS
						        shadowOpacity: 1, // IOS
						        shadowRadius: 1, //IOS

						        elevation: 2,
						        marginLeft: 10,
						        marginRight: 10,
					        }}
					>
						<Text style={{
							fontFamily: 'Roboto',
							color: '#282c34',
							fontSize: 16,
							fontWeight: '500',
						}}>Log in With Instagram</Text>
					</Button>
					<InstagramLogin
						ref= {ref => this.instagramLogin= ref}
						clientId='b6593dc2f7c94d51a0faf65b1d3c0093'
						redirectUrl='https://google.com'
						scopes={['basic']}

						onLoginSuccess={(token) => {
							this.getInstagramInfoUser(token);
							showMessage({
								message: "Instagram Login Info",
								description: "User Connected.",
								type: "success",
								icon: "success",
							});
						}}
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
	}
});