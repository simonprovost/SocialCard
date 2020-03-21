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
import { showMessage} from "react-native-flash-message";
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

	_howToSolvedItButton = () => {
		Alert.alert('Social Card APP INFO', 'Open app.json to configure the data for api', [
			{text: 'OK', onPress: () => BackHandler.exitApp()}
		])
	}

	async componentDidMount(title, message) {
		const {
			facebook,
			instagram,
			linkedin,
			twitter
		} = dataConstants.expo.extra;

		if (
			facebook.appId === undefined ||	instagram.clientID === undefined ||	instagram.redirectURI === undefined ||
			linkedin.clientID === undefined || linkedin.clientSecret === undefined || linkedin.redirectURI === undefined ||
			twitter.consumerKey === undefined || twitter.consumerKeySecret === undefined || facebook.appId === "" ||
			instagram.clientID === "" || instagram.redirectURI === "" || linkedin.clientID === "" ||
			linkedin.clientSecret === "" || linkedin.redirectURI === "" || twitter.consumerKey === "" ||
			twitter.consumerKeySecret === ""
		) {
			Alert.alert( 'Social card APP INFO', 'Data for API was not found (ios you can exit by hand the app)',
				[ {text: 'How to solved it  ?', onPress: this._howToSolvedItButton}, {text: 'OK', onPress: () => BackHandler.exitApp()}, ],
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
				description: "Screenshot wasn t taken ! ",
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


		let titleHeader= <Text h3 style={styles.headerTitle}>{"Social Card"}</Text>;

		return (
			<View style={styles.container}>
				<Header
					barStyle="light-content"
					centerComponent={titleHeader}
					containerStyle={{ ...styles.header, backgroundColor: this.state.colorHeader, }}
				/>
				<Swiper
					showsPagination={true} index={0} dot={<View style={styles.dotSwiper} />}
					activeDot={<View style={styles.activeDotSwiper} />}
					onMomentumScrollEnd ={this._onMomentumScrollEnd}
				>
					<FacebookScreen
						screenShot={this.screenShot} find_dimensions={this.find_dimensions} changeColorHeader={this.changeColorHeader}
					/>
					<TwitterScreen
						screenShot={this.screenShot} find_dimensions={this.find_dimensions} changeColorHeader={this.changeColorHeader}
					/>
					<InstagramScreen
						screenShot={this.screenShot} find_dimensions={this.find_dimensions} changeColorHeader={this.changeColorHeader}
					/>
					<LinkedinScreen
						screenShot={this.screenShot} find_dimensions={this.find_dimensions} changeColorHeader={this.changeColorHeader}
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
	headerTitle: {
		color: 'white',
	},
	header: {
		justifyContent: 'space-around',
		height: "10%",
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
	},
	dotSwiper: {
		backgroundColor:'rgba(0,0,0,.1)',
		width: 5,
		height: 5,
		borderRadius: 4,
		marginLeft: '2%',
		marginRight: '2%',
		marginTop: '2%',
		marginBottom: '2%',
	},
	activeDotSwiper: {
		backgroundColor: 'gray',
		width: 8,
		height: 8,
		borderRadius: 4,
		marginLeft: '2%',
		marginRight: '2%',
		marginTop: '2%',
		marginBottom: '2%',
	}
});


