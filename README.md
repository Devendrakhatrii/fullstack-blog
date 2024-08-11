# Blog App with React & Appwrite

### This is an project on which I have implemented my react skill with BaaS and created a fullstack Blog app.

# Day-1

- setup an react app using vite
- configured tailwind CSS for vite
- Installed packages such as appwrite, @reduxjs/toolkit, react-redux, react-router-dom, react-hook-form etc.
- created .env and .env.sample file to configure appwrite Backend

```dotenv
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

- Creating user, logging user and loggingOut

> **summary**
>
> > Day-1 did the basic setup for the project and learned more about appwrite and used appwrite cloud such as createing Databases, authentication, users etc.

# Day-2

## Appwrite Database, file upload and custom queries

> Appwrite Database

- Create Post service
- Update Post
- Delete Post
- Delete document
- Get post and posts

> File upload

- Upload file
- Delete file
- File preview

```javascript
import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteurl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, image, status, id }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          id,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }
  async updatePost(slug, { title, content, image, status, id }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          id,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }
  async deleteDocument(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }
  async filePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const serive = new Service();

export default serive;
```
# Day 3

## Redux toolkit

- configureStore
- createSlice
- created authSlice with reducers login & logout
- useDispatch, dispatch login an logout
- loading component,

# Day 3

- logout button
- header navbar
- added more components

#  Day 4

## React Hook Form

- get to know about hook form
- setup
-