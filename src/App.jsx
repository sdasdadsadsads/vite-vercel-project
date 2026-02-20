import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  ShieldAlert, 
  Activity, 
  Zap, 
  Cpu, 
  Globe, 
  Skull, 
  Copy, 
  ChevronRight,
  Database,
  Lock,
  Unlock,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  Bug,
  Key,
  Layers
} from 'lucide-react';

const App = () => {
  const [url, setUrl] = useState('https://httpbin.org/post');
  const [method, setMethod] = useState('POST');
  const [spoofIp, setSpoofIp] = useState('1.1.1.1');
  const [requestBody, setRequestBody] = useState('{\n  "access_code": "CYBER_GHOST_99",\n  "spoof_status": "active"\n}');
  const [useProxy, setUseProxy] = useState(true);
  const [proxyType, setProxyType] = useState('heroku'); // heroku or thingproxy
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('response');
  const [systemLogs, setSystemLogs] = useState(['Cyber Core v2.4 Online...', 'Multi-tunneling system ready.']);

  const proxies = {
    heroku: "https://cors-anywhere.herokuapp.com/",
    thingproxy: "https://thingproxy.freeboard.io/fetch/"
  };

  const addLog = (msg) => {
    setSystemLogs(prev => [...prev.slice(-4), `> ${msg}`]);
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);
    
    let targetUrl = url;
    if (useProxy) {
      if (!url.startsWith('http')) targetUrl = 'https://' + url;
      targetUrl = proxies[proxyType] + targetUrl;
      addLog(`TUNNEL_SELECTED: ${proxyType.toUpperCase()}...`);
    }
    
    addLog(`TRANSMITTING: ${method} packet via ${useProxy ? 'Proxy' : 'Direct'}...`);

    try {
      let parsedBody = null;
      if (method !== 'GET' && requestBody.trim() !== '') {
        try {
          parsedBody = JSON.stringify(JSON.parse(requestBody));
        } catch (e) {
          throw new Error('MALFORMED_JSON: รูปแบบ JSON ผิดพลาด');
        }
      }

      const headers = {
        'Content-Type': 'application/json',
        'X-Forwarded-For': spoofIp,
        'Client-IP': spoofIp,
        'X-Real-IP': spoofIp,
      };

      const startTime = performance.now();
      
      const res = await fetch(targetUrl, {
        method: method,
        headers: headers,
        body: method !== 'GET' ? parsedBody : undefined,
      });

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      if (!res.ok && res.status === 403 && proxyType === 'heroku') {
        throw new Error('PROXY_ACCESS_DENIED: ต้องกดยืนยันสิทธิ์ Proxy ก่อน');
      }

      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: data,
        time: duration,
        sentHeaders: headers
      });
      addLog(`SUCCESS: Target breached. Latency: ${duration}ms`);
      setActiveTab('response');
    } catch (err) {
      let errMsg = err.message;
      if (err.message === 'Failed to fetch') {
        errMsg = 'CORS_BLOCKADE: ถูกสกัดกั้นโดยเบราว์เซอร์';
      }
      setError(errMsg);
      addLog(`CRITICAL: ${errMsg}`);
      setActiveTab('error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    const val = typeof text === 'object' ? JSON.stringify(text, null, 2) : text;
    const el = document.createElement('textarea');
    el.value = val;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    addLog('Data dumped to clipboard.');
  };

  return (
    <div className="min-h-screen bg-[#010204] text-emerald-500 font-mono p-4 md:p-8 overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      {/* Background Matrix-like Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-6 border-2 border-emerald-900 bg-black p-5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-[12px] border-l-emerald-600">
          <div className="flex items-center gap-5">
            <Skull className="w-12 h-12 text-emerald-400 animate-pulse shrink-0" />
            <div>
              <h1 className="text-3xl font-black tracking-widest uppercase italic leading-none">
                INFILTRATOR <span className="text-white">v2.4</span>
              </h1>
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] mt-2">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Activity className="w-3 h-3" /> BYPASS_SYSTEM: {useProxy ? 'ARMED' : 'IDLE'}
                </span>
                <span className="text-emerald-900">|</span>
                <span className="text-cyan-500">PROXY: {proxyType.toUpperCase()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#050505] border border-emerald-900/50 p-3 text-[10px] min-w-[300px] shadow-inner font-bold">
            {systemLogs.map((log, i) => (
              <div key={i} className="flex gap-2 mb-1">
                <span className="text-emerald-900">[{new Date().getSeconds()}s]</span>
                <span className={i === systemLogs.length - 1 ? 'text-emerald-100' : 'text-emerald-800'}>{log}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-black border border-emerald-500/20 rounded-lg p-6 relative shadow-[0_0_20px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-6 text-white border-b border-emerald-900 pb-3">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-widest">Infiltration_Parameters</span>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-emerald-800 uppercase mb-2 block tracking-widest">Target_URL</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-[#050505] border border-emerald-900 text-emerald-400 focus:border-emerald-500 focus:outline-none text-sm font-bold transition-all shadow-inner"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-emerald-800 uppercase mb-2 block tracking-widest">Method</label>
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-full px-4 py-2 bg-black border border-emerald-900 text-emerald-400 rounded-sm focus:border-emerald-500 focus:outline-none uppercase text-xs font-black"
                    >
                      {['GET', 'POST', 'PUT', 'DELETE'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-emerald-800 uppercase mb-2 block italic tracking-widest">Spoof_IP</label>
                    <input
                      type="text"
                      value={spoofIp}
                      onChange={(e) => setSpoofIp(e.target.value)}
                      className="w-full px-4 py-2 bg-black border border-emerald-900 text-cyan-500 rounded-sm focus:border-cyan-500 focus:outline-none text-xs font-black"
                    />
                  </div>
                </div>

                {/* Multi-Tunnel Selector */}
                <div className="bg-emerald-950/5 border border-emerald-900/50 p-4 rounded flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-700" />
                      <span className="text-[10px] font-black text-emerald-700 uppercase">Tunnel_Selection</span>
                    </div>
                    <div 
                      onClick={() => setUseProxy(!useProxy)}
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${useProxy ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-emerald-950'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${useProxy ? 'left-6' : 'left-1'}`}></div>
                    </div>
                  </div>
                  
                  {useProxy && (
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setProxyType('heroku')}
                        className={`py-2 text-[9px] font-black rounded border transition-all ${proxyType === 'heroku' ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-black text-emerald-900 border-emerald-900 hover:text-emerald-500'}`}
                      >
                        HEROKU (STABLE)
                      </button>
                      <button 
                        onClick={() => setProxyType('thingproxy')}
                        className={`py-2 text-[9px] font-black rounded border transition-all ${proxyType === 'thingproxy' ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-black text-emerald-900 border-emerald-900 hover:text-emerald-500'}`}
                      >
                        THING (DIRECT)
                      </button>
                    </div>
                  )}
                </div>

                {method !== 'GET' && (
                  <div>
                    <label className="text-[10px] font-black text-emerald-800 uppercase mb-2 block tracking-widest">Injection_Payload</label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-black text-emerald-400 font-mono text-xs rounded border border-emerald-900 focus:border-emerald-500 focus:outline-none resize-none shadow-inner"
                    />
                  </div>
                )}

                <button
                  onClick={sendRequest}
                  disabled={loading}
                  className={`w-full py-5 rounded font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${
                    loading ? 'bg-emerald-950 text-emerald-900 animate-pulse' : 'bg-emerald-500 text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                  }`}
                >
                  {loading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <><Zap className="w-6 h-6 fill-current" /> EXECUTE_PULSE</>}
                </button>
              </div>
            </section>

            <div className="bg-emerald-950/10 border-l-2 border-emerald-500 p-4 flex gap-4">
              <HelpCircle className="w-5 h-5 text-emerald-800 shrink-0 mt-1" />
              <div className="text-[10px] text-emerald-800 leading-relaxed font-bold uppercase">
                <p className="text-emerald-500 mb-1">IDENTITY_PROTOCOL:</p>
                เซิร์ฟเวอร์ปลายทางจะบันทึก IP เป็น <span className="text-white underline">{spoofIp}</span> แทนที่จะเป็น IP จริงของคุณผ่านระบบ Header Injection
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-black border border-emerald-500/10 rounded-lg flex-1 min-h-[500px] flex flex-col relative overflow-hidden shadow-2xl">
              <div className="flex bg-emerald-950/10 border-b border-emerald-900/50 p-1">
                {['response', 'headers'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded ${
                      activeTab === tab ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'text-emerald-900 hover:text-emerald-600'
                    }`}
                  >
                    {tab === 'response' ? 'Decoded_Output' : 'Packet_Trace'}
                  </button>
                ))}
              </div>

              <div className="p-6 flex-1 overflow-auto custom-scrollbar">
                {loading && (
                  <div className="h-full flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                      <div className="w-24 h-24 border-2 border-emerald-900 border-t-emerald-500 rounded-full animate-spin"></div>
                      <Skull className="absolute inset-0 m-auto w-10 h-10 text-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-[10px] uppercase font-black text-emerald-500 tracking-[0.4em] animate-pulse italic">Scanning_Node...</p>
                  </div>
                )}

                {activeTab === 'response' && response && (
                  <div className="animate-in fade-in duration-500">
                    <div className="flex items-center justify-between mb-5 bg-[#080808] p-4 border border-emerald-900/50 rounded shadow-lg">
                      <div className="flex items-center gap-8 font-black uppercase">
                        <div>
                          <p className="text-[8px] text-emerald-900 mb-1">Status</p>
                          <p className={`text-xl ${response.status < 300 ? 'text-emerald-400' : 'text-red-500'}`}>{response.status}</p>
                        </div>
                        <div className="h-8 w-[1px] bg-emerald-900/50"></div>
                        <div>
                          <p className="text-[8px] text-emerald-900 mb-1">Latency</p>
                          <p className="text-xl text-white">{response.time}ms</p>
                        </div>
                      </div>
                      <button onClick={() => copyToClipboard(response.data)} className="p-2 hover:bg-emerald-500 hover:text-black rounded transition-all">
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                    <pre className="text-xs text-emerald-400 leading-relaxed font-mono p-5 bg-[#020202] rounded border border-emerald-900/30 overflow-x-auto">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>
                )}

                {activeTab === 'error' && error && (
                  <div className="h-full flex flex-col p-4">
                    <div className="bg-red-950/20 border-2 border-red-500/50 p-8 rounded text-red-500 shadow-2xl">
                      <div className="flex items-center gap-4 mb-6">
                        <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
                        <div>
                          <h3 className="text-2xl font-black uppercase italic tracking-tighter drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] leading-none">Security_Breach_Fault</h3>
                          <p className="text-[10px] font-black uppercase text-red-800 mt-2">Error: {error}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-black/80 p-6 border border-red-900/50">
                          {proxyType === 'heroku' ? (
                            <>
                              <p className="text-[11px] font-black text-white uppercase mb-4">Heroku Proxy Handshake Needed:</p>
                              <p className="text-[10px] text-red-800 font-bold mb-6 uppercase">คุณต้องกดปุ่มด้านล่างเพื่อยืนยันว่าไม่ใช่บอทก่อนใช้งาน (สิทธิ์มีอายุใช้งานชั่วคราว)</p>
                              <a 
                                href="https://cors-anywhere.herokuapp.com/corsdemo" 
                                target="_blank" 
                                className="bg-red-500 text-black px-6 py-4 text-xs font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                              >
                                Unlock Proxy Handshake <ExternalLink className="w-4 h-4" />
                              </a>
                            </>
                          ) : (
                            <>
                              <p className="text-[11px] font-black text-white uppercase mb-2 italic">Thingproxy Error:</p>
                              <p className="text-[10px] text-red-800 font-bold uppercase leading-relaxed">เซิร์ฟเวอร์ตัวนี้อาจจะล่ม หรือ URL ที่คุณกรอกผิดรูปแบบ (ต้องมี https:// นำหน้า)</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!response && !error && !loading && (
                  <div className="h-full flex flex-col items-center justify-center text-emerald-950/20 p-12 text-center select-none">
                    <Database className="w-32 h-32 mb-6" />
                    <p className="text-xs font-black uppercase tracking-[0.5em] mb-3">Awaiting Injection</p>
                    <p className="text-[9px] uppercase font-bold max-w-sm leading-relaxed">Select tunnel and define target coordinates to initiate infiltration.</p>
                  </div>
                )}
              </div>

              <div className="p-3 bg-emerald-950/10 border-t border-emerald-900/30 flex items-center justify-between text-[8px] font-black text-emerald-900 uppercase tracking-widest">
                <div className="flex items-center gap-6">
                  <span>SSL: {url.startsWith('https') ? 'ENCRYPTED' : 'PLAIN_TEXT'}</span>
                  <span>TUNNEL_VER: 2.4</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                   SYSTEM_READY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #010204; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #064e3b; border-radius: 10px; border: 1px solid #10b981; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
