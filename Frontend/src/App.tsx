import { Navigate, Route, Routes } from "react-router-dom";
import { AppAmbient } from "@/components/AppAmbient";
import { HomePage } from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LearningPage } from "@/pages/LearningPage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { CommunityPage } from "@/pages/CommunityPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SettingsPage } from "@/pages/SettingsPage";
import { TopicSelectionPage } from "@/pages/practice/TopicSelectionPage";
import { PracticeSetupPage } from "@/pages/practice/PracticeSetupPage";
import { ActivePracticeSession } from "@/pages/practice/ActivePracticeSession";

export default function App() {
  return (
    <AppAmbient>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/practice" element={<TopicSelectionPage />} />
        <Route path="/practice/:category/:topic" element={<PracticeSetupPage />} />
        <Route path="/practice/session/:sessionId" element={<ActivePracticeSession />} />
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
