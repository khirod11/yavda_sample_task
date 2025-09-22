const API_URL = "http://localhost:3000/api/cards";

export interface VisualItem {
  _id: string;
  name: string;
  cardId: string;
  imagePath: string;
  description: string;
}

export const fetchCards = async (): Promise<VisualItem[]> => {
  try {
    const response = await fetch(API_URL);
    if (response.status !== 200) {
      throw new Error("Server error: " + response.status);
    }
    const data: VisualItem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
};
