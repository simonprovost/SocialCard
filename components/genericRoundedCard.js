import React, {Component } from "react";
import {Card, CardItem, Text, Body, Left, Right, View, Root, Thumbnail} from "native-base";
import {AppLoading} from "expo";
import {StyleSheet} from "react-native";

export class GenericRoundedCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	async componentDidMount() {
		this.setState({
			loading: false,
			backgroundColorCard: this.props.bgCard,

			bottomLeftCorner: this.props.bottomLeftCorner,
			formatPictureBottomLeft: this.props.formatPictureBottomLeft,
			fontBottomLeftTitle: this.props.fontBottomLeftTitle,
			fontBottomLeftContent: this.props.fontBottomLeftContent,
			contentBottomLeftTitle: this.props.contentBottomLeftTitle,
			contentBottomLeftText: this.props.contentBottomLeftText,
			sizeTitleBottomLeft: this.props.sizeTitleBottomLeft,
			sizeContentBottomLeft: this.props.sizeContentBottomLeft,
			colorBottomLeftTitle: this.props.colorBottomLeftTitle,
			colorBottomLeftText: this.props.colorBottomLeftText,

			bottomRightCorner: this.props.bottomRightCorner,
			formatPictureBottomRight: this.props.formatPictureBottomRight,
			fontBottomRightTitle: this.props.fontBottomRightTitle,
			fontBottomRightContent: this.props.fontBottomRightContent,
			contentBottomRightTitle: this.props.contentBottomRightTitle,
			contentBottomRightText: this.props.contentBottomRightText,
			sizeTitleBottomRight: this.props.sizeTitleBottomRight,
			sizeContentBottomRight: this.props.sizeContentBottomRight,
			colorBottomRightTitle: this.props.colorBottomRightTitle,
			colorBottomRightText: this.props.colorBottomRightText,

			headerLeftCorner: this.props.headerLeftCorner,
			formatPictureTopLeftCorner: this.props.formatPictureTopLeftCorner,
			fontTopLeftCornerTitle: this.props.fontTopLeftCornerTitle,
			fontTopLeftCornerContent: this.props.fontTopLeftCornerContent,
			contentTopLeftCornerTitle: this.props.contentTopLeftCornerTitle,
			contentTopLeftCornerText: this.props.contentTopLeftCornerText,
			sizeTitleTopLeftCorner: this.props.sizeTitleTopLeftCorner,
			sizeContentTopLeftCorner: this.props.sizeContentTopLeftCorner,
			colorTopLeftCornerTitle: this.props.colorTopLeftCornerTitle,
			colorTopLeftCornerText: this.props.colorTopLeftCornerText,

			headerRightCorner: this.props.headerRightCorner,
			formatPictureTopRightCorner: this.props.formatPictureTopRightCorner,
			fontTopRightCornerTitle: this.props.fontTopRightCornerTitle,
			fontTopRightCornerContent: this.props.fontTopRightCornerContent,
			contentTopRightCornerTitle: this.props.contentTopRightCornerTitle,
			contentTopRightCornerText: this.props.contentTopRightCornerText,
			sizeTitleTopRightCorner: this.props.sizeTitleTopRightCorner,
			sizeContentTopRightCorner: this.props.sizeContentTopRightCorner,
			colorTopRightCornerTitle: this.props.colorTopRightCornerTitle,
			colorTopRightCornerText: this.props.colorTopRightCornerText,
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<Root>
					<AppLoading />
				</Root>
			);
		}

		if (this.state.backgroundColorCard === undefined) {
			return (
				<View>
					<Text>ERROR Background not found</Text>
				</View>
			)
		}

		let bottomRightCornerContent =
			this.state.bottomRightCorner !== undefined && this.state.formatPictureBottomRight === 'square'
				?
				<Right style={{flex: 1, flexDirection: "column"}}>
					<Thumbnail square source={{uri: this.state.bottomRightCorner}} />
				</Right>
				:
				this.state.bottomRightCorner !== undefined && this.state.formatPictureBottomRight !== 'square'
					?
					<Right style={{flex: 1, flexDirection: "column"}}>
						<Thumbnail source={{uri: this.state.bottomRightCorner}} />
					</Right>
					:
					this.state.contentBottomRightText !== undefined
						?
						<Right style={{flex: 1, flexDirection: "column"}}>
							<Text style={{fontFamily: this.state.fontBottomRightTitle, color: this.state.colorBottomRightTitle, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.contentBottomRightTitle}</Text>
							<Text note style={{fontFamily: this.state.fontBottomRightContent, color: this.state.colorBottomRightText, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.contentBottomRightText}</Text>
						</Right>
						:
						<Right style={{flex: 1, flexDirection: "column"}}>
							<Text style={{fontFamily: this.state.fontBottomRightTitle, color: this.state.colorBottomRightTitle, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.contentBottomRightTitle}</Text>
							<Text note style={{fontFamily: this.state.fontBottomRightContent, color: this.state.colorBottomRightText, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.contentBottomRightText}</Text>
						</Right>;

		let bottomLeftCornerContent =
			this.state.bottomLeftCorner !== undefined && this.state.formatPictureBottomLeft === 'square'
				?
				<Left style={{flex: 0, flexDirection: "column"}}>
					<Thumbnail square source={{uri: this.state.bottomLeftCorner}} />
				</Left>
				:
				this.state.bottomLeftCorner !== undefined && this.state.formatPictureBottomLeft !== 'square'
					?
					<Left style={{flex: 0, flexDirection: "column"}}>
						<Thumbnail source={{uri: this.state.bottomLeftCorner}} />
					</Left>
					:
					this.state.contentBottomLeftText !== undefined
						?
						<Left style={{flex: 0, flexDirection: "column"}}>
							<Text style={{fontFamily: this.state.fontBottomLeftTitle, color: this.state.colorBottomLeftTitle, textAlign: 'left', alignSelf: 'stretch'}}>{this.state.contentBottomLeftTitle}</Text>
							<Text note style={{fontFamily: this.state.fontBottomLeftContent, color: this.state.colorBottomLeftText, textAlign: 'left', alignSelf: 'stretch'}}>{this.state.contentBottomLeftText}</Text>
						</Left>
						:
						<Left style={{flex: 0, flexDirection: "column"}}>
							<Text style={{fontFamily: this.state.fontBottomLeftTitle, color: this.state.colorBottomLeftTitle, textAlign: 'left', alignSelf: 'stretch'}}>{this.state.contentBottomLeftTitle}</Text>
						</Left>;

		let headerLeftContent =
			this.state.headerLeftCorner !== undefined && this.state.formatPictureTopLeftCorner === 'square'
				?
				<Left style={{flex: 0, flexDirection: "column"}}>
					<Thumbnail square source={{uri: this.state.headerLeftCorner}} />
				</Left>
				:
				this.state.headerLeftCorner !== undefined && this.state.formatPictureTopLeftCorner !== 'square'
					?
					<Left style={{flex: 0, flexDirection: "column"}}>
						<Thumbnail source={{uri: this.state.headerLeftCorner}} />
					</Left>
					:
					this.state.contentTopLeftCornerText !== undefined
						?
						<Left style={{flex: 0, flexDirection: "column"}}>
							<Text style={{fontSize: this.state.sizeTitleTopLeftCorner, fontFamily: this.state.fontTopLeftCornerTitle, color: this.state.colorTopLeftCornerTitle, textAlign: 'left', alignSelf: 'stretch'}}>{this.state.contentTopLeftCornerTitle}</Text>
							<Text note style={{fontSize: this.state.sizeContentTopLeftCorner, fontFamily: this.state.fontTopLeftCornerContent, color: this.state.colorTopLeftCornerText, textAlign: 'left', alignSelf: 'stretch'}}>{this.state.contentTopLeftCornerText}</Text>
						</Left>
						:
						<Left style={{flex: 0, flexDirection: "column"}}>
							<Text style={{fontSize: this.state.sizeTitleTopLeftCorner, fontFamily: this.state.fontTopLeftCornerTitle, color: this.state.colorTopLeftCornerTitle, textAlign: 'left', alignSelf: 'stretch'}}>{this.state.contentTopLeftCornerTitle}</Text>
						</Left> ;

		let headerRightContent =
			this.state.headerRightCorner !== undefined && this.state.formatPictureTopRightCorner === 'square'
				?
				<Right style={{flex: 1, flexDirection: "column"}}>
					<Thumbnail square source={{uri: this.state.headerRightCorner}} />
				</Right>
				:
				this.state.headerRightCorner !== undefined && this.state.formatPictureTopRightCorner !== 'square'
					?
					<Right style={{flex: 1, flexDirection: "column"}}>
						<Thumbnail source={{uri: this.state.headerRightCorner}} />
					</Right>
					:
					this.state.contentTopRightCornerText !== undefined
						?
						<Right style={{flex: 1, flexDirection: "column"}}>
							<Text style={{fontFamily: this.state.fontTopRightCornerTitle, color: this.state.colorTopRightCornerTitle, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.contentTopRightCornerTitle}</Text>
							<Text note style={{fontFamily: this.state.fontTopRightCornerContent, color: this.state.colorTopRightCornerText, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.contentTopRightCornerText}</Text>
						</Right>
						:
						<Right style={{flex: 1, flexDirection: "column"}}>
							<Text style={{fontFamily: this.state.fontTopRightCornerTitle, color: this.state.colorTopRightCornerTitle, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.contentTopRightCornerTitle}</Text>
							<Text note style={{fontFamily: this.state.fontTopRightCornerContent, color: this.state.colorTopRightCornerText, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.contentTopRightCornerText}</Text>
						</Right>;

		let emptySpace =
			<CardItem style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, backgroundColor: this.state.backgroundColorCard }}>
				<Body>
				</Body>
			</CardItem>;

		return (
			<View style={styles.container}>
				<View padder>
					<Card style={{borderRadius: 9}}>
						<CardItem header style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 9, borderTopRightRadius: 9,  backgroundColor: this.state.backgroundColorCard, flexDirection: "row"}}>
							{headerLeftContent}
							{headerRightContent}
						</CardItem>
						{emptySpace}
						{emptySpace}
						{emptySpace}
						{emptySpace}
						<CardItem footer style={{borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: this.state.backgroundColorCard }}>
							{bottomLeftCornerContent}
							{bottomRightCornerContent}
						</CardItem>
					</Card>
				</View>
			</View >
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