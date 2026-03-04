import { Navigate, Route, Routes } from "react-router-dom";
import { AppAmbient } from "@/components/AppAmbient";
import { HomePage } from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { PracticePage } from "@/pages/PracticePage";
import { LearningPage } from "@/pages/LearningPage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { CommunityPage } from "@/pages/CommunityPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SettingsPage } from "@/pages/SettingsPage";

export default function App() {
  return (
    <AppAmbient>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppAmbient>
  );
}
