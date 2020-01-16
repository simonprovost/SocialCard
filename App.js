import React, {Component} from "react";
import {View, Root} from "native-base";
import {AppLoading} from "expo";
import {captureRef as takeSnapshotAsync} from 'react-native-view-shot'
import * as Font from 'expo-font';
import {StatusBar,
	StyleSheet,
	Alert,
	CameraRoll,
	BackHandler
} from 'react-native';
import Swiper from 'react-native-swiper'
import {FacebookScreen} from "./screens/facebook";
import {TwitterScreen} from "./screens/twitter";
import {InstagramScreen} from "./screens/instagram";
import {LinkedinScreen} from "./screens/linkedin";
import * as Permissions from 'expo-permissions';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import {Header, Text} from "react-native-elements"
import * as dataConstants from './app.json';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			height: 0,
			width: 0,
			colorHeader: 'white',
		};
	}

	async componentDidMount(title, message) {
		if (
			dataConstants.expo.extra.facebook.appId === undefined ||
			dataConstants.expo.extra.instagram.clientID === undefined ||
			dataConstants.expo.extra.instagram.redirectURI === undefined ||
			dataConstants.expo.extra.linkedin.clientID === undefined ||
			dataConstants.expo.extra.linkedin.clientSecret === undefined ||
			dataConstants.expo.extra.linkedin.redirectURI === undefined ||
			dataConstants.expo.extra.twitter.consumerKey === undefined ||
			dataConstants.expo.extra.twitter.consumerKeySecret === undefined ||
			dataConstants.expo.extra.facebook.appId === "" ||
			dataConstants.expo.extra.instagram.clientID === "" ||
			dataConstants.expo.extra.instagram.redirectURI === "" ||
			dataConstants.expo.extra.linkedin.clientID === "" ||
			dataConstants.expo.extra.linkedin.clientSecret === "" ||
			dataConstants.expo.extra.linkedin.redirectURI === "" ||
			dataConstants.expo.extra.twitter.consumerKey === "" ||
			dataConstants.expo.extra.twitter.consumerKeySecret === ""
		) {
			Alert.alert(
				'Social card APP INFO',
				'Data for API was not found (ios you can exit by hand the app)',
				[
					{text: 'How to solved it  ?', onPress: () => {
							Alert.alert('Social Card APP INFO', 'Open app.json to configure the data for api', [
								{text: 'OK', onPress: () => BackHandler.exitApp()}
							])
						}},
					{text: 'OK', onPress: () => BackHandler.exitApp()},
				],
				{cancelable: false},
			);
		}

		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			SnapFont: require("./assets/fonts/SF-UI-Text-Regular.otf"),
			SnapFontLight: require("./assets/fonts/SF-UI-Display-Ultralight.otf"),
			SnapFontBold: require("./assets/fonts/SF-UI-Display-Bold.otf")
		});
		this.setState({
			loading: false,
			colorHeader: "#3b5998",
		});
	}

	static async requestStoragePermission() {
		const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		return status === 'granted';
	}

	screenShot = async (viewRef) => {
		const result = await takeSnapshotAsync(viewRef,{
			result: 'tmpfile',
			height: this.state.height,
			width: this.state.width,
			quality: 1,
			format: 'png',
		});
		if (await App.requestStoragePermission() === true) {
			await CameraRoll.saveToCameraRoll(result, 'photo');
			showMessage({
				message: "Screnshot Info",
				description: "Screenshot saved successfully !",
				type: "success",
				icon: "success",
			});
		} else {
			showMessage({
				message: "Screnshot Info",
				description: "Screenshot wasn t take ! ",
				type: "danger",
				icon: "danger",
			});
		}

	};

	find_dimensions = (layout) => {
		const {x, y, width, height} = layout;
		this.setState({width: width, height: height});
	};

	changeColorHeader = (color) => {
		if (color === this.state.colorHeader)
			return;
		this.setState({colorHeader: color});
	};

	_onMomentumScrollEnd = (e, state, context) => {
		switch (state.index) {
			case 0: this.setState({colorHeader: "#3b5998"});
				break;
			case 1: this.setState({colorHeader: "#38A1F3"});
				break;
			case 2: this.setState({colorHeader: "#5851DB"});
				break;
			case 3: this.setState({colorHeader: "#0077b5"});
				break;
			default:
				break;
		}
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

		return (
			<View style={styles.container}>
				<Header
					statusBarProps={{ barStyle: 'light-content' }}
					barStyle="light-content"
					centerComponent={<Text h3 style={{color: 'white', }}>{"Social Card"}</Text>}
					containerStyle={{
						backgroundColor: this.state.colorHeader,
						justifyContent: 'space-around',
						height: "10%",
						borderBottomRightRadius: 60,
						borderBottomLeftRadius: 60,
					}}get
				/>
				<Swiper
					showsPagination={true}
					index={0}
					dot={<View style={{backgroundColor:'rgba(0,0,0,.1)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
					activeDot={<View style={{backgroundColor: 'gray', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
					onMomentumScrollEnd ={this._onMomentumScrollEnd}
				>
					<FacebookScreen
						screenShot={this.screenShot}
						find_dimensions={this.find_dimensions}
						changeColorHeader={this.changeColorHeader}
					/>
					<TwitterScreen
						screenShot={this.screenShot}
						find_dimensions={this.find_dimensions}
						changeColorHeader={this.changeColorHeader}
					/>
					<InstagramScreen
						screenShot={this.screenShot}
						find_dimensions={this.find_dimensions}
						changeColorHeader={this.changeColorHeader}
					/>
					<LinkedinScreen
						screenShot={this.screenShot}
						find_dimensions={this.find_dimensions}
						changeColorHeader={this.changeColorHeader}
					/>
				</Swiper>
				<FlashMessage position="top" />

			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});


