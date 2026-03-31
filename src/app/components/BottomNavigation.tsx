import { Home, Receipt, FileBarChart, Settings } from "lucide-react";

interface BottomNavigationProps {
  activeTab: "home" | "transactions" | "reports" | "settings";
  onTabChange: (tab: "home" | "transactions" | "reports" | "settings") => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "transactions" as const, label: "Transactions", icon: Receipt },
    { id: "reports" as const, label: "Reports", icon: FileBarChart },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 flex-1 py-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
