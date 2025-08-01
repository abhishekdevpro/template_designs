export default function AdminLayout({ children }) {
    return (
      <div>
        <header>
          <nav>
            {/* Dashboard-specific navigation */}
           
          </nav>
        </header>
        <main>
        
          {children}
        </main>
      </div>
    );
  }
  