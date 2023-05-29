import { ListGroupItem, Card, Button } from "react-bootstrap";
import Post from "../../../../lib/data/dataObjects/Post";
import { useState } from "react";
import { Nullable, StateSetter } from "../../../../types/react.types";
import CommentsList from "./comments-list";

type PostItemProps = {
  post: Post;
  selectedPost: Nullable<string>;
  setSelectedPost: StateSetter<Nullable<string>>;
};

export default function PostsItem({ post, selectedPost, setSelectedPost}: PostItemProps) {
  if (!post) return <></>;

  const [showComments, setShowComments] = useState<Boolean>(false);
  const selected = selectedPost === post.id;


  return (
    <ListGroupItem>
      <div onClick={() => setSelectedPost(post.id)}>
        <Card>
          <Card.Body>
            <Card.Title style={{ fontWeight: selected ? "bold" : "normal" }}>{post.title}</Card.Title>
            <Card.Text style={{ fontWeight: selected ? "bold" : "normal" }}>{post.body}</Card.Text>
            <Button onClick={() => setShowComments(!showComments)}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </Button>
          </Card.Body>
        </Card>

        {showComments && <CommentsList post={post} showComments={showComments}/>}
      </div>
    </ListGroupItem>
  );
}
