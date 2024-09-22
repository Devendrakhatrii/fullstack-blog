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
  async createPost({ title, name, slug, content, image, id }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          slug,
          name,
          title,
          content,
          image,
          id,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }
  async updatePost(id, { title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id,
        {
          title,
          content,
          image,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }
  async deleteDocument(id) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async post(postId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
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
        config.appwriteCollectionId
        // [Query.equal("status", "active")]
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
  // async updateFile(fileId, file) {
  //   try {
  //     return await this.bucket.updateFile(
  //       config.appwriteBucketId,
  //       fileId,
  //       file
  //     );
  //   } catch (error) {
  //     console.log("Appwrite serive :: updateFile :: error", error);
  //     return false;
  //   }
  // }
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

const service = new Service();

export default service;
