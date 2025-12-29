import { useMemo, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { LandingPage } from "./pages/LandingPage";
import { CalendarHomePage } from "./pages/CalendarHomePage";
import { MonthlyViewPage } from "./pages/MonthlyViewPage";
import { CurrentMonthPage } from "./pages/CurrentMonthPage";
import { MoviesPage } from "./pages/MoviesPage";
import { months } from "./data";

const Footer = () => (
  <footer className="py-3 md:py-6 text-center text-xs sm:text-sm text-slate-400 bg-slate-950 border-t border-slate-800">
    <p className="m-0 p-0">
      Developed with 💖 by{" "}
      <a
        href="https://www.instagram.com/shraddhaxtales?igsh=bGwwczhoZjhiMjM2"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-300 font-semibold hover:text-purple-200 inline-flex items-center gap-1 transition-colors"
      >
        Nikhil
        <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>{"  "}
      &{"  "}
      <a
        href="https://www.instagram.com/shraddhas_vaibhav?igsh=eDN5N2hyc2hpdXdo"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-300 font-semibold hover:text-purple-200 inline-flex items-center gap-1 transition-colors"
      >
        Vaibhav
        <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
    </p>
  </footer>
);

type View =
  | "landing"
  | "current-month"
  | "calendar-home"
  | "calendar-home-month"
  | "monthly"
  | "movies";

function getCurrentYearMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  return { year, month };
}

function App() {
  const [{ year: currentYear, month: currentMonth }] = useState(
    getCurrentYearMonth
  );

  const [calendarYear] = useState<number>(2026);
  const [view, setView] = useState<View>("landing");
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [targetDate, setTargetDate] = useState<string | null>(null);

  const monthMeta = useMemo(
    () => months.find((m) => m.id === selectedMonth),
    [selectedMonth]
  );
  void monthMeta;

  let pageContent;
  
  if (view === "landing") {
    pageContent = (
      <LandingPage
        onGoCurrentMonth={() => setView("current-month")}
        onGoViewCalendar={() => setView("calendar-home")}
        onGoMonthly={() => setView("monthly")}
        onGoMovies={() => setView("movies")}
      />
    );
  } else if (view === "current-month") {
    pageContent = (
      <CurrentMonthPage
        year={currentYear}
        monthId={currentMonth}
        onBack={() => setView("landing")}
      />
    );
  } else if (view === "calendar-home") {
    pageContent = (
      <CalendarHomePage
        year={calendarYear}
        onBack={() => setView("landing")}
        onSelectMonth={(monthId, date) => {
          setSelectedMonth(monthId);
          setTargetDate(date || null);
          setView("calendar-home-month");
        }}
      />
    );
  } else if (view === "calendar-home-month") {
    pageContent = (
      <MonthlyViewPage
        year={calendarYear}
        monthId={selectedMonth}
        mode="calendar-home"
        onBackToSelection={() => {
          setTargetDate(null);
          setView("calendar-home");
        }}
        onBackToLanding={() => {
          setTargetDate(null);
          setView("landing");
        }}
        onMonthChange={(newMonthId) => {
          setSelectedMonth(newMonthId);
          setTargetDate(null);
        }}
        initialDate={targetDate}
        onInitialDateHandled={() => setTargetDate(null)}
      />
    );
  } else if (view === "monthly") {
    pageContent = (
      <MonthlyViewPage
        year={calendarYear}
        monthId={selectedMonth}
        mode="monthly"
        onBackToSelection={undefined}
        onBackToLanding={() => setView("landing")}
        onMonthChange={(newMonthId) => setSelectedMonth(newMonthId)}
      />
    );
  } else if (view === "movies") {
    pageContent = <MoviesPage onBack={() => setView("landing")} />;
  } else {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-50 overflow-hidden">
      <div className="flex-1 overflow-auto">
        {pageContent}
      </div>
      <Footer />
    </div>
  );
}

export default App;
