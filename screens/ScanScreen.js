import React from "react";
import {RNCamera} from "react-native-camera";
import {Slider, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, NativeModules} from "react-native";
import DeviceInfo from "react-native-device-info";

import DefaultNavigationOptions from '../navigation/defaultNavigationOptions'

import Geolocater from 'react-native-geolocation-service';



const Scanner = NativeModules.Scanner;

const getCurrentPosition = ()	=>
{
	Geolocater.getCurrentPosition(
			(position) => {
				alert(JSON.stringify(position));
				
			},
			(error) => {
				// See error code charts below.
				console.log(error.code, error.message);
				alert(JSON.stringify(error))
			},
			{enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
	);
}

async function requestMultiplePermissions() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
    		PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]
      
      // {
      //   title: 'This App needs access to your location and camera to work',
      //   message:
      //     'We need your location to ensure that we can match a scan to a call.',
      //   buttonNeutral: 'Ask Me Later',
      //   buttonNegative: 'Cancel',
      //   buttonPositive: 'OK',
      // },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}



const flashModeOrder = {
	off: 'on',
	on: 'auto',
	auto: 'torch',
	torch: 'off',
};

const wbOrder = {
	auto: 'sunny',
	sunny: 'cloudy',
	cloudy: 'shadow',
	shadow: 'fluorescent',
	fluorescent: 'incandescent',
	incandescent: 'auto',
};
import Geolocation from 'react-native-geolocation-service';
export default class ScanScreen extends React.Component {
	
	static navigationOptions = {
			title: "Scan",
			...DefaultNavigationOptions
	};
	
	
	state = {
		flash: 'off',
		zoom: 0,
		autoFocus: 'on',
		depth: 0,
		type: 'back',
		whiteBalance: 'auto',
		ratio: '16:9',
		recordOptions: {
			mute: false,
			maxDuration: 5,
			quality: RNCamera.Constants.VideoQuality['288p'],
		},
		isRecording: false,
	};
	

	
	toggleFacing() {
		this.setState({
			type: this.state.type === 'back' ? 'front' : 'back',
		});
	}
	
	toggleFlash() {
		this.setState({
			flash: flashModeOrder[this.state.flash],
		});
	}
	
	toggleWB() {
		this.setState({
			whiteBalance: wbOrder[this.state.whiteBalance],
		});
	}
	
	toggleFocus() {
		this.setState({
			autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
		});
	}
	
	zoomOut() {
		this.setState({
			zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
		});
	}
	
	zoomIn() {
		this.setState({
			zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
		});
	}
	
	setFocusDepth(depth) {
		this.setState({
			depth,
		});
	}
	
	takePicture = async function () {
		if (this.camera) {
			const data = await this.camera.takePictureAsync();
			console.warn('takePicture ', data);
		}
	};
	
	takeVideo = async function () {
		if (this.camera) {
			try {
				const promise = this.camera.recordAsync(this.state.recordOptions);
				
				if (promise) {
					this.setState({isRecording: true});
					const data = await promise;
					this.setState({isRecording: false});
					console.warn('takeVideo', data);
				}
			} catch (e) {
				console.error(e);
			}
		}
	};
	
	
	hasNeededPermissions = (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
														&& PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA))
	
	componentDidMount() {
		if (!this.hasNeededPermissions) {
			requestMultiplePermissions();
		} else {

		}
	}
	
	renderCamera() {
		return (
				<RNCamera
						ref={ref => {
							this.camera = ref;
						}}
						style={{
							flex: 1,
						}}
						type={this.state.type}
						flashMode={this.state.flash}
						autoFocus={this.state.autoFocus}
						zoom={this.state.zoom}
						whiteBalance={this.state.whiteBalance}
						ratio={this.state.ratio}
						focusDepth={this.state.depth}
						defaultOnFocusComponent={true}
						permissionDialogTitle={'Permission to use camera'}
						permissionDialogMessage={'We need your permission to use your camera phone'}
				>
					<View
							style={{
								flex: 0.5,
								backgroundColor: 'transparent',
								flexDirection: 'row',
								justifyContent: 'space-around',
							}}
					>
						<TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
							<Text style={styles.flipText}> FLIP </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.flipButton} onPress={()=> Scanner.openIntent(()=> alert('success'), ()=> alert('error'))}>
							<Text style={styles.flipText}> CUSTOM SCAN </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.flipButton} onPress={() => alert(DeviceInfo.getUniqueID())}>
							<Text style={styles.flipText}>  ID </Text>
						</TouchableOpacity>
					</View>
					<View
							style={{
								flex: 0.4,
								backgroundColor: 'transparent',
								flexDirection: 'row',
								alignSelf: 'flex-end',
							}}
					>
						<Slider
								style={{width: 150, marginTop: 15, alignSelf: 'flex-end'}}
								onValueChange={this.setFocusDepth.bind(this)}
								step={0.1}
								disabled={this.state.autoFocus === 'on'}
						/>
					</View>
					<View
							style={{
								flex: 0.1,
								backgroundColor: 'transparent',
								flexDirection: 'row',
								alignSelf: 'flex-end',
							}}
					>
						<TouchableOpacity
								style={[
									styles.flipButton,
									{
										flex: 0.3,
										alignSelf: 'flex-end',
										backgroundColor: this.state.isRecording ? 'white' : 'darkred',
									},
								]}
								onPress={this.state.isRecording ? () => {
								} : this.takeVideo.bind(this)}
						>
							{this.state.isRecording ? (
									<Text style={styles.flipText}> ☕ </Text>
							) : (
									<Text style={styles.flipText}> REC </Text>
							)}
						</TouchableOpacity>
					</View>
					{this.state.zoom !== 0 && (
							<Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
					)}
					<View
							style={{
								flex: 0.1,
								backgroundColor: 'transparent',
								flexDirection: 'row',
								alignSelf: 'flex-end',
							}}
					>
						<TouchableOpacity
								style={[styles.flipButton, {flex: 0.1, alignSelf: 'flex-end'}]}
								onPress={this.zoomIn.bind(this)}
						>
							<Text style={styles.flipText}> + </Text>
						</TouchableOpacity>
						<TouchableOpacity
								style={[styles.flipButton, {flex: 0.1, alignSelf: 'flex-end'}]}
								onPress={this.zoomOut.bind(this)}
						>
							<Text style={styles.flipText}> - </Text>
						</TouchableOpacity>
						<TouchableOpacity
								style={[styles.flipButton, {flex: 0.25, alignSelf: 'flex-end'}]}
								onPress={this.toggleFocus.bind(this)}
						>
							<Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
						</TouchableOpacity>
						<TouchableOpacity
								style={[styles.flipButton, styles.picButton, {flex: 0.3, alignSelf: 'flex-end'}]}
								onPress={this.takePicture.bind(this)}
						>
							<Text style={styles.flipText}> SNAP </Text>
						</TouchableOpacity>
					</View>
				</RNCamera>
		);
	}
	
	render() {
		return <View style={styles.container}>{this.renderCamera()}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		backgroundColor: '#000',
	},
	flipButton: {
		flex: 0.3,
		height: 40,
		marginHorizontal: 2,
		marginBottom: 10,
		marginTop: 20,
		borderRadius: 8,
		borderColor: 'white',
		borderWidth: 1,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	flipText: {
		color: 'white',
		fontSize: 15,
	},
	zoomText: {
		position: 'absolute',
		bottom: 70,
		zIndex: 2,
		left: 2,
	},
	picButton: {
		backgroundColor: 'darkseagreen',
	},
});
