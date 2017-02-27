'use strict';
import config from 'app/global/config/server';
import axios from 'axios';

import * as API from 'app/api';
import {
    browserHistory
} from 'react-router';

import {
    message,
    notification
} from 'antd';
import Helper from 'app/global/helper';

export default {
    training: {
        loadAll: (callback, reviews_callback) => {
            return axios.get(API.url('training'))
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while fetching data from server, please try again after some time.', 2);
                    } else {
                        callback(response.data.training);
                        reviews_callback(response.data.reviews);
                        message.success('Trainings have been successfully loaded from server', 2);
                        Helper.public.event.checkRedirect();
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });

        },
        loadTrainingById: (id, callback) => {
            setTimeout(() => {
                message.success('Loading event from server... please wait.', 2);
            }, 2);
            return axios.get(`${API.url('training')}/${id}`)
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while fetching data from server, please try again after some time.', 2);
                    } else {
                        callback(response.data.training);
                        message.success('Training has been successfully loaded from server', 2);
                        //Helper.public.event.checkRedirect();
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });

        },
        filterTraining: (options, props, callback) => {
            setTimeout(() => {
                message.success('Filtering training, please wait...', 2);
            }, 2);

            return axios.post(API.url('training_filter'), options)
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while filtering data, please try again after some time.', 2);
                    } else {
                        // console.log('response.data',response.data);
                        callback(response.data.training);
                        message.success('Filtered training successfully loaded from server', 2);
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });
        },
        markTrainingCompleted: (id, callback) => {
            return axios.get(`${API.url('training')}/${id}/completed`)
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while marking this event as completed, please try again after some time.', 2);
                    } else {
                        callback(response.data);
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });

        }
    },
    trainer: {
        loadTrainerById: (id, callback) => {
            setTimeout(() => {
                message.success('Loading Trainer data from server... please wait.', 2);
            }, 2);
            return axios.get(`${API.url('trainer')}/${id}`)
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while fetching data from server, please try again after some time.', 2);
                    } else {
                        callback(response.data.trainer);
                        message.success('Host data has been successfully loaded from server', 2);
                        Helper.public.host.checkRedirect();
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });
        }
    },
    messages: {

        load: (props, callback) => {
            props.dbUpdateField({
                section: 'loading',
                key: 'user_messages',
                value: true
            });

            return axios.get(API.url('user_messages'))
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while fetching data from server, please try again after some time.', 2);
                    } else {
                        callback(response.data.messages);
                        props.dbUpdateField({
                            section: 'loaded',
                            key: 'user_messages',
                            value: true
                        });
                        props.dbUpdateField({
                            section: 'loading',
                            key: 'user_messages',
                            value: false
                        });
                        message.success('Message data has been successfully loaded from server', 2);
                        Helper.message.checkRedirect();
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });

        },


        send: (data, props) => {
            return axios.post(API.url('messages'), data)
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while sendimg message to the Guest.', 2);
                    } else {
                        props.dbUpdateField({
                            section: '_temp',
                            key: 'message_reply',
                            value: ''
                        });
                        props.dbUpdateMessages(response.data.message);
                        notification.success({
                            message: 'Message Sent',
                            description: 'Your message has been successfully sent.'
                        });
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });
        },


        flag: (id) => {
            return axios.get(`${API.url('messages')}/${id}/flag`)
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while flagging this message.', 2);
                    } else {
                        notification.success({
                            message: 'Message Flagged',
                            description: 'This response has been successfully flagged by you.'
                        });
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });
        }
    },
    discountMaker: {
        process: (text, callback) => {
            setTimeout(() => {
                message.success('Processing.., Please wait.', 2);
            }, 2);
            return axios.post(API.url('discountmaker'), {
                    message: text
                })
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while connecting with server, Please try after some time.', 2);
                    } else {
                        callback(response.data);
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });
        }
    },
    review: {
        load: (booking_id, callback) => {
            setTimeout(() => {
                message.success('Loading details for your review.., Please wait.', 2);
            }, 2);
            return axios.get(`${API.url('register')}/${booking_id}`)
                .then((response) => {
                    if (response.data.code == 420) {
                        notification.error({
                            message: 'Not Authorized',
                            description: 'You are not authorized to write this review, Please check the link again.'
                        });
                        setTimeout(() => {
                            browserHistory.push('/');
                        }, 100);
                    } else {
                        if (response.data.code != 200) {
                            notification.error({
                                message: 'Error Occoured',
                                description: 'Invlid review link provided, Please check the link again.'
                            });
                            setTimeout(() => {
                                browserHistory.push('/');
                            }, 100);
                        } else {
                            callback(response.data.booking);
                        }
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });
        },
        process: (review, booking, callback) => {
            setTimeout(() => {
                message.success('Processing.., Please wait.', 2);
            }, 2);
            review.host = booking.event.owner.id;
            review.event = booking.event.id;
            /* return axios.post( `${API.url('reviews')}/${booking.id}`, review ) */
            return axios.post(`${API.url('register')}/user-review/${booking.id}`, review)
                .then((response) => {
                    if (response.data.code != 200) {
                        message.error('Error occoured while connecting with server, Please try after some time.', 2);
                    } else {
                        callback(response.data);
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });
        }
    },
    user: {
        verifyPhone: (callback) => {
            setTimeout(() => {
                message.success('Verifying, Please wait...', 2);
            }, 2);
            return axios.get(`${API.url('users')}/verify-phone`)
                .then((response) => {
                    if (response.data.code == 210) {
                        notification.error({
                            message: 'Invalid Phone Number',
                            description: 'Please check your phone number, It must be in international format.'
                        });
                    } else if (response.data.code != 200) {
                        message.error('Error occoured while connecting with server, Please try after some time.', 2);
                    } else {
                        callback(response.data);
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });

        },
        verifyPhoneCode: (data, callback) => {
            setTimeout(() => {
                message.success('Verifying code, Please wait...', 2);
            }, 2);
            return axios.post(`${API.url('users')}/verify-phone`, data)
                .then((response) => {
                    if (response.data.code >= 200) {
                        callback(response.data);
                    } else {
                        message.error('Error occoured while connecting with server, Please try after some time.', 2);
                    }
                })
                .catch((error) => {
                    notification.error({
                        message: 'Error Occoured',
                        description: 'Unable to connect to the server.'
                    });
                });
        }
    }
}
