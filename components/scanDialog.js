import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';


/*

The parseDLData function returns it data in the following shape. All fields are returned as strings.
	{
			first_name: null,
			last_name: null,
			age: null,
			zipcode: null,
			sex: null,
		}

 */

export default class ScanDialog extends React.Component {


  // _hideDialog = () => this.setState({ visible: false });
  render() {
    return (
			  <Portal>
			    <Dialog
			       visible={this.props.visible}
			       onDismiss={this.props.onClose}>
			      <Dialog.Title>{this.props.first_name} {this.props.last_name}</Dialog.Title>
				    <Dialog.Content style={styles.subline}><Paragraph>{this.props.sex} {this.props.age}</Paragraph></Dialog.Content>
				    <Dialog.Content><Paragraph>Zipcode: {this.props.zipcode}</Paragraph></Dialog.Content>
			      <Dialog.Content>
			        <Paragraph>Is this the member on the policy?</Paragraph>
			      </Dialog.Content>
			      <Dialog.Actions>
			        <Button onPress={this.props.onClose}>Yes</Button>
			        <Button onPress={this.props.onClose}>No</Button>
			      </Dialog.Actions>
			    </Dialog>
			  </Portal>
    );
  }
}

const styles = {
	subline: {
		fontWeight: "bold",
	},
	
}
