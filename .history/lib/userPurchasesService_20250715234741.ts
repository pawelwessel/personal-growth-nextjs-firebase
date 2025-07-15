import {
  addDocument,
  getDocuments,
  getDocument,
  updateDocument,
} from "@/firebase";

interface UserPurchase {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  purchaseDate: string;
  amount: number;
  currency: string;
  transactionId: string;
  status: "completed" | "pending" | "failed";
  stripeSessionId?: string;
  expiresAt?: string; // For subscription-based access
}

interface CourseOwnership {
  courseId: string;
  isOwned: boolean;
  purchaseDate?: string;
  expiresAt?: string;
  status: "completed" | "pending" | "failed";
}

const COLLECTION_NAME = "user_purchases";

export const userPurchasesService = {
  // Add a new purchase record
  async addPurchase(purchaseData: Omit<UserPurchase, "id">): Promise<string> {
    const id = Date.now().toString();
    const purchase: UserPurchase = {
      ...purchaseData,
      id,
    };

    console.log("Adding purchase to database:", purchase);

    try {
      await addDocument(COLLECTION_NAME, id, purchase);
      console.log(`Purchase saved successfully with ID: ${id}`);
      return id;
    } catch (error) {
      console.error("Error saving purchase to Firestore:", error);
      throw error;
    }
  },

  // Get all purchases for a user
  async getUserPurchases(userId: string): Promise<UserPurchase[]> {
    const purchases = await getDocuments(COLLECTION_NAME);
    const userPurchases = (purchases as UserPurchase[]).filter(
      (purchase) => purchase.userId === userId
    );
    if (userPurchases.length > 0) {
      console.log(
        "User purchases found for user:",
        userId,
        "Count:",
        userPurchases.length
      );
    }
    return userPurchases;
  },

  // Check if user owns a specific course
  async userOwnsCourse(userId: string, courseId: string): Promise<boolean> {
    const userPurchases = await this.getUserPurchases(userId);
    return userPurchases.some(
      (purchase) =>
        purchase.courseId === courseId && purchase.status === "completed"
    );
  },

  // Get user's purchased courses
  async getUserCourses(userId: string): Promise<string[]> {
    const userPurchases = await this.getUserPurchases(userId);
    return userPurchases
      .filter((purchase) => purchase.status === "completed")
      .map((purchase) => purchase.courseId);
  },

  // Get detailed course ownership information
  async getCourseOwnership(
    userId: string,
    courseId: string
  ): Promise<CourseOwnership> {
    const userPurchases = await this.getUserPurchases(userId);
    const purchase = userPurchases.find(
      (p) => p.courseId === courseId && p.status === "completed"
    );

    if (!purchase) {
      return {
        courseId,
        isOwned: false,
        status: "failed",
      };
    }

    // Check if course access has expired (for subscription-based courses)
    const isExpired =
      purchase.expiresAt && new Date(purchase.expiresAt) < new Date();

    return {
      courseId,
      isOwned: !isExpired,
      purchaseDate: purchase.purchaseDate,
      expiresAt: purchase.expiresAt,
      status: purchase.status,
    };
  },

  // Get all course ownership for a user
  async getAllCourseOwnership(userId: string): Promise<CourseOwnership[]> {
    const userPurchases = await this.getUserPurchases(userId);
    const completedPurchases = userPurchases.filter(
      (p) => p.status === "completed"
    );

    return completedPurchases.map((purchase) => {
      const isExpired =
        purchase.expiresAt && new Date(purchase.expiresAt) < new Date();

      return {
        courseId: purchase.courseId,
        isOwned: !isExpired,
        purchaseDate: purchase.purchaseDate,
        expiresAt: purchase.expiresAt,
        status: purchase.status,
      };
    });
  },

  // Update purchase status
  async updatePurchaseStatus(
    purchaseId: string,
    status: "completed" | "pending" | "failed"
  ): Promise<void> {
    await updateDocument(["status"], [status], COLLECTION_NAME, purchaseId);
  },
};
