'use strict';

export default {
	url: 'http://localhost:2233/',
	register: 'auth/register',
	login: 'auth/login',
	validate_auth: 'auth/validate',
	reset_password: 'auth/reset-password',

	users: 'users',
	update_user_details: 'users/update',
	user_make_trainer: 'users/make-trainer',
	upload_profile_picture: 'users/upload-profile-picture',

	training: 'training',
	upload_training_images: 'training/upload',
	delete_training_image: 'training/delete-image',

	upload_trainer_documents: 'users/upload-documents',
	delete_trainer_document: 'users/delete-document',
	user_messages: 'messages',
	webinar: 'webinar',
	register_messages: 'messages/register',
	messages: 'messages',


	training: 'public/training',
	traininer: 'public/traininer',
	training_filter: 'public/training/filter',

	discountmaker: 'discountmaker',
	reviews: 'reviews',
	instamojo_payment_request: 'payments/instamojo/make-request',


}
