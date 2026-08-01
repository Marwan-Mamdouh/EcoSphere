interface PromptSuggestion {
  icon: string;
  text: string;
}

export interface PromptCategory {
  title: string;
  prompts: PromptSuggestion[];
}

export const ROLE_PROMPTS: Record<string, PromptCategory[]> = {
  guest: [
    {
      title: "Discovery (Read)",
      prompts: [
        { icon: "🛍️", text: "Show me eco-friendly products" },
        { icon: "🍽️", text: "Find restaurants near me" },
        { icon: "💎", text: "What are the top-rated products?" },
        { icon: "🏷️", text: "Show me the cheapest products" },
        { icon: "🏆", text: "Show the points leaderboard" },
      ],
    },
    {
      title: "Sustainability (Read)",
      prompts: [
        { icon: "♻️", text: "How does recycling work?" },
        { icon: "📊", text: "Explain sustainability scores" },
        { icon: "🌱", text: "Most sustainable products available" },
      ],
    },
  ],
  customer: [
    {
      title: "My Data (Read)",
      prompts: [
        { icon: "📦", text: "Show my orders" },
        { icon: "🎯", text: "How many points do I have?" },
        { icon: "🏆", text: "Show the points leaderboard" },
        { icon: "🛒", text: "What's in my cart?" },
        { icon: "⭐", text: "View my favorites" },
      ],
    },
    {
      title: "Actions",
      prompts: [
        { icon: "🏠", text: "Go to my profile" },
        { icon: "🧹", text: "Clear my cart" },
      ],
    },
  ],
  restaurant: [
    {
      title: "Business Data (Read)",
      prompts: [
        { icon: "📊", text: "Show my sales statistics" },
        { icon: "🍴", text: "List my products" },
        { icon: "💰", text: "What's my revenue?" },
        { icon: "🥇", text: "Top-selling products" },
      ],
    },
    {
      title: "Orders (Read)",
      prompts: [
        { icon: "📝", text: "Show my pending orders" },
        { icon: "✅", text: "Show completed orders" },
      ],
    },
  ],
  organizer: [
    {
      title: "Events View (Read)",
      prompts: [
        { icon: "🎉", text: "Show my events" },
        { icon: "📅", text: "Upcoming events" },
        { icon: "👥", text: "How many attendees?" },
      ],
    },
    {
      title: "Actions",
      prompts: [{ icon: "➕", text: "How to create a new event?" }],
    },
  ],
  recycleAgent: [
    {
      title: "Worklist (Read)",
      prompts: [
        { icon: "📋", text: "Pending recycling requests" },
        { icon: "🚚", text: "Show today's pickups" },
        { icon: "📍", text: "Recycling locations" },
      ],
    },
    {
      title: "Impact (Read)",
      prompts: [{ icon: "♻️", text: "Carbon saved this month" }],
    },
  ],
  admin: [
    {
      title: "System Stats (Read)",
      prompts: [
        { icon: "📊", text: "Platform statistics" },
        { icon: "💰", text: "Total revenue" },
        { icon: "👥", text: "User growth metrics" },
        { icon: "♻️", text: "Total carbon impact" },
      ],
    },
  ],
};
