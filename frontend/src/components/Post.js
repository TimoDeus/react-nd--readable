import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {postPropTypes} from '../utils/propTypes';
import {formatTimestamp} from '../utils/helper';
import VoteControls, {VOTE_POST} from './VoteControls';

const Post = props => {
	const {post, onDeletePost, isPreview} = props;
	return post ? (
		<Card fluid color='blue'>
			<Card.Content>
				<Card.Header>
					{
						isPreview ?
							<Link to={`/${post.category}/${post.id}`}>{post.title}</Link> :
							post.title
					}
					<div className='floatRight'><VoteControls type={VOTE_POST} id={post.id}/></div>
				</Card.Header>
				<Card.Meta>
					<span>Written by <b>{post.author}</b></span>
					<span> in <Link to={`/${post.category}`}><b>{post.category}</b></Link></span>
					<span> | {formatTimestamp(post.timestamp)}</span>
				</Card.Meta>
			</Card.Content>
			{!isPreview && <Card.Content>{post.body}</Card.Content>}
			<Card.Content extra>
				<Icon name='comment'/>
				{post.commentCount} Comment(s)
				<Button icon floated='right' size='mini' onClick={() => onDeletePost(post.id)}>
					<Icon name='trash'/> Delete
				</Button>
				{!isPreview && (
					<Button icon floated='right' size='mini' onClick={() => onDeletePost(post.id)}>
						<Icon name='edit'/> Edit
					</Button>
				)}
			</Card.Content>
		</Card>
	) : null;
};

Post.propTypes = {
	isPreview: PropTypes.bool.isRequired,
	onDeletePost: PropTypes.func.isRequired,
	post: PropTypes.shape(postPropTypes).isRequired,
};

export default Post;
