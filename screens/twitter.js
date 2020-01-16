import React, {Component } from "react";
import * as Facebook from "expo-facebook";
import {Button, Container, Root, Text, View} from "native-base";
import {GenericRoundedCard} from "../components/genericRoundedCard";
import {AsyncStorage, StyleSheet} from "react-native";
import twitter, {TWLoginButton} from "react-native-simple-twitter";
import {AppLoading} from "expo";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as dataConstants from './../app.json';

export class TwitterScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			socialNetworkConnected: false,
			nameTwitter: null,
			pseudoTwitter: null,
			followingTwitter: 0,
			followersTwitter: 0,
		};
	}

	async componentDidMount() {
		loadResourcesAsync = async () => Promise.all([
			twitter.setConsumerKey(dataConstants.expo.extra.twitter.consumerKey,dataConstants.expo.extra.twitter.consumerKeySecret),
		]);
		this.setState({loading: false});
	}

	onGetAccessTokenTwitter = ({ oauth_token: token, oauth_token_secret: tokenSecret }) => {
		this.setState({
			token,
			tokenSecret
		})
	};
	onSuccessTwitter = async (user) => {
		try {
			await AsyncStorage.setItem("user", JSON.stringify({ ...user, token: this.state.token, tokenSecret: this.state.tokenSecret })) //for something in the future(like not needed new connection because these infos will be add in the stoage).
		}
		catch (err) {
			showMessage({
				message: "Twitter Login Info",
				description: "Twitter connexion failed.",
				type: "danger",
				icon: "danger",
			});
			return;
		}
		showMessage({
			message: "Twitter Login Info",
			description: "Twitter connexion was done successfully.",
			type: "success",
			icon: "success",
		});
		this.setState({nameTwitter: user.name, pseudoTwitter: user.screen_name,
			followingTwitter: user.friends_count, followersTwitter: user.followers_count
			, socialNetworkConnected: true});
	};

	onPressTwitter = (e) => {
	};

	onCloseTwitter = (e) => {
		showMessage({
			message: "Twitter Login Info",
			description: "User cancelled Twitter log in connexion.",
			type: "info",
			icon: "info",
		});
	};

	onErrorTwitter = (err) => {
		showMessage({
			message: "Twitter Login Info",
			description: err,
			type: "danger",
			icon: "danger",
		});
	};

	render() {
		if (this.state.loading) {
			return (
				<Root>
					<AppLoading
					/>
				</Root>
			);
		}

		let twitterCard = this.state.socialNetworkConnected?
			<View style={{flex: 1, }}>
				<View style={styles.container}
				      collapsable={false}
				      ref={view => {
					      this.twitterView = view}}
				      onLayout={(event) => { this.find_dimensions(event.nativeEvent.layout) }}
				>
					<GenericRoundedCard
						fontBottomRightTitle={"SnapFont"}
						fontBottomRightContent={"SnapFontLight"}
						contentBottomRightTitle={"FOLLOWERS"}
						contentBottomRightText={this.state.followersTwitter}
						sizeTitleBottomRight={16}
						sizeContentBottomRight={16}
						colorBottomRightTitle={"white"}
						colorBottomRightText={"white"}

						fontBottomLeftTitle={"SnapFont"}
						fontBottomLeftContent={"SnapFontLight"}
						contentBottomLeftTitle={"FOLLOWING"}
						contentBottomLeftText={this.state.followingTwitter}
						colorBottomLeftTitle={"white"}
						colorBottomLeftText={"white"}
						sizeTitleBottomLeft={16}
						sizeContentBottomLeft={16}

						fontTopLeftCornerTitle={"SnapFontBold"}
						fontTopLeftCornerContent={"SnapFontLight"}
						contentTopLeftCornerTitle={this.state.pseudoTwitter}
						contentTopLeftCornerText={this.state.nameTwitter}
						colorTopLeftCornerText={"white"}
						colorTopLeftCornerTitle={"white"}
						sizeTitleTopLeftCorner={32}
						sizeContentTopLeftCorner={16}

						headerRightCorner={'http://univ-cotedazur.fr/contenus-riches/images/logos/logo-twitter-blanc/image'}
						formatPictureTopRightCorner={'square'}

						backgroundColorCard={"#38A1F3"}
					/>
				</View>
				<Button rounded
				        onPress={() => this.props.screenShot(this.twitterView)}
				        title={"Screenshot Twitter view"}
				        style={{flex: 1,
					        marginBottom: 50,

					        shadowColor: 'rgba(0,0,0, .4)', // IOS
					        shadowOffset: { height: 1, width: 1 }, // IOS
					        shadowOpacity: 1, // IOS
					        shadowRadius: 1, //IOS
					        marginLeft: 10,
					        marginRight: 10,
					        elevation: 2,
					        backgroundColor: "#38A1F3",

				        }}
				>
					<Text style={{
						fontFamily: 'Roboto',
						color: 'white',
						fontSize: 16,
						fontWeight: '500',
					}}>Screenshot</Text>
				</Button>
			</View> :
			<Container style={styles.container}>

				<GenericRoundedCard
					fontBottomRightTitle={"SnapFont"}
					fontBottomRightContent={"SnapFontLight"}
					contentBottomRightTitle={"FOLLOWERS"}
					contentBottomRightText={"XXXX"}
					sizeTitleBottomRight={16}
					sizeContentBottomRight={16}
					colorBottomRightTitle={"white"}
					colorBottomRightText={"white"}

					fontBottomLeftTitle={"SnapFont"}
					fontBottomLeftContent={"SnapFontLight"}
					contentBottomLeftTitle={"FOLLOWING"}
					contentBottomLeftText={"XXXX"}
					colorBottomLeftTitle={"white"}
					colorBottomLeftText={"white"}
					sizeTitleBottomLeft={16}
					sizeContentBottomLeft={16}

					fontTopLeftCornerTitle={"SnapFontBold"}
					contentTopLeftCornerTitle={"XXXXX"}
					colorTopLeftCornerTitle={"white"}
					sizeTitleTopLeftCorner={32}

					headerRightCorner={'http://univ-cotedazur.fr/contenus-riches/images/logos/logo-twitter-blanc/image'}
					formatPictureTopRightCorner={'square'}

					backgroundColorCard={"#38A1F3"}
				/>
				<TWLoginButton
					style={{height: 50, backgroundColor: '#38A1F3', paddingBottom: 10, paddingTop: 10,
						marginBottom: 50,  borderRadius: 50, flex: 0, elevation:2, marginLeft: 10, marginRight: 10, }}
					type="TouchableOpacity"
					onPress={this.onPressTwitter}
					onGetAccessToken={this.onGetAccessTokenTwitter}
					onSuccess={this.onSuccessTwitter}
					onClose={this.onCloseTwitter}
					onError={this.onErrorTwitter}
				>
					<Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'Roboto',
						fontSize: 16,
						fontWeight: '500', }}>Log in with Twitter</Text>

				</TWLoginButton>
			</Container>;


		return(
			<Container>
				{twitterCard}
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
	}
});