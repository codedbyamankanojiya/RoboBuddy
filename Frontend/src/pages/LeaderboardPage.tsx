import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";

export function LeaderboardPage() {
  const leaderboardData = [
    { name: "Rayna", score: 10000, streak: 15, trend: "up", avatar: "🌟", level: "Gold" },
    { name: "Neon", score: 9200, streak: 12, trend: "up", avatar: "⭐", level: "Gold" },
    { name: "Brimstone", score: 8400, streak: 8, trend: "down", avatar: "💫", level: "Silver" },
    { name: "Sage", score: 7600, streak: 10, trend: "up", avatar: "✨", level: "Silver" },
    { name: "Phoenix", score: 6800, streak: 5, trend: "same", avatar: "🎯", level: "Bronze" },
    { name: "Viv", score: 6200, streak: 7, trend: "up", avatar: "🎨", level: "Bronze" },
    { name: "Echo", score: 5800, streak: 4, trend: "down", avatar: "🎭", level: "Bronze" },
    { name: "Nova", score: 5100, streak: 6, trend: "up", avatar: "🎪", level: "Bronze" },
  ];

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-200";
    if (rank === 2) return "bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg shadow-gray-200";
    if (rank === 3) return "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-200";
    return "bg-purple-50 text-purple-700 ring-1 ring-purple-200";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  };

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-500";
    return "text-gray-400";
  };

  return (
    <AppShell title="Leaderboard">
      <div className="space-y-6">
        {/* Header Card */}
        <Card variant="glass" className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Weekly Champions</h2>
                <span className="text-2xl">🏆</span>
              </div>
              <p className="mt-1 text-purple-100">Top performers this week</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">Live Now:</span>
              <span className="font-bold">127</span>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card variant="glass" className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 ring-1 ring-purple-200">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-sm text-purple-600 font-medium">Total Players</div>
            <div className="text-2xl font-bold text-purple-900">1,234</div>
            <div className="text-xs text-purple-500 mt-1">+48 new</div>
          </Card>
          <Card variant="glass" className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 ring-1 ring-purple-200">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-sm text-purple-600 font-medium">Average Score</div>
            <div className="text-2xl font-bold text-purple-900">8,240</div>
            <div className="text-xs text-purple-500 mt-1">↑ 12%</div>
          </Card>
          <Card variant="glass" className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 ring-1 ring-purple-200">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sm text-purple-600 font-medium">Goals Achieved</div>
            <div className="text-2xl font-bold text-purple-900">1,892</div>
            <div className="text-xs text-purple-500 mt-1">this week</div>
          </Card>
        </div>

        {/* Leaderboard List */}
        <Card variant="glass" className="overflow-hidden bg-white p-0">
          <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-5 border-b border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-purple-900">Today's Rankings</span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  UPDATING
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-purple-600">Sort by:</span>
                <select className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-purple-700 ring-1 ring-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-2 max-h-[500px] overflow-y-auto">
            {leaderboardData.map((player, i) => (
              <div
                key={player.name}
                className={`
                  group relative flex items-center justify-between rounded-xl p-3 
                  transition-all duration-200 hover:shadow-md
                  ${i < 3 
                    ? 'bg-gradient-to-r from-purple-50 to-white ring-1 ring-purple-200' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                {/* Rank Number */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`
                    w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium
                    ${getRankStyle(i + 1)}
                  `}>
                    {i + 1}
                  </div>

                  {/* Avatar */}
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                    {player.avatar}
                  </div>

                  {/* Player Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 truncate">
                        {player.name}
                      </span>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                        player.level === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                        player.level === 'Silver' ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {player.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>🔥 {player.streak} days</span>
                      <span>•</span>
                      <span className={`flex items-center gap-0.5 ${getTrendColor(player.trend)}`}>
                        {getTrendIcon(player.trend)} {player.trend === 'up' ? 'rising' : player.trend === 'down' ? 'down' : 'steady'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{player.score.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                  {i < 3 && (
                    <div className="text-xl">
                      {i === 0 && "🥇"}
                      {i === 1 && "🥈"}
                      {i === 2 && "🥉"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="border-t border-gray-100 p-4">
            <button className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 py-2.5 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-purple-800 hover:shadow-md flex items-center justify-center gap-2">
              <span>View Full Leaderboard</span>
              <span>→</span>
            </button>
          </div>
        </Card>

        {/* Weekly Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card variant="glass" className="bg-white p-5 ring-1 ring-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span>📈</span> This Week's Trend
              </h3>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
            </div>
            <div className="flex items-end justify-between h-16">
              {[45, 62, 78, 55, 82, 94, 88].map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div 
                    className="w-6 bg-gradient-to-t from-purple-400 to-purple-500 rounded-t"
                    style={{ height: `${height * 0.5}px` }}
                  ></div>
                  <span className="text-xs text-gray-500">{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="bg-white p-5 ring-1 ring-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span>⭐</span> Top Achievers
              </h3>
              <span className="text-xs text-purple-600">This month</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Most improved</span>
                <span className="font-medium text-gray-900">Rayna +45%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Longest streak</span>
                <span className="font-medium text-gray-900">Neon 15 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Perfect scores</span>
                <span className="font-medium text-gray-900">Sage, Phoenix</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f3e8ff;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #d8b4fe;
          border-radius: 10px;
        }
      `}</style>
    </AppShell>
  );
}