import md5 from 'js-md5';

export const formatTimestamp = timestamp => {
	const date = new Date(timestamp);
	return `${date.toLocaleString()}`;
};

export const gravatarImageSrc = (token, size = 32) => {
	return `https://www.gravatar.com/avatar/${md5(token)}?d=identicon&s=${size}`
};
