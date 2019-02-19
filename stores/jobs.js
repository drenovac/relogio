import axios from 'axios';
import { observable, action } from 'mobx';
import moment from 'moment';

class JobsStore {
    @observable jobs = [];
    constructor() {
        this.mockData();
    }

    mockData() {
        const today = moment(),
            yesterday = moment().subtract(1, 'days');

        today.set({
            h: 14,
            m: 0
        });

        yesterday.set({
            h: 14,
            m: 0
        });

        this.jobs = [
            {
                name: 'ACME Corporation Job',
                description: 'Job description here.',
                done: false,
                start: today.toDate(),
                end: today.add(1, 'hours').toDate()
            },
            {
                name: 'ACME Corporation Job',
                description: 'Job description here.',
                done: true,
                start: yesterday.toDate(),
                end: yesterday.add(1, 'hours').toDate()
            }
        ]
    }

    jobsByDay() {
        const data = [];
        const days = [];
        const jobs = this.jobs;

        for (let i = 0; i < jobs.length; i++) {
            let job = jobs[i];
            let day = moment(job.start).startOf('day').toDate();

            if (days.indexOf(day) < 0) {
                days.push(day);
                data.push({
                    date: day,
                    jobs: []
                });
            }

            let dayData = data.find(dd => dd.date === day);

            dayData.jobs.push(job);
        }

        return data;
    }
}

export default new JobsStore();