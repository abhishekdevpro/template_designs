export default function DashboardLayout({ children }) {
    return (
      <div>
        <header>
          <nav>
            {/* Dashboard-specific navigation */}
            <a href="/dashboard/profile">Profile</a>
            <a href="/dashboard/settings">Settings</a>
          </nav>
        </header>
        <main>
        
          {children}
        </main>
      </div>
    );
  }
  