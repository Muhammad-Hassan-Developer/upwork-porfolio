import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TitleBox from './components/TitleBox';
import StatsGrid from './components/StatsGrid';
import DataTable from './components/DataTable';
import ChatWidget from './components/ChatWidget';
import CVAnalyserPage from './components/CVAnalyserPage';
import Login from './components/Login';
import { getAllProducts } from './services/supabaseService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('chatbot');
  const [productRows, setProductRows] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const products = await getAllProducts();
      const mapped = products.map((p) => [
        p.id,
        p.product_name,
        p.price,
        p.tracking_id,
        p.status,
      ]);
      setProductRows(mapped);
    }
    loadProducts();
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'user' && password === '7866') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('chatbot');
  };

  const pageDetails = {
    chatbot: {
      title: 'Smart E-commerce Assistant',
      subtitle: 'E-commerce smart customer support assistant grounded in SQLite inventory.',
      stats: [
        { label: 'Total Products Synced', value: '1,250+ Items', trend: 'Live Sync', trendType: 'blue', desc: 'with DB Inventory' },
        { label: 'Auto-Resolution Rate', value: '94.2%', trend: '+2.1%', trendType: 'up', desc: 'without human agent' },
        { label: 'Avg Retrieval Latency', value: '1.2s', trend: 'Optimized', trendType: 'blue', desc: 'Hybrid BM25 search' }
      ],
      tableTitle: 'E-Commerce Product Inventory Catalog',
      headers: ['Product ID', 'Product Name', 'Price (PKR)', 'Tracking ID', 'Status'],
      rows: productRows
    },
    leads: {
      title: '📋 Lead Generation Dashboard',
      subtitle: 'Structured business leads extracted dynamically by automated n8n workflow agents.',
      stats: [
        { label: 'Total Leads Extracted', value: '438', trend: '+45 new', trendType: 'up', desc: 'this week' },
        { label: 'Sync Status', value: 'Connected', trend: 'Live', trendType: 'blue', desc: 'with Google Sheets' },
        { label: 'Conversion Rate', value: '18.2%', trend: 'High Quality', trendType: 'up', desc: 'verified emails' }
      ],
      tableTitle: 'Extracted Leads Data (n8n Stream)',
      headers: ['Date Found', 'Company Name', 'Contact Person', 'Extracted Email', 'Source Pipeline'],
      rows: [
        ['26 May 2026', 'Apex Solutions', 'Zubair Khan', 'zubair@apex.com', 'LinkedIn Scraper'],
        ['25 May 2026', 'Matrix Tech', 'Amina Ali', 'info@matrix.io', 'Google Maps API Agent'],
      ]
    },
    jarvis: {
      title: '🤖 Jarvis Voice Command Center',
      subtitle: 'Local OS automation agent utilizing advanced function-calling logic.',
      stats: [
        { label: 'Voice Sessions', value: '42', trend: 'Local Inference', trendType: 'blue', desc: 'Whisper Tiny' },
        { label: 'Executed Actions', value: '189', trend: '100% Safe', trendType: 'up', desc: 'File/Browser ops' },
        { label: 'Failure Rate', value: '0.0%', trend: 'Perfect Sync', trendType: 'blue', desc: 'Function Calling' }
      ],
      tableTitle: 'Executed OS Command History',
      headers: ['Execution Time', 'Voice Input Text', 'Detected Intent', 'Target Action', 'Result'],
      rows: [
        ['11:00 AM', 'open chrome and search ragas', 'browser_open', 'chrome.exe --search="ragas"', 'Completed'],
        ['10:55 AM', 'create folder named solar', 'file_system', 'mkdir "D:/projects/solar"', 'Completed'],
      ]
    },
    mlflow: {
      title: '📊 MLflow Evaluation Hub',
      subtitle: 'Ragas framework components evaluation metrics & experiment tracking.',
      stats: [
        { label: 'Active Run Experiments', value: '14 Runs', trend: 'v4.2.1', trendType: 'blue', desc: 'MLflow tracking' },
        { label: 'Faithfulness Benchmark', value: '0.89', trend: 'Target > 0.85', trendType: 'up', desc: 'Passes validation' },
        { label: 'Answer Relevance', value: '0.92', trend: 'High Precision', trendType: 'up', desc: 'No Hallucinations' }
      ],
      tableTitle: 'Ragas Model Evaluation Runs Matrix',
      headers: ['Run ID', 'Model Checkpoint', 'Context Recall', 'Faithfulness', 'Answer Similarity'],
      rows: [
        ['run_8f3a1', 'Llama-3-8B-Instruct', '0.88', '0.89', '0.91'],
        ['run_2c91b', 'Mistral-7B-v0.2', '0.82', '0.84', '0.86'],
      ]
    },
    cvanalyser: {
      title: '📄 CV Analyser',
      subtitle: 'Upload and analyze CVs using AI-powered extraction.',
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      
      {/* 1. Left Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* 2. Main Page Grid Content */}
      <main className="flex-1 p-8 overflow-y-auto pb-24">
        {activeTab === 'cvanalyser' ? (
          <>
            <TitleBox 
              title={pageDetails[activeTab].title} 
              subtitle={pageDetails[activeTab].subtitle} 
            />
            <CVAnalyserPage />
          </>
        ) : (
          <>
            <TitleBox 
              title={pageDetails[activeTab].title} 
              subtitle={pageDetails[activeTab].subtitle} 
            />

            <StatsGrid stats={pageDetails[activeTab].stats} />

            <DataTable 
              title={pageDetails[activeTab].tableTitle}
              headers={pageDetails[activeTab].headers}
              rows={pageDetails[activeTab].rows}
            />
          </>
        )}
      </main>

      {/* 3. CHOTA FLOATING WIDGET (Sirf Chatbot wale page par active hoga) */}
      {activeTab === 'chatbot' && <ChatWidget onLogout={handleLogout} />}

    </div>
  );
}

export default App;