import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Dashboard.css';

const Dashboard = () => {
  const [ppntLossData, setPpntLossData] = useState<any[]>([]);

  // Odczyt danych ze straty PPNT
  useEffect(() => {
    const fetchPPNTData = async () => {
      try {
        const response = await fetch('/data/strata PPNT narastajaco.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(firstSheet);
        
        // Przekształć dane do formatu odpowiedniego dla wykresu (wartości w mln zł)
        const formattedData = data.map((row: any) => {
          const keys = Object.keys(row);
          return {
            period: String(row[keys[0]]),
            value: Number(row[keys[1]]) / 1000000  // Konwersja na miliony
          };
        });
        
        setPpntLossData(formattedData);
      } catch (error) {
        console.error('Błąd podczas odczytu pliku PPNT:', error);
      }
    };

    fetchPPNTData();
  }, []);

  // Dane do Pie Chart - podział wydatków po 3 kwartałach 2025
  const expensesByCategoryData = [
    { category: 'Inwestycje wykonane', value: 70172736.25 },
    { category: 'Wydatki bieżące', value: 1746422196.77 },
  ];

  // Dane do Bar Chart - inwestycje
  const investmentsData = [
    { project: 'Modernizacja dróg', q1: 450000, q2: 520000, q3: 580000 },
    { project: 'Szkoły i przedszkola', q1: 320000, q2: 380000, q3: 410000 },
    { project: 'Tereny zielone', q1: 180000, q2: 210000, q3: 250000 },
    { project: 'Infrastruktura sportowa', q1: 290000, q2: 340000, q3: 380000 },
  ];

  // Dane do dodatkowego wykresu - liczba projektów
  const projectsCountData = [
    { status: 'Zakończone', count: 45 },
    { status: 'W realizacji', count: 28 },
    { status: 'Planowane', count: 17 },
  ];

  // Konfiguracja Pie Chart
  const pieChartOptions: AgChartOptions = {
    data: expensesByCategoryData,
    title: {
      text: 'Wydatki po 3 kwartałach 2025',
      fontSize: 18,
      fontWeight: 600,
      color: '#254252',
    },
    series: [
      {
        type: 'pie' as any,
        angleKey: 'value',
        legendItemKey: 'category',
        fills: ['#E37239', '#254252'],
        strokes: ['#fff'],
        strokeWidth: 2,
        calloutLabel: {
          enabled: true,
          fontSize: 12,
        },
        sectorLabel: {
          enabled: false,
        },
      } as any,
    ],
    legend: {
      position: 'right',
    },
  };

  // Konfiguracja Bar Chart
  const barChartOptions: AgChartOptions = {
    data: investmentsData,
    title: {
      text: 'Inwestycje kwartalne 2025',
      fontSize: 18,
      fontWeight: 600,
      color: '#254252',
    },
    series: [
      {
        type: 'bar',
        xKey: 'project',
        yKey: 'q1',
        yName: 'Q1',
        fill: '#254252',
      },
      {
        type: 'bar',
        xKey: 'project',
        yKey: 'q2',
        yName: 'Q2',
        fill: '#E37239',
      },
      {
        type: 'bar',
        xKey: 'project',
        yKey: 'q3',
        yName: 'Q3',
        fill: '#F9982F',
      },
    ],
    legend: {
      position: 'bottom',
    },
  };

  // Konfiguracja Donut Chart dla statusów projektów
  const donutChartOptions: AgChartOptions = {
    data: projectsCountData,
    title: {
      text: 'Status projektów',
      fontSize: 18,
      fontWeight: 600,
      color: '#254252',
    },
    series: [
      {
        type: 'donut',
        angleKey: 'count',
        legendItemKey: 'status',
        fills: ['#254252', '#F9982F', '#EAB56F'],
        strokes: ['#fff'],
        strokeWidth: 2,
        innerRadiusRatio: 0.6,
        calloutLabel: {
          enabled: true,
          fontSize: 12,
        },
      },
    ],
    legend: {
      position: 'bottom',
    },
  };

  // Konfiguracja Bar Chart dla straty PPNT (w mln zł)
  const ppntLossChartOptions: AgChartOptions = {
    data: ppntLossData,
    title: {
      text: 'Ile mln zł stracił PPNT w danym roku',
      fontSize: 18,
      fontWeight: 600,
      color: '#254252',
    },
    series: [
      {
        type: 'bar',
        xKey: 'period',
        yKey: 'value',
        fill: '#E37239',
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
      },
      {
        type: 'number',
        position: 'left',
        label: {
          formatter: (params) => params.value.toFixed(1) + ' mln zł',
        },
      },
    ],
    legend: {
      enabled: false,
    },
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">

      </div>

      {/* Karty z metrykami */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-value">66+ mln zł</div>
          <div className="metric-label">Strata PPNT od 2019</div>
          <div className="metric-change" style={{ color: '#dc3545' }}>-10 mln zł w 2024</div>
        </div>
        <div className="metric-card">
          <div className="metric-value" style={{ fontSize: '40px' }}>70 mln zł</div>
          <div className="metric-label" style={{ fontSize: '14px' }}>Wydano na inwestycje w 2025</div>
          <div className="metric-change" style={{ color: '#dc3545', fontWeight: 600 }}>0,28% budżetu</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">4 mln zł</div>
          <div className="metric-label">Budżet na PR</div>
        </div>
        <div className="metric-card">
          <div className="metric-value" style={{ fontSize: '36px' }}>100 mln zł</div>
          <div className="metric-label" style={{ fontSize: '14px' }}>
            Gdzie uciekły pieniądze z PEWIK?
          </div>
          <div className="metric-change" style={{ color: '#6c757d' }}>
            Co z inwestycjami w kanalizację i sieć retencyjną?
          </div>
        </div>
      </div>

      {/* Wykresy */}
      <div className="charts-grid">
        {ppntLossData.length > 0 && (
          <div className="chart-container">
            <AgCharts options={ppntLossChartOptions} />
          </div>
        )}
        <div className="chart-container">
          <AgCharts options={pieChartOptions} />
        </div>
        {/* Ukryte tymczasowo */}
        {/* <div className="chart-container">
          <AgCharts options={barChartOptions} />
        </div>
        <div className="chart-container">
          <AgCharts options={donutChartOptions} />
        </div> */}
      </div>

      {/* Scroll indicator */}
      <Link to="/raporty" className="scroll-indicator" style={{ textDecoration: 'none' }}>
        <span>Zobacz szczegółowe raporty</span>
        <div className="scroll-arrow">↓</div>
      </Link>
    </div>
  );
};

export default Dashboard;
