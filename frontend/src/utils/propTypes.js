import PropTypes from 'prop-types';

export const statePropTypes = {
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
};

export const postPropTypes = {
	id: PropTypes.string.isRequired,
	timestamp: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	voteScore: PropTypes.number.isRequired,
	deleted: PropTypes.bool.isRequired,
	commentCount: PropTypes.number.isRequired,
};
