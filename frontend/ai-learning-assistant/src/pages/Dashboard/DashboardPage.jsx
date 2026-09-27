import React, { useState, useEffect } from "react";
import Spinner from "../../components/common/Spinner";
import progressService from "../../services/progressService";
import toast from "react-hot-toast";
import {
  FileText,
  BookOpen,
  BrainCircuit,
  TrendingUp,
  Clock,
} from "lucide-react";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressService.getDashboardData();
        console.log("Data___getDashboardData", data);

        setDashboardData(data.data);
      } catch (error) {
        toast.error("Failed to fetch dashboard data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!dashboardData || !dashboardData.overview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-page mb-4">
            <TrendingUp className="w-8 h-8 text-muted" />
          </div>
          <p className="text-muted text-sm">No dashboard data available.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Documents",
      value: dashboardData.overview.totalDocuments,
      icon: FileText,
      gradient: "bg-primary",
      shadowColor: "shadow-primary/25",
    },
    {
      label: "Total Flashcards",
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
      gradient: "bg-primary",
      shadowColor: "shadow-primary/25",
    },
    {
      label: "Total Quizzes",
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
      gradient: "bg-primary",
      shadowColor: "shadow-primary/25",
    },
  ];

  return (
    <div className="min-h-screen">

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-navy tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted text-sm">Track your learning progress and activity</p>
        </div>

        {/*Stats Grid*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
          {stats.map((stat, index) => (
            <div key={index} className="group relative bg-surface/80 backdrop-blur-xl border border-border-subtle/60 rounded-2xl shadow-xl shadow-border-subtle/50 p-6 hover:shadow-2xl hover:shadow-border-subtle/50 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted uppercase tracking-wide">{stat.label}</span>
                <div
                  className={`w-11 h-11 rounded-xl ${stat.gradient} shadow-sm ${stat.shadowColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-5 h-5 text-surface" strokeWidth={2} />
                </div>
              </div>
              <div className="text-3xl font-semibold text-navy tracking-tight">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-surface/80 backdrop-blur-xl border border-border-subtle/60 rounded-2xl shadow-xl shadow-border-subtle/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-page flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-medium text-navy tracking-tight">Recent Activity</h3>
          </div>

          {dashboardData.recentActivity &&
          (dashboardData.recentActivity.documents.length > 0 ||
            dashboardData.recentActivity.quizzes.length > 0) ? (
            <div className="space-y-3">
              {[
                ...(dashboardData.recentActivity.documents || []).map(
                  (doc) => ({
                    id: doc._id,
                    description: doc.title,
                    timestamp: doc.lastAccessed,
                    link: `/documents/${doc._id}`,
                    type: "document",
                  }),
                ),
                ...(dashboardData.recentActivity.quizzes || []).map((quiz) => ({
                  id: quiz._id,
                  description: quiz.title,
                  timestamp: quiz.lastAttempted,
                  link: `/quizzes/${quiz._id}`,
                  type: "quiz",
                })),
              ]
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((activity, index) => (
                  <div key={activity.id || index} className="group flex items-center justify-between p-4 rounded-xl bg-page/50 border border-border-subtle/60 hover:bg-surface hover:border-border-subtle/60 hover:shadow-md transition-all duration-200">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "document"
                              ? "bg-primary"
                              : "bg-primary"
                          }`}
                        />
                        <p className="text-sm font-medium text-navy truncate">
                          {activity.type === "document"
                            ? "Accessed Document: "
                            : "Attemp..."}
                          <span className="text-body">{activity.description}</span>
                        </p>
                      </div>
                      <p className="text-xs text-muted pl-4">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {activity.link && (
                      <a href={activity.link} className="ml-4 px-4 py-2 text-xs font-semibold text-primary-hover hover:text-primary-dark hover:bg-primary-subtle rounded-lg transition-all duration-200 whitespace-nowrap">
                        View
                      </a>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-page mb-4">
                <Clock className="w-8 h-8 text-muted" />
              </div>
              <p className="text-sm text-muted">No recent activity yet.</p>
              <p className="text-xs text-muted mt-1">Start learning to see your progress here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
