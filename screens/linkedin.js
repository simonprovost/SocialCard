import React, {Component} from "react";
import {Button, Container, Text, View} from "native-base";
import {GenericRoundedCard} from "../components/genericRoundedCard";
import {StyleSheet} from "react-native";
import LinkedInModal from "react-native-linkedin";
import {showMessage} from "react-native-flash-message";

export class LinkedinScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			linkedinConnected: false,
			socialNetworkConnected: false,

		};
	}

	async getUserInfoIn({ access_token }) {
		this.setState({ refreshing: true });
		const baseApi = 'https://api.linkedin.com/v2/me/';
		const qs = { format: 'json' };

		const response = await fetch(baseApi + '?oauth2_access_token=' + access_token, {
			method: 'GET',
		});
		const payloadUserName = await response.json();

		const responseEmail = await fetch('https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))&oauth2_access_token=' + access_token, {
			method: 'GET',
		});
		const payloadEmail = await responseEmail.json();

		const responPicture = await fetch('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))&oauth2_access_token=' + access_token, {
			method: 'GET',
		});
		const payloadPicture = await responPicture.json();

		this.setState({ ...payloadUserName, emailLinkedin: payloadEmail.elements[0]["handle~"].emailAddress, urlPictureProfileLinkedin: payloadPicture.profilePicture["displayImage~"].elements[0].identifiers[0].identifier, refreshing: false, linkedinConnected: true })
	}

	render() {
		let inCard =
			this.state.linkedinConnected ?
				<View style={{flex: 1,}}>
					<View style={styles.container}
					      collapsable={false}
					      ref={view => {
						      this.linkedinView = view}}
					      onLayout={(event) => { this.props.find_dimensions(event.nativeEvent.layout) }}
					>
						<GenericRoundedCard
							bottomRightCorner={this.state.urlPictureProfileLinkedin}
							formatPictureBottomRight={'circle'}

							fontBottomLeftTitle={"SnapFont"}
							fontBottomLeftContent={"SnapFontLight"}
							contentBottomLeftTitle={"EMAIL"}
							contentBottomLeftText={this.state.emailLinkedin}
							colorBottomLeftTitle={"white"}
							colorBottomLeftText={"white"}
							sizeTitleBottomLeft={16}
							sizeContentBottomLeft={16}

							fontTopLeftCornerTitle={"SnapFontBold"}
							fontTopLeftCornerContent={"SnapFontLight"}
							contentTopLeftCornerTitle={this.state.localizedFirstName + " " + this.state.localizedLastName}
							colorTopLeftCornerTitle={"white"}
							sizeTitleTopLeftCorner={32}

							headerRightCorner={'http://bullesdetalents.fr/site/wp-content/grand-media/image/picto_linkedin_blanc.png'}
							formatPictureTopRightCorner={'square'}

							bgCard={"#0077b5"}
						/>
					</View>
					<Button rounded
					        onPress={() => this.props.screenShot(this.linkedinView)}
					        title={"Screenshot Linkedin view"}
					        style={{flex: 1,
						        marginBottom: 50,

						        shadowColor: 'rgba(0,0,0, .4)', // IOS
						        shadowOffset: { height: 1, width: 1 }, // IOS
						        shadowOpacity: 1, // IOS
						        shadowRadius: 1, //IOS
						        marginLeft: 10,
						        marginRight: 10,
						        elevation: 2,
						        backgroundColor: "#0077b5",
					        }}
					>
						<Text style={{
							fontFamily: 'Roboto',
							color: 'white',
							fontSize: 16,
							fontWeight: '500',
						}}>Screenshot</Text>
					</Button>
				</View>
				:
				<Container>

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

						headerRightCorner={'http://bullesdetalents.fr/site/wp-content/grand-media/image/picto_linkedin_blanc.png'}
						formatPictureTopRightCorner={'square'}

						bgCard={"#0077b5"}
					/>
					<LinkedInModal
						ref={ref => {
							this.modal = ref
						}}
						clientID={"86vmluha5e73ou"}
						clientSecret={"Q6p5Ft46YLlg2u6F"}
						redirectUri="https://www.google.fr/"
						onSuccess={data => {
							this.getUserInfoIn(data);
							showMessage({
								message: "Linkedin Login Info",
								description: "User Connected.",
								type: "success",
								icon: "success",
							});
						}}
						onClose={() => {
							showMessage({
								message: "Linkedin Login Info",
								description: "User cancelled Linkedin connexion method.",
								type: "info",
								icon: "info",
							});

						}}
						onError={() => {
							showMessage({
								message: "Linkedin Login Info",
								description: "Linkedin connexion was failed.",
								type: "danger",
								icon: "danger",
							});

						}}
						permissions={['r_liteprofile', 'r_emailaddress']}
						linkText={''}
					/>
					<Button rounded
					        onPress={() => {
						        this.modal.open()
					        }}
					        title={"Log in with In button"}
					        style={{flex: 1,
						        backgroundColor: '#0077b5',
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
							color: 'white',
							fontSize: 16,
							fontWeight: '500',
						}}>Log in With Linkedin</Text>
					</Button>
				</Container>;

		return(
			<Container>
				{inCard}
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