import React from 'react';
import { observer, inject } from 'mobx-react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#e86667'
    },
    headerTitle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

@inject('jobsStore')
@observer
export default class Dashboard extends React.Component {
    state = {
        startedWork: null,
        worked: 0
    }

    constructor(props) {
        super(props);

        this.startWork = this.startWork.bind(this);
        this.endWork = this.endWork.bind(this);
    }

    startWork() {
        this.setState({ startedWork: new Date() });
    }

    endWork() {
        const { job } = this.props;
        const { startedWork } = this.state;

        this.setState({ startedWork: new Date() });

        job.done = true;

        let ellapsed = moment(startedWork).diff(moment(), 'minutes');
        alert('Record ' + ellapsed + ' minutes of work');
    }

    render() {
        const { authStore, jobsStore, job, goBack } = this.props;
        const { startedWork } = this.state;
        const options = [];

        if (job.done) {
            options.push(<Text key='empty'>This task was already closed.</Text>);
        } else {
            if (!startedWork) {
                options.push(
                    <Button
                        key='start'
                        title='Start'
                        icon={<Icon
                            name='clock-o'
                            size={15}
                            color="white"

                        />}
                        onPress={() => this.startWork()}
                    />);
            } else {
                options.push(
                    <Button
                        key='end'
                        title={`Stop`}
                        icon={<Icon
                            name='stop'
                            size={15}
                            color="white"

                        />}
                        onPress={() => this.endWork()}
                    />);
            }
        }

        return <View>
            <Header
                containerStyle={styles.header}
                placement="left"
                leftComponent={{ icon: 'chevron-left', onPress: () => goBack() }}
                centerComponent={<Text style={styles.headerTitle} adjustsFontSizeToFit={true}>Relogio</Text>}
                placement='center'
            />
            <Card title={job.name}>
                <Text>{job.description}</Text>
                <Text>From: {moment(job.start).format('LT')}</Text>
                <Text>To: {moment(job.end).format('LT')}</Text>
            </Card>
            <Card title={`Record Work`}>
                {options}
            </Card>
        </View>
    }
}