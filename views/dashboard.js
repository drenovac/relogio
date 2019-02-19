import React from 'react';
import { observer, inject } from 'mobx-react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Job from './job';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#e86667'
    },
    headerTitle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutButton: {
        backgroundColor: '#e86667',
    },
    jobDate: {
        fontWeight: 'bold',
        fontSize: 14
    },
    jobContainer: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row'
    }
});

@inject('authStore')
@inject('jobsStore')
@observer
export default class Dashboard extends React.Component {
    state = {
        editing: null
    }

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleViewTask = this.handleViewTask.bind(this);
    }

    handleLogout() {
        const { authStore, jobsStore } = this.props;

        authStore.logout();
        jobsStore.mockData();
    }

    handleViewTask(task) {
        this.setState({ editing: task });
    }

    render() {
        const { authStore, jobsStore } = this.props;
        const { editing } = this.state;

        if (editing)
            return <Job job={editing} goBack={() => this.setState({ editing: null })} />;


        const jobsByDay = jobsStore.jobsByDay();
        const jobs = [];

        if (jobsByDay.length < 1) {
            jobs.push(<Text>No tasks.</Text>)
        }

        for (let jobDay of jobsByDay) {
            jobs.push(<Text
                style={styles.jobDate}
                key={`day-${jobDay.date.getTime()}`}>
                {moment(jobDay.date).format('LL')}
            </Text>)

            for (let job of jobDay.jobs) {
                jobs.push(<View
                    style={styles.jobContainer}
                    key={`job-${jobDay.date.getTime()}`}>
                    <View style={{ flex: 1 }}>
                        <Text>{job.name}</Text>
                        <Text>From: {moment(job.start).format('LT')} to: {moment(job.end).format('LT')}</Text>
                    </View>
                    <Button
                        icon={<Icon
                            name={job.done ? 'check' : 'clock-o'}
                            size={15}
                            color="white"

                        />}
                        onPress={() => this.handleViewTask(job)}
                        disabled={job.done} />
                </View>)
            }
        }

        return <View>
            <Header
                containerStyle={styles.header}
                placement="left"
                centerComponent={<Text style={styles.headerTitle} adjustsFontSizeToFit={true}>Relogio</Text>}
                placement='center'
            />
            <Card title={`Hello ${authStore.user.name}`}>
                <Button
                    title='Logout'
                    icon={<Icon
                        name="sign-out"
                        size={15}
                        color="white"
                    />}
                    buttonStyle={styles.logoutButton}
                    onPress={this.handleLogout}
                />
            </Card>
            <Card title={`Your tasks`}>
                {jobs}
            </Card>
        </View>
    }
}