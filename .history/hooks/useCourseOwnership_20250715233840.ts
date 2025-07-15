import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthContext";
import { userPurchasesService } from "@/lib/userPurchasesService";

interface CourseOwnership {
  courseId: string;
  isOwned: boolean;
  purchaseDate?: string;
  expiresAt?: string;
  status: "completed" | "pending" | "failed";
}

export function useCourseOwnership(courseId?: string) {
  const { user } = useAuth();
  const [ownership, setOwnership] = useState<CourseOwnership | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check ownership for a specific course
  const checkOwnership = useCallback(
    async (courseId: string) => {
      if (!user?.id) {
        setOwnership({
          courseId,
          isOwned: false,
          status: "failed",
        });
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const ownershipData = await userPurchasesService.getCourseOwnership(
          user.id,
          courseId
        );
        setOwnership(ownershipData);
      } catch (err) {
        console.error("Error checking course ownership:", err);
        setError("Błąd podczas sprawdzania własności kursu");
        setOwnership({
          courseId,
          isOwned: false,
          status: "failed",
        });
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  // Check ownership when courseId changes
  useEffect(() => {
    if (courseId) {
      checkOwnership(courseId);
    }
  }, [courseId, checkOwnership]);

  // Refresh ownership data
  const refreshOwnership = useCallback(() => {
    if (courseId) {
      checkOwnership(courseId);
    }
  }, [courseId, checkOwnership]);

  return {
    ownership,
    loading,
    error,
    refreshOwnership,
    isOwned: ownership?.isOwned || false,
  };
}

export function useAllCourseOwnership() {
  const { user } = useAuth();
  const [allOwnership, setAllOwnership] = useState<CourseOwnership[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all course ownership for the user
  const loadAllOwnership = useCallback(async () => {
    if (!user?.id) {
      setAllOwnership([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ownershipData = await userPurchasesService.getAllCourseOwnership(
        user.id
      );
      console.log(
        "Ownership data loaded for user:",
        user.id,
        "Count:",
        ownershipData.length
      );
      setAllOwnership(ownershipData);
    } catch (err) {
      console.error("Error loading all course ownership:", err);
      setError("Błąd podczas ładowania własności kursów");
      setAllOwnership([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Load ownership when user changes
  useEffect(() => {
    loadAllOwnership();
  }, [loadAllOwnership]);

  // Check if user owns a specific course
  const isOwned = useCallback(
    (courseId: string) => {
      return (
        allOwnership.find((ownership) => ownership.courseId === courseId)
          ?.isOwned || false
      );
    },
    [allOwnership]
  );

  // Refresh all ownership data
  const refreshAllOwnership = useCallback(() => {
    loadAllOwnership();
  }, [loadAllOwnership]);

  return {
    allOwnership,
    loading,
    error,
    refreshAllOwnership,
    isOwned,
  };
}
