import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams(); // Capture the 'id' from the URL

  console.log("ID:", id); // This will log the ID passed from the URL

  return (
    <div>
      <h1>Edit Post</h1>
      <p>Editing post with ID: {id}</p>
      {/* Additional code for editing the post */}
    </div>
  );
};

export default EditPost;
