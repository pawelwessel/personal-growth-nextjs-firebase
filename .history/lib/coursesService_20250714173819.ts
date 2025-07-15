import {
  db,
  storage,
  addDocument,
  getDocuments,
  getDocument,
  removeDocument,
  updateDocument,
} from "@/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore/lite";
import { Course } from "@/types";

const COLLECTION_NAME = "courses";

export const coursesService = {
  // Get all courses
  async getAllCourses(): Promise<Course[]> {
    try {
      const courses = await getDocuments(COLLECTION_NAME);
      return courses as Course[];
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  // Get course by ID
  async getCourseById(id: string): Promise<Course | null> {
    try {
      const course = await getDocument(COLLECTION_NAME, id);
      return (course as Course) || null;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  },

  // Add new course
  async addCourse(
    courseData: Omit<Course, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    try {
      const id = Date.now().toString();
      const now = new Date().toISOString();

      const course: Course = {
        ...courseData,
        id,
        createdAt: now,
        updatedAt: now,
      };

      await addDocument(COLLECTION_NAME, id, course);
      return id;
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  },

  // Update course
  async updateCourse(id: string, updates: Partial<Course>): Promise<void> {
    try {
      const keys = Object.keys(updates);
      const values = Object.values(updates);

      // Add updatedAt timestamp
      keys.push("updatedAt");
      values.push(new Date().toISOString());

      await updateDocument(keys, values, COLLECTION_NAME, id);
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  // Delete course
  async deleteCourse(id: string): Promise<void> {
    try {
      await removeDocument(COLLECTION_NAME, id);
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },

  // Upload PDF file
  async uploadPdfFile(file: File, courseId: string): Promise<string> {
    try {
      const storageRef = ref(storage, `courses/${courseId}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading PDF:", error);
      throw error;
    }
  },

  // Upload course image
  async uploadCourseImage(file: File, courseId: string): Promise<string> {
    try {
      const storageRef = ref(
        storage,
        `courses/${courseId}/images/${file.name}`
      );
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  // Delete file from storage
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  },

  // Get courses by category
  async getCoursesByCategory(category: string): Promise<Course[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data() as Course);
    } catch (error) {
      console.error("Error fetching courses by category:", error);
      throw error;
    }
  },

  // Get popular courses
  async getPopularCourses(): Promise<Course[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("isPopular", "==", true),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data() as Course);
    } catch (error) {
      console.error("Error fetching popular courses:", error);
      throw error;
    }
  },

  // Search courses
  async searchCourses(searchTerm: string): Promise<Course[]> {
    try {
      const allCourses = await this.getAllCourses();
      return allCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching courses:", error);
      throw error;
    }
  },
};
