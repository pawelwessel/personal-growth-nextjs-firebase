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

    await addDocument(COLLECTION_NAME, id, purchase);
    return id;
  },

  // Get all purchases for a user
  async getUserPurchases(userId: string): Promise<UserPurchase[]> {
    const purchases = await getDocuments(COLLECTION_NAME);
    return (purchases as UserPurchase[]).filter(
      (purchase) => purchase.userId === userId
    );
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

  // Update purchase status
  async updatePurchaseStatus(
    purchaseId: string,
    status: "completed" | "pending" | "failed"
  ): Promise<void> {
    await updateDocument(["status"], [status], COLLECTION_NAME, purchaseId);
  },
};
