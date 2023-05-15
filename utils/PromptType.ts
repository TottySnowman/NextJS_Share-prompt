export type creator ={
  _id: string,
  email: string, 
  username:string,
  image?:string
}
export type post = {
  _id: string;
  prompt: string;
  tag: string;
  creator: creator
  handleTagClick?:(tag:string) => void
  handleEdit?:(post:post) => void
  handleDelete?:(post:post) => void
}