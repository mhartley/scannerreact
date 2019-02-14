import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


export default class HistoryScreen extends React.Component {
	render() {
		return (
				<Card>
					<Card.Title title={props.memberName} subtitle={props.timeString}/>
					<Card.Content>
						<Title>{}</Title>
						<Paragraph>Card content</Paragraph>
					</Card.Content>
				</Card>
		);
	}
}


